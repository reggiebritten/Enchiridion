
Hooks.once("ready", async function() {

	new DragDrop({ 
        callbacks: { 
            drop: handleDrop
        } 
    })
    .bind($("#board")[0]);

	Handlebars.registerHelper('enchiridionDefaultIcon', function(document) {
		const defaultIcons = game.settings.get('enchiridion', 'defaultIcons');
		const type = document?.data?.type || 'base'
		return defaultIcons[type];
	});

	Handlebars.registerHelper('enchiridionExpanded', function(document) {
		const expanded = game.settings.get('enchiridion', 'userExpanded');
		if (expanded.includes(document.data._id)) return `<a class="fas fa-chevron-down"></a>`;
		return `<a class="fas fa-chevron-right"></a>`;
	});

	Handlebars.registerHelper('enchiridionActivationIcon', function(type, num) {
		switch(type){
			case 'image':
				return num==1?
				'<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a>':
				'<a class="fas fa-eye enchiridion-asset-activate" data-activation="2" title = "Share"></a>';
			case 'video':
				return num==1?
				'<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a>':
				'<a class="fas fa-eye enchiridion-asset-activate" data-activation="2" title = "Share"></a>';
			case 'audio':
				return num==1?
				'<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a>':
				'<a class="fas fa-sync enchiridion-asset-activate" data-activation="2" title = "Loop"></a>';
			case 'RollTable':
				return num==1?
				'<a class="fas fa-dice enchiridion-asset-activate" data-activation="1" title = "Roll on Table"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
			case 'Playlist':
				return num==1?
				'<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
			case 'Scene':
				return num==1?
				'<a class="fas fa-map enchiridion-asset-activate" data-activation="1" title = "Activate Scene"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
			case 'application':
				return num==1?
				'<a class="fas fa-file-pdf enchiridion-asset-activate" data-activation="1" title = "View PDF"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
			default:
				return num==1?'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':'';
		}
	});

	Handlebars.registerHelper('enchiridionOptions', function() {
		const defaultIcons = game.settings.get('enchiridion', 'defaultIcons');
		const vals = Object.values(defaultIcons)
		let result = vals.join('</option><option>');
		result = '<option>'+ result + '</option>'
		return result;
	});

	Handlebars.registerHelper('enchiridionTab', function(document) {
		const tabs = game.settings.get('enchiridion', 'userTabs')
		let html ='';
		const defaultIcons = game.settings.get('enchiridion', 'defaultIcons');
		const type = document?.data?.type || 'base'
		if (tabs.includes(document.data._id)){
			html = `
			<div class="enchiridion-tab enchiridion-document" title="${document.data.name}" data-tab="${document.data._id}" data-entity-id="${document.data._id}" data-entity-type="${document.documentName}">
				<a><i class="fas fa-times enchiridion-close-tab" data-entity-id="${document.data._id}" data-entity-type="${document.documentName}"></i></a>
				<a class ='item active enchiridion-drag' data-tab="${document.data._id}" data-entity-id="${document.data._id}" data-entity-type="${document.documentName}">
					${document.data.flags?.enchiridion?.icon || defaultIcons[type]}${document.data.name}</a>
			</div>
			`
		}
		return html;
	});

	game.settings.register("enchiridion", "activeTab", {
		name: "activeTab",
		hint: "",
		scope: "client",
		config: false,
		default: "",
		type: String
	});

	game.settings.register("enchiridion", "userTabs", {
		name: "userTabs",
		hint: "",
		scope: "client",
		config: false,
		default: [],
		type: Array
	});

	game.settings.register("enchiridion", "userExpanded", {
		name: "userExpanded",
		hint: "",
		scope: "client",
		config: false,
		default: [],
		type: Array
	});

	game.settings.register("enchiridion", "defaultIcons", {
		name: "Default Icons",
		hint: "",
		scope: "world",
		config: true,
		default: {
			character: '🧑',
			npc: '👤',
			vehicle: '⛵',
			item: '♟️',
			skill: '⚡',
			weapon: '🗡️',
			equipment: '🛡️',
			consumable: '🧪',
			tool: '🔧',
			loot: '💰',
			class: '🧙',
			spell: '🔥',
			feat: '⚡',
			backpack: '🎒',
			base: '📖',
			a: '🏰',
			b: '🚪',
			c: '☠️',
			d: '💍',
			e: '🌳',
			f: '⭐',
			g: '🥩',
			h: '🍺',
			i: '🏆',
			j: '🎲',
			k: '🧩',
			l: '🏹',
			m: '⛰️',
			n: '🏝️',
			o: '🏠',
			p: '💣',
			q: '🗺️',
			r: '🔮',
			s: '💎',
			t: '🕯️',
			u: '📂',
			v: '🗝️',
			w: '⚙️',
			x: '🚩'
			

		},
		type: Object
	});

	if (game.user.isGM) await createFoldersIfMissing();

	$('#logo').click( () => {
		const actors = game.actors;
		const items = game.items;
		const journal = game.journal;
		const documents = [...journal, ...actors, ...items];
		const activeTab = game.settings.get('enchiridion', 'activeTab');
		const tabs = [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: activeTab}]
		const label = game.world.data.title+" Enchiridion"
		const options = {title:label, documents:documents, tabs:tabs};
		new Enchiridion(this.object, options).render(true)
	})

	Enchiridion.update()

});

async function handleDrop(ev) {

	let dataTransfer;
	try {dataTransfer = JSON.parse(ev.dataTransfer.getData('text/plain'));} catch (err) {};
	if (dataTransfer?.asset?.type =='audio'){
		const data = {
			t: "l",
			path: dataTransfer.asset.id,
			radius: 10,
			easing: true,
			repeat: true,
			volume: 1.0
		};

    // Acquire the cursor position transformed to Canvas coordinates
    const [x, y] = [ev.clientX, ev.clientY];
    const t = canvas.stage.worldTransform;
    data.x = (x - t.tx) / canvas.stage.scale.x;
    data.y = (y - t.ty) / canvas.stage.scale.y;

    // Allow other modules to overwrite this, such as Isometric
    Hooks.callAll("dragDropPositioning", { event: ev, data: data });
	
	canvas.getLayer("SoundsLayer").activate();
	AmbientSound.create(data);
	}


}

async function createFoldersIfMissing() {
    await createFolderIfMissing("enchiridion");
    await createFolderIfMissing("enchiridion/images");
    await createFolderIfMissing("enchiridion/images/actors");
    await createFolderIfMissing("enchiridion/images/journal");
    await createFolderIfMissing("enchiridion/images/items");
    await createFolderIfMissing("enchiridion/audios");
    await createFolderIfMissing("enchiridion/audios/actors");
    await createFolderIfMissing("enchiridion/audios/journal");
    await createFolderIfMissing("enchiridion/audios/items");
    await createFolderIfMissing("enchiridion/videos");
    await createFolderIfMissing("enchiridion/videos/actors");
    await createFolderIfMissing("enchiridion/videos/journal");
    await createFolderIfMissing("enchiridion/videos/items");
    await createFolderIfMissing("enchiridion/applications");
    await createFolderIfMissing("enchiridion/applications/actors");
    await createFolderIfMissing("enchiridion/applications/journal");
    await createFolderIfMissing("enchiridion/applications/items");
}

async function createFolderIfMissing(folderPath) {
    let source = "data";
    if (typeof ForgeVTT != "undefined" && ForgeVTT.usingTheForge) {
        source = "forgevtt";
    }
    try
    {
        await FilePicker.browse(source, folderPath);
    }
    catch (error)
    {
        await FilePicker.createDirectory(source, folderPath);
    }
}










class Enchiridion extends FormApplication {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: "enchiridion",
			classes: ["enchiridion"],
			title: "Enchiridion",
			template: "modules/enchiridion/enchiridion-template.html",
			width: 800,
			height: 800,
			documents: {},
			minimum: 0,
			maximum: null,
			minimizable: true,
			resizable: false,
			tabs: [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: ""}]
		});
	}

	getData() {return {documents: this.options.documents,}}

	activateListeners(html) {
		const documents = duplicate(this.options.documents);

		//Delete the display of documents for players without proper permission
		documents.forEach(function(document){
			const $document = $('#enchiridion').find(`[data-entity-id="${document._id}"]`)
			if (!(document.permission[game.userId] >= 2 || document.permission['default'] >= 2)){
				$document.remove();
			}
		})

		//Sort documents under their parents
		documents.forEach(async function(document){
			const $child = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${document._id}"]`)
			const parent = document?.flags?.enchiridion?.parent
			const parentDocument = game.collections.get(parent?.type)?.get(parent?.id)
			if (parentDocument) {
				const $parent = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${parent.id}"]:visible .enchiridion-children`).first()
				const $parentExists = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${parent.id}"] .enchiridion-children`).first()
				if ($parentExists.length){
					$parent.append($child.prop('outerHTML'));
					$child.remove()//.hide()

				}

				const expanded = game.settings.get("enchiridion", "userExpanded")
				if(!expanded.includes(parentDocument.data._id)){
					$parent.each(function() {
						$( this ).hide()
					});
				};
			}

		})

		//Sort documents under their parents
		documents.forEach(async function(document){
			const $child = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${document._id}"]`)
			const parent = document?.flags?.enchiridion?.parent
			const parentDocument = game.collections.get(parent?.type)?.get(parent?.id)
			if (parentDocument) {
				const $parent = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${parent.id}"]:visible .enchiridion-children`).first()
				const $parentExists = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${parent.id}"] .enchiridion-children`).first()
				if ($parentExists.length){
					const $body = $('#enchiridion').find(`.tab.enchiridion-document[data-entity-id="${document._id}"]`)
					$body.find('.enchiridion-parent').append('Container: '+parentDocument.data.flags.enchiridion.icon+parentDocument.name);

				}
			}

		})

		//Hide the expand button for documents with no children
		documents.forEach(function(document){
			const $child = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${document._id}"]`)
			const hasChildren = $child.find('.enchiridion-children').children().length
			if (!hasChildren) {
				$child.find(`.enchiridion-expand`).hide()
			};
		})

		//Add links to body
		documents.forEach(async function(document){
			const $children = $('#enchiridion').find(`.enchiridion-tree[data-entity-id="${document._id}"]:visible .enchiridion-children`).first()
			//console.log($children)
			const parent = document?.flags?.enchiridion?.parent
			const parentDocument = game.collections.get(parent?.type)?.get(parent?.id)

	
		})

		game.ForgeOfLegends?.registerTooltips()



















		document.querySelectorAll('.enchiridion-icon').forEach(function(icon){
			EmojiButton(icon, function (emoji) {
				const data = $(icon).closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type).get(id)
				document.setFlag('enchiridion', 'icon', emoji)
			  });
	
		})

		  



















		$('.enchiridion-search').on("input", filter);
		$('.enchiridion-note').on("input", editNote);
		$('.enchiridion-icon').on("focusout", updateIcon);
		$('.enchiridion-asset-name').on("input", updateAssetName);
		// $('#enchiridion .item').click(function(ev) {
		// 	const newTab = ev.currentTarget.dataset.tab
		// 	game.settings.set('enchiridion', 'activeTab', newTab)
		//   });
		

		html.find('.enchiridion-open').click(this._onOpen.bind(this));
		html.find('.enchiridion-expand').click(this._onExpand.bind(this));
		//html.find('.enchiridion-open-tab').dblclick(this._onOpenTab.bind(this));
		//html.find('.enchiridion-open-tab').dblclick(this._onOpen.bind(this));
		html.find('.enchiridion-close-tab').click(this._onCloseTab.bind(this));
		//html.find('.enchiridion-main-image').click(this._onMainImage.bind(this));
		html.find('.enchiridion-asset-activate').click(this._onAssetActivate.bind(this));

		html.find('.enchiridion-new-note').click(this._newNote.bind(this));
		html.find('.enchiridion-delete-note').click(this._deleteNote.bind(this));

		html.find('.enchiridion-owned-item').click(this._ownedItem.bind(this));


		var DELAY = 250, clicks = 0, timer = null;
		$('.enchiridion-open-tab').on("click", function(ev){
			clicks++;  //count clicks
			if(clicks === 1) {
				timer = setTimeout(function() {
					clicks = 0;
					const data = $(ev.currentTarget).closest('.enchiridion-document').data()
					const id = data.entityId;
					let tabs = game.settings.get('enchiridion', 'userTabs')
					tabs.push(id)
					game.settings.set('enchiridion', 'userTabs', tabs)
					game.settings.set('enchiridion', 'activeTab', id)
					Enchiridion.update()
	
				}, DELAY);
	
			} else {
				clicks = 0;
				clearTimeout(timer);    //prevent single-click action
				const data = $(ev.currentTarget).closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type).get(id)
				const sheet = document.sheet;

				if(ui.PDFoundry?.Utilities?.getPDFData(document)){
					const pdf = ui.PDFoundry.Utilities.getPDFData(document)
					ui.PDFoundry.openPDF(pdf)
				} else if ( sheet.rendered ) {
					sheet.maximize();
					sheet.bringToTop();
				} else sheet.render(true);
			}
	
		})
		.on("dblclick", function(e){
			e.preventDefault();  //cancel system double-click event
		});

		$('.enchiridion-main-image').on("click", function(ev){
			clicks++;  //count clicks
			if(clicks === 1) {
				timer = setTimeout(function() {
					clicks = 0;
					const data = $(ev.currentTarget).closest('.enchiridion-document').data()
					const type = data.entityType;
					const id = data.entityId;
					const document = game.collections.get(type).get(id)
					const dataset = ev.currentTarget.dataset
					let ip = new ImagePopout(document.data.img, {
						title: document.name,
						shareable: true,
						uuid: document.uuid
					})
					ip.render(true);
					if(dataset?.activation ==2)	ip.shareImage();
	
				}, DELAY);
	
			} else {
				clicks = 0;
				clearTimeout(timer);    //prevent single-click action
				const data = $(ev.currentTarget).closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type).get(id)
				const sheet = document.sheet;

				if(ui.PDFoundry?.Utilities?.getPDFData(document)){
					const pdf = ui.PDFoundry.Utilities.getPDFData(document)
					ui.PDFoundry.openPDF(pdf)
				} else if ( sheet.rendered ) {
					sheet.maximize();
					sheet.bringToTop();
				} else sheet.render(true);
			}
	
		})
		.on("dblclick", function(e){
			e.preventDefault();  //cancel system double-click event
		});

		$('#enchiridion .item').on("click", function(ev){

			clicks++;  //count clicks
			if(clicks === 1) {
				timer = setTimeout(function() {
					clicks = 0;
					const newTab = ev.currentTarget.dataset.tab
					game.settings.set('enchiridion', 'activeTab', newTab)
	
				}, DELAY);
	
			} else {
				clicks = 0;
				clearTimeout(timer);    //prevent single-click action
				const data = $(ev.currentTarget).closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type).get(id)
				const sheet = document.sheet;

				if(ui.PDFoundry?.Utilities?.getPDFData(document)){
					const pdf = ui.PDFoundry.Utilities.getPDFData(document)
					ui.PDFoundry.openPDF(pdf)
				} else if ( sheet.rendered ) {
					sheet.maximize();
					sheet.bringToTop();
				} else sheet.render(true);
			}
	
		})
		.on("dblclick", function(e){
			e.preventDefault();  //cancel system double-click event
		});


























		

		


		let handler = ev => this._onDragItemStart(ev);
		$('.enchiridion-drag').each((i, li) => {
			li.setAttribute("draggable", true);
			this.form.ondrop = ev => this._onDrop(ev);
			li.addEventListener("dragstart", handler, false);
		});

		function filter(ev){
			var searchStr = $( this ).val().toLowerCase();
			if (searchStr == '') return Enchiridion.update();
			for ( let [k, v] of Object.entries(documents) ) {
				const name = v.name.toLowerCase()
				const id = v._id
				if (!name.includes(searchStr)){
					$(`.enchiridion-nav [data-entity-id='${id}']`).hide();
				}
			}
			for ( let [k, v] of Object.entries(documents) ) {
				const name = v.name.toLowerCase()
				const id = v._id
				if (name.includes(searchStr)){
					$(`.enchiridion-nav [data-entity-id='${id}']`).show();
					$(`.enchiridion-nav [data-entity-id='${id}']`).parentsUntil( ".enchiridion-nav" ).show();
				}
			}
		}

		function editNote(ev){
			const data = $(ev.currentTarget).closest('.enchiridion-document').data()
			const type = data.entityType;
			const id = data.entityId;
			let index = ev.currentTarget.dataset.index;
			let text = $(this).val()
			let document = game.collections.get(type).get(id)
			let notes = document.getFlag('enchiridion', 'notes')
			notes[index].content = text
			document.setFlag('enchiridion', 'notes', notes)
		}

		function updateIcon(ev){
			const data = $(ev.currentTarget).closest('.enchiridion-document').data()
			const type = data.entityType;
			const id = data.entityId;
			const document = game.collections.get(type).get(id)
			const icon = $(this).val()
			document.setFlag('enchiridion', 'icon', icon)

		}

		function updateAssetName(ev){
			const data = $(ev.currentTarget).closest('.enchiridion-document').data()
			const type = data.entityType;
			const id = data.entityId;
			const asset = $(ev.currentTarget).closest('.enchiridion-asset').data()
			let index = asset.index;
			let text = $(this).val()
			let document = game.collections.get(type).get(id)
			let assets = document.getFlag('enchiridion', 'assets')
			assets[index].name = text
			document.setFlag('enchiridion', 'assets', assets)
		}

		$('.playlist').each((i, li) => {
			li.ondrop = ev => this._onPlaylistDrop(ev);
		});










		const menuItems = [
			{
				name: "Create Contents",
				icon: '<i class="fas fa-plus"></i>',
				condition: () => game.user.isGM,
				callback: async li => {
				  const data = li.closest('.enchiridion-document').data()

				  const type = data.entityType;
				  const id = data.entityId;
				  const document = game.collections.get(type)?.get(id);

				  let entityTypes = ['Journal Entry'].concat(game.system.entityTypes["Actor"]).concat(game.system.entityTypes["Item"]);
				  const templateData = {entityTypes: entityTypes};
				  const template = `modules/enchiridion/templates/enchiridion-create.html`;
				  const html = await renderTemplate(template, templateData);
				  Dialog.prompt({
					  title: "New Document",
					  content: html,
					  callback: async function(html) {
						  const form = html[0].querySelector("form");
						  const newName = $(form).find('[name="name"]').val()
						  const newSubType = $(form).find('[name="type"]').val()
						  const newIcon = $(form).find('[name="icon"]').val()
						  let newData = {
							  name: newName,
							  flags: {
								  enchiridion:{
									  parent:{
										  type: type,
										  id:id
									  },
									  icon: newIcon
								  }}
						  }
						  let newId ='';
						  if (newSubType == 'Journal Entry'){
							  let newDocuemnt = await JournalEntry.create(newData);
							  newId = newDocuemnt.data._id
						  } else if (game.system.entityTypes["Actor"].includes(newSubType)){
							  newData.type = newSubType;
							  let newDocuemnt = await Actor.create(newData);
							  newId = newDocuemnt.data._id
						  } else if (game.system.entityTypes["Item"].includes(newSubType)){
							  newData.type = newSubType;
							  let newDocuemnt = await Item.create(newData);
							  newId = newDocuemnt.data._id
							  let expanded = game.settings.get('enchiridion', 'userExpanded')
							  expanded.indexOf(document.data._id) === -1 ? expanded.push(document.data._id) : 1;
							  game.settings.set('enchiridion', 'userExpanded', expanded)
						  }
		  
						  let tabs = game.settings.get('enchiridion', 'userTabs')
						  tabs.push(newId)
						  game.settings.set('enchiridion', 'userTabs', tabs)
						  game.settings.set('enchiridion', 'activeTab', newId)
		  
					  },
					  rejectClose: false,
				  });
				}
			  },
			{
				name: "Clear Container",
				icon: '<i class="fas fa-unlink"></i>',
				condition: li => {
				  const data = li.closest('.enchiridion-document').data()
				  const type = data.entityType;
				  const id = data.entityId;
				  const document = game.collections.get(type)?.get(id)
				  return document.data.flags.enchiridion?.parent?.id && game.user.isGM;
				},
				callback: li => {
				  const data = li.closest('.enchiridion-document').data()
				  const type = data.entityType;
				  const id = data.entityId;
				  const document = game.collections.get(type)?.get(id)
				  document.setFlag('enchiridion', 'parent', null)
				}
			},
			{
			  name: "FOLDER.Clear",
			  icon: '<i class="fas fa-folder"></i>',
			  condition: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				return game.user.isGM && !!document.data.folder;
			  },
			  callback: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				document.update({folder: null});
			  }
			},
			{
			  name: "SIDEBAR.Delete",
			  icon: '<i class="fas fa-trash"></i>',
			  condition: () => game.user.isGM,
			  callback: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				if ( !document ) return;
				return document.deleteDialog({
				  top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				  left: window.innerWidth - 720
				});
			  }
			},
			{
			  name: "SIDEBAR.Duplicate",
			  icon: '<i class="far fa-copy"></i>',
			  condition: () => game.user.isGM,
			  callback: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const original = game.collections.get(type)?.get(id)
				return original.clone({name: `${original.name} (Copy)`}, {save: true});
			  }
			},
			{
			  name: "Permissions",
			  icon: '<i class="fas fa-lock"></i>',
			  condition: () => game.user.isGM,
			  callback: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				new PermissionControl(document, {
				  top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				  left: window.innerWidth - 720
				}).render(true);
			  }
			},
			{
			  name: "SIDEBAR.Export",
			  icon: '<i class="fas fa-file-export"></i>',
			  condition: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				return document.isOwner;
			  },
			  callback: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				return document.exportToJSON();
			  }
			},
			{
			  name: "SIDEBAR.Import",
			  icon: '<i class="fas fa-file-import"></i>',
			  condition: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				return document.isOwner;
			  },
			  callback: li => {
				const data = li.closest('.enchiridion-document').data()
				const type = data.entityType;
				const id = data.entityId;
				const document = game.collections.get(type)?.get(id)
				return document.importFromJSONDialog();
			  }
			}
		  ]
		new ContextMenu(html.find('.enchiridion-tree,.enchiridion-tab'), this.options.contextMenuSelector, menuItems);
		

		
















	}










	async _onDragItemStart(ev){
		const data = $(ev.srcElement).closest('.enchiridion-document').data() || $(ev.srcElement).data();
		const asset = $(ev.srcElement).closest('.enchiridion-asset').data();
		console.log(asset)
		if (asset?.type == 'image' || asset?.type == 'video'){
			ev.dataTransfer.setData("text/plain", JSON.stringify({
				img: asset.id,
				tileSize: 100,
				type: "Tile"
			}));
		} else {
			const type = data.entityType;
			const id = data.entityId;
			const document = game.collections.get(type)?.get(id)
			ev.dataTransfer.setData("text/plain", JSON.stringify({
				type,
				data: document,
				id,
				asset
			  }));
		}
		//console.log(ev.dataTransfer.getData("text/plain"))

	}




	async _onDrop(ev){
		const files = ev.dataTransfer.files;
		let dataTransfer;
		try {dataTransfer = JSON.parse(ev.dataTransfer.getData('text/plain'));} catch (err) {};
		//console.log(dataTransfer)
		const data = $(ev.srcElement).closest('.enchiridion-document').data();
		const asset = $(ev.srcElement).closest('.enchiridion-asset').data();
		const type = data.entityType;
		const id = data.entityId;
		const document = game.collections.get(type)?.get(id);
		if (!document.isOwner) return ui.notifications.warn("You do not have permission to edit this.");

		const dropType = ev.srcElement.dataset.dropType || data.dropType;
		let assets = document.getFlag('enchiridion', 'assets') || [];

		/*
		* Drop from External File
		*/
		if(files.length){
			Object.values(files).forEach(async function(file){
				const fileType = file.type.split('/')[0]
				const extention = file.type.split('/')[1]
				if (!fileType || (fileType == 'application' && extention != 'pdf')) return ui.notifications.warn("That file type is not supported.")
				if (dropType) await FilePicker.upload("data", `enchiridion/${fileType}s/${document.collectionName}`, file, {});

				const assetFile = `enchiridion/${fileType}s/${document.collectionName}/${file.name}`
				let image = 'modules/enchiridion/icons/book-open-solid.png';
				if (fileType == 'image' || fileType == 'video') image = assetFile;
				if (fileType == 'audio') image = 'modules/enchiridion/icons/music-solid.png';
				if (extention == 'pdf') image = 'modules/enchiridion/icons/file-pdf-regular.png';

				const newAsset = {
					id: assetFile,
					name: file.name.split('.')[0],
					image,
					type: fileType,
					permissions:{}
				}

				switch(dropType){
					case "mainImage":
						if (fileType == 'image' || fileType == 'video'){
							await document.update({[`img`]: assetFile});
						}
						Enchiridion.update()
					break;
					case "asset":
						assets = [].concat(assets,[newAsset])
						await document.setFlag('enchiridion', 'assets', assets)
						Enchiridion.update()
					break;
					case "replace":
						assets[asset.index] = newAsset;
						await document.setFlag('enchiridion', 'assets', assets)
						Enchiridion.update()
					break;
				}
			})

		}

		/*
		* Heirarchy Tree Arrangement
		*/
		else if($(ev.srcElement).closest('.enchiridion-tree').length){
			const sourceData = JSON.parse(ev.dataTransfer.getData('text/plain'));
			if (!jQuery.isEmptyObject(sourceData?.asset)) return
			const sourceType = sourceData.type;
			const sourceId = sourceData.id;
			const sourceDocument = game.collections.get(sourceType).get(sourceId);
	
			const destinationData = $(ev.srcElement).closest('.enchiridion-document').data()
			const destinationType = destinationData.entityType;
			const destinationId = destinationData.entityId;
			const destinationDocument = game.collections.get(destinationType).get(destinationId);

			function checkLoops(document){
				if(sourceId == destinationId) return true;
				const parent = document?.data?.flags?.enchiridion?.parent
				const parentDocument = game.collections?.get(parent?.type)?.get(parent?.id);
				if(parentDocument?.id == destinationId || parentDocument?.id == sourceId){
					ui.notifications.warn("That arrangement would create a loop! Please choose a different arrangement.")
					return true};
				if (parent) return checkLoops(parentDocument);
	
			}
			if (checkLoops(destinationDocument)) return;
			const parent = {
				type: destinationType,
				id: destinationId
			};
			sourceDocument.setFlag('enchiridion', 'parent', parent)
			let expanded = game.settings.get('enchiridion', 'userExpanded')
			expanded.indexOf(destinationId) === -1 ? expanded.push(destinationId) : 1;
			game.settings.set('enchiridion', 'userExpanded', expanded)
		}		
		/*
		* Drop from Foundry Document
		*/
		else if (dataTransfer){
			const destinationData = $(ev.srcElement).closest('.enchiridion-document').data()
			const destinationType = destinationData.entityType;
			const destinationId = destinationData.entityId;
			const destinationDocument = game.collections.get(destinationType).get(destinationId);

			const asset = $(ev.srcElement).closest('.enchiridion-asset').data()

			
			const dropType = ev.srcElement.dataset.dropType || dataTransfer.dropType
			console.log(dropType, asset)

			const sourceDocument = game.collections.get(dataTransfer.type)?.get(dataTransfer.id);
			let image = 'modules/enchiridion/icons/book-open-solid.png';
			if (sourceDocument.documentName == 'Scene') image = 'modules/enchiridion/icons/map-solid.png';
			if (sourceDocument.documentName == 'Playlist') image = 'modules/enchiridion/icons/music-solid.png';
			if (sourceDocument.data.flags.pdfoundry?.PDFData?.url) image = 'modules/enchiridion/icons/file-pdf-regular.png';
			if (sourceDocument.data?.img) image = sourceDocument.data.img;
			const newAsset = {
				id: sourceDocument.data._id,
				name: sourceDocument.data.name,
				image,
				type: sourceDocument.documentName,
				permissions:{}
			}

			let assets = duplicate(destinationDocument.getFlag('enchiridion', 'assets') || []) ;

			const destinationIndex = Number(asset?.index)
			const sourceIndex = Number(dataTransfer.asset?.index)


			switch(dropType){
				case "asset":
					if (!assets.some((a) => a.id == dataTransfer.id)){
						assets = [].concat(assets,newAsset)
						destinationDocument.setFlag('enchiridion', 'assets', assets)
					}
				break;
				case "replace":
					let temp = assets[sourceIndex];
					assets[sourceIndex] = assets[destinationIndex];
					assets[destinationIndex] = temp;
					destinationDocument.setFlag('enchiridion', 'assets', assets)
				break;
			}
			Enchiridion.update()
		}

	};




		async _onPlaylistDrop(ev){
			let dataTransfer;
			try {dataTransfer = JSON.parse(ev.dataTransfer.getData('text/plain'));} catch (err) {};
			if (dataTransfer?.asset?.type =='audio'){
				const path = dataTransfer.asset.id;
				const name = dataTransfer.asset.name;
				const id = ev.currentTarget.dataset.entityId
				const playlist = game.playlists.get(id)
				let data= [{
					name, 
					path,
					repeat:true
				}]
				playlist.createEmbeddedDocuments('PlaylistSound', data)
			}
		}








		async _onAssetActivate(ev){
			const data = $(ev.currentTarget).closest('.enchiridion-document').data();
			const type = data.entityType;
			const id = data.entityId;
			const document = game.collections.get(type).get(id);
			const dataset = ev.currentTarget.dataset;
			console.log(document)
			if (!document.isOwner) return ui.notifications.warn("You do not have permission to acess this.");
	
			const $asset = $(ev.currentTarget).closest('.enchiridion-asset')
			const assetData = $asset.data();
			const assetTitle = $asset.attr('title')
			
			const extention = assetData.id.split('.')[1]

			const assetType = assetData.type;
			const assetDocument = game.collections.get(assetData?.type)?.get(assetData?.id);
			let assets = document.getFlag('enchiridion', 'assets');
			if (dataset?.activation == 4){
				let index = assetData.index;
				assets.splice(index, 1);
				document.setFlag('enchiridion', 'assets', assets)
				return Enchiridion.update()
			}
			if (dataset?.activation == 3){
				console.log("PERMISSIONPERMISSION")
				return
			}
			if (extention == 'pdf'){
				if (ui.PDFoundry) {
					ui.PDFoundry.openURL(assetData.id);
				} else {
					ui.notifications.warn('PDFoundry must be installed to view PDF files.');
				}
				return
			}
			let src, ip
			switch (assetType){
				case 'image':
					src = ev.currentTarget.src || $(ev.currentTarget).closest('.enchiridion-asset').find('img').attr('src');
					ip = new ImagePopout(src, {
						title: document.data.name + " - " + assetTitle,
						shareable: true,
						uuid: document.uuid
					})
					ip.render(true);
					if(dataset?.activation ==2) ip.shareImage();
				break;
				case 'video':
					src = ev.currentTarget.src || $(ev.currentTarget).closest('.enchiridion-asset').find('img').attr('src');
					ip = new ImagePopout(src, {
						title: document.data.name + " - " + assetTitle,
						shareable: true,
						uuid: document.uuid
					})
					ip.render(true);
					if(dataset?.activation ==2) ip.shareImage();
				break;
				case 'audio':
					const sounds = [...game.audio.playing.values()]
					const sound = sounds.find(el => el.src == assetData.id);
					const playing = sound?.playing
					const loop = (dataset?.activation ==2);
					if (playing){
						sound.stop()
					} else {
						AudioHelper.play({
							src: assetData.id,
							volume: 1.0,
							loop
							});
					}
				break;
				case "RollTable" :
					if(dataset?.activation == 1){
						assetDocument.draw()
					} else if (dataset?.activation == 2){
						if (assetDocument.sheet.rendered) {
							assetDocument.sheet.maximize();
							assetDocument.sheet.bringToTop();
						} else assetDocument.sheet.render(true);
					}
				break;
				case "Playlist" :
					if(dataset?.activation == 1){
						if(assetDocument.playing){
							assetDocument.stopAll()
							// assetDocument.data.sounds.forEach(function(sound){
							// 	console.log(sound)
							// 	if(sound.sound.playing){
							// 		sound.sound.pause()
							// 	} else{
							// 		sound.sound.play(10)
							// 	}

							// })
						} else {
							assetDocument.playAll()
						}

					} else if (dataset?.activation == 2){
						if (assetDocument.sheet.rendered) {
							assetDocument.sheet.maximize();
							assetDocument.sheet.bringToTop();
						} else assetDocument.sheet.render(true);
					}
				break;
				case "Scene" :
					if(dataset?.activation == 1){
						assetDocument.activate()
					} else if (dataset?.activation == 2){
						if (assetDocument.sheet.rendered) {
							assetDocument.sheet.maximize();
							assetDocument.sheet.bringToTop();
						} else assetDocument.sheet.render(true);
					}
				break;
				case "JournalEntry" :
					if(dataset?.activation == 1 && ui.PDFoundry?.Utilities?.getPDFData(assetDocument)){
						const pdf = ui.PDFoundry.Utilities.getPDFData(assetDocument)
						ui.PDFoundry.openPDF(pdf)
					} else {
						if (assetDocument.sheet.rendered) {
							assetDocument.sheet.maximize();
							assetDocument.sheet.bringToTop();
						} else assetDocument.sheet.render(true);
					}
				break;
				default:
					if ( assetDocument.sheet.rendered ) {
						assetDocument.sheet.maximize();
						assetDocument.sheet.bringToTop();
					} else assetDocument.sheet.render(true);
			}
		}
	







	async _onMainImage(ev){
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const type = data.entityType;
		const id = data.entityId;
		const document = game.collections.get(type).get(id)
		const dataset = ev.currentTarget.dataset
		let ip = new ImagePopout(document.data.img, {
			title: document.name,
			shareable: true,
			uuid: document.uuid
		})
		ip.render(true);
		if(dataset?.activation ==2)	ip.shareImage();
	}

	_onOpen (ev) {
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const type = data.entityType;
		const id = data.entityId;
		const document = game.collections.get(type).get(id)
		const sheet = document.sheet;
		if(ui.PDFoundry?.Utilities?.getPDFData(document)){
			const pdf = ui.PDFoundry.Utilities.getPDFData(document)
			ui.PDFoundry.openPDF(pdf)
		} else if ( sheet.rendered ) {
			sheet.maximize();
			sheet.bringToTop();
		} else sheet.render(true);
	}

	_ownedItem (ev){
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const type = data.entityType;
		const id = data.entityId;
		const document = game.collections.get(type).get(id)
		const itemId = ev.currentTarget.dataset.itemId
		const item = document.getOwnedItem(itemId)
		if (item.sheet.rendered) {
			item.sheet.maximize();
			item.sheet.bringToTop();
		} else item.sheet.render(true);
	}

	async _newNote(ev){
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const type = data.entityType;
		const id = data.entityId;
		const document = game.collections.get(type)?.get(id)
		let notes = document.getFlag('enchiridion', 'notes') || []
		const newNote = [
			{content:"",
			permissions:{}
			}
		]
		notes = [].concat(notes,newNote)
		await document.setFlag('enchiridion', 'notes', notes)
		Enchiridion.update()
	};

	_deleteNote(ev){
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const type = data.entityType;
		const id = data.entityId;
		const index = ev.currentTarget.dataset.index;
		const document = game.collections.get(type).get(id)
		let notes = document.getFlag('enchiridion', 'notes')
		notes.splice(index, 1);
		document.setFlag('enchiridion', 'notes', notes)
		Enchiridion.update()
	}

	
	_onExpand (ev) {
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const id = data.entityId;
		let expanded = game.settings.get('enchiridion', 'userExpanded')
		expanded.indexOf(id) === -1 ? expanded.push(id) : expanded.splice(expanded.indexOf(id), 1);
		game.settings.set('enchiridion', 'userExpanded', expanded)
		Enchiridion.update()
	}
	  
	_onOpenTab (ev) {
		const data = $(ev.currentTarget).closest('.enchiridion-document').data()
		const id = data.entityId;
		let tabs = game.settings.get('enchiridion', 'userTabs')
		tabs.push(id)
		game.settings.set('enchiridion', 'userTabs', tabs)
		game.settings.set('enchiridion', 'activeTab', id)
		Enchiridion.update()
	}

	_onCloseTab (ev) {
		const data = ev.currentTarget.dataset
		const id = data.entityId;
		let tabs = game.settings.get('enchiridion', 'userTabs')
		tabs = $.grep(tabs, function(value) {
		  return value != id;
		});
		game.settings.set('enchiridion', 'userTabs', tabs)
		Enchiridion.update()
	}



}













Enchiridion.update = function(doc,updates){
	//console.log($('#enchiridion').legnth)
	//if (!$('#enchiridion').legnth) return;
	if (updates?.flags?.enchiridion?.notes || updates?.flags?.enchiridion?.assets) return;
	if(jQuery.isEmptyObject(game)) return;
	const actors = game.actors;
	const items = game.items;
	const journal = game.journal;
	const documents = [...journal, ...actors, ...items];
	const activeTab = game.settings.get('enchiridion', 'activeTab');
	const tabs = [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: activeTab}]
	const label = game.world.data.title+" Enchiridion"
	const options = {title:label, documents:documents, tabs:tabs};
	new Enchiridion(this.object, options).render(true)
}

Hooks.on("createItem", Enchiridion.update)
Hooks.on("updateItem", Enchiridion.update)
Hooks.on("deleteItem", Enchiridion.update)
Hooks.on("createActor", Enchiridion.update)
Hooks.on("updateActor", Enchiridion.update)
Hooks.on("deleteActor", Enchiridion.update)
Hooks.on("createJournalEntry", Enchiridion.update)
Hooks.on("updateJournalEntry", Enchiridion.update)
Hooks.on("deleteJournalEntry", Enchiridion.update)