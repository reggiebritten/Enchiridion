class Enchiridion extends FormApplication {
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			id: "enchiridion",
			classes: ["enchiridion"],
			title: "Enchiridion",
			template: "modules/enchiridion/enchiridion-template.html",
			width: 800,
			height: 800,
			documents: [],
			openTabs: [],
			minimum: 0,
			scrollY: ['.enchiridion-body', '.enchiridion-nav', '.enchiridion-main', '.enchiridion-document'],
			maximum: null,
			minimizable: true,
			resizable: false,
			tabs: [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: ""}]
		});
	}

	getData() {return {documents: this.options.documents,openTabs: this.options.openTabs}};

	activateListeners(html) {
		const documents = this.options.documents;
		const openTabs = this.options.openTabs;

		Enchiridion.render(html, documents, openTabs)

		html.find("a.entity-link").on("contextmenu", Enchiridion.openLink);
		html.find('.header-search .fa-plus').on("click", Enchiridion.createContents);
		html.find('.header-search a:not(.fa-plus)').on("click", Enchiridion.toggleSearch);
		html.find('.enchiridion-search').on("input", Enchiridion.setFilter);
		html.find('.enchiridion-open-document').on("click", Enchiridion.openDocument);
		//html.find('.enchiridion-document h2').on("click", Enchiridion.collapse);
		html.find('.enchiridion-open-tab').on("dblclick", Enchiridion.openDocument);
		html.find('.enchiridion-open-tab').on("singleclick", Enchiridion.openTab);
		html.find('.enchiridion-main-image').on("dblclick", Enchiridion.openDocument);
		html.find('.enchiridion-main-image').on("singleclick", Enchiridion.clickImage);
		html.find('.enchiridion-main-image').on("contextmenu", Enchiridion.clickImage);
		html.find('.enchiridion-tab').on("singleclick", Enchiridion.selectTab);
		html.find('.enchiridion-tab').on("dblclick", Enchiridion.selectTab);
		html.find('.enchiridion-tab').on("dblclick", Enchiridion.openDocument);
		html.find('.enchiridion-tab').on("mousedown", Enchiridion.middleCloseTab);
		html.find('.enchiridion-expand a').on("click", Enchiridion.expand);
		html.find('.enchiridion-close-tab').on("click", Enchiridion.closeTab);
		html.find('.enchiridion-owned-item').on("click", Enchiridion.ownedItem);
		html.find('.enchiridion-asset-activate').on("click", Enchiridion.assetActivate);
		html.find('.enchiridion-asset-activate').on("contextmenu", Enchiridion.assetActivate);
		if (game.user.isGM){
			html.find('.enchiridion-note').on("input", Enchiridion.editNote);
			html.find('.enchiridion-icon').each(Enchiridion.emojiButton)
			html.find('.enchiridion-hide-note').on("click", Enchiridion.hideNote);
			html.find('.enchiridion-asset-name').on("input", Enchiridion.updateAssetName);
			html.find('.enchiridion-new-note').on("click", Enchiridion.newNote);
			html.find('.enchiridion-delete-note').on("click", Enchiridion.deleteNote);
			html.find(".enchiridion-permissions").on("click", Enchiridion.permissions);
		} 

		html.find('.header-search a').each(function(){
			let searchOptions = game.settings.get('enchiridion','searchOptions');
			const toggle = $(this).data().toggle
			if(!searchOptions[toggle]) $(this).addClass('inactive')
		})

		let handler = ev => Enchiridion.onDragItemStart(ev);


		// new DragDrop({ 
		// 	callbacks: { 
		// 		drop: handleDrop
		// 	} 
		// })
		// .bind(document.getElementById("board"));
		
		this.form.ondrop = ev => Enchiridion.onDrop(ev);

		$('.enchiridion-drag').each((i, li) => {
			li.setAttribute("draggable", true);
			// this.form.ondrop = ev => Enchiridion.onDrop(ev);
			li.addEventListener("dragstart", handler, false);
		});
	};
};


async function handleDrop(event) {
    event.preventDefault();
    console.log(event);

    const files = event.dataTransfer.files;
    console.log(files);
}


/* -------------------------------------------------------------------------- */
/*                               Open and Update                              */
/* -------------------------------------------------------------------------- */




Enchiridion.open = async function(){
	const actors = game.actors;
	const items = game.items;
	const journal = game.journal;
	const folders = game.folders.filter((folder) => ["Actor","JournalEntry","Item"].includes(folder.data.type));
	let documents = [...journal, ...actors, ...items, ...folders];
	documents = documents.filter((document)=> document.visible);
	documents.sort((a, b) => a.data.sort - b.data.sort);
	const userTabs = game.settings.get('enchiridion', 'userTabs');
	const openTabs =await Promise.all(userTabs.map(async tab =>  fromUuid(tab)));;
	const activeTab = game.settings.get('enchiridion', 'activeTab');
	const tabs = [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: activeTab}]
	const title = game.world.data.title+" Enchiridion"
	const options = {title, documents, tabs, openTabs};
	const window = new Enchiridion(this.object, options);
	await window.render(true);
	// Enchiridion.window = window;


}

Enchiridion.update = function(doc,updates){
	// console.log($('#enchiridion').find('.loading').html( "<p>All new content. <em>You bet!</em></p>" ))
	if (!$('#enchiridion').length) return;
	if (updates?.flags?.enchiridion || updates?.sort) return;

	Enchiridion.open()
	//console.log(Enchiridion.window.rendered)
	// if(Enchiridion.window.rendered){
	// 	//Enchiridion.window.maximize();
	// 	Enchiridion.window.bringToTop();
	// 	const searchFilter = game.settings.get('enchiridion','searchFilter');
	// 	//if (searchFilter == '') return;
	// 	Enchiridion.filter(searchFilter)
	// }
}












/* -------------------------------------------------------------------------- */
/*                               Render Function                              */
/* -------------------------------------------------------------------------- */



Enchiridion.render = async function(html, documents, openTabs){
	const children  = documents.filter(document => document?.data.flags.enchiridion?.parent || document.folder?.uuid || document.parentFolder?.uuid);
	
	//Sort documents under their parents
	children.forEach(function(document){
		const parent = document?.data.flags.enchiridion?.parent || document.folder?.uuid || document.parentFolder?.uuid;
		const $child = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${document.uuid}"]`);
		const $parent = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${parent}"]:visible .enchiridion-children`).first();
		if (!$parent.length) return;
		$parent.append($child.prop('outerHTML'));
		$child.remove();
	})

	//Hide Documents that are not Expanded
	documents.forEach(function(document){
		const $document = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${document.uuid}"]`);
		const hasChildren = $document.find('.enchiridion-children').children().length;
		if (!hasChildren) $document.find(`.enchiridion-expand`).empty();
		const expanded = game.settings.get("enchiridion", "userExpanded");
		if(expanded.includes(document.uuid)){
			$document.addClass("expanded")
		}
		const parent = document?.data.flags.enchiridion?.parent || document.folder?.uuid || document.parentFolder?.uuid;
		if (!parent) return;
		const $parent = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${parent}"]:visible .enchiridion-children`).first();
		if (!$parent.length) return;

		if(!expanded.includes(parent)){
			$parent.each(function() {
				$( this ).hide();
			});
		};

	})

	//Add info to header
	openTabs.forEach(async function(document){
		const $tree = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${document?.uuid}"]`);
		const $document = $('#enchiridion').find(`.enchiridion-body [data-uuid="${document?.uuid}"] .enchiridion-references`);
		const parent = document?.data?.flags?.enchiridion?.parent;
		if (parent?.length){
			const parentDocument = game.collections.get(parent?.split('.')[0])?.get(parent?.split('.')[1]);
			if (parentDocument?.visible){
				let type = parentDocument?.data?.type || parentDocument.documentName
				if (parentDocument.documentName == 'Folder') type = "Folder";
				const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
	
				var $html = $(TextEditor._createContentLink('',parentDocument?.documentName,parentDocument?.id,(parentDocument?.data.flags.enchiridion?.icon||defaultIcon)+parentDocument?.name));
				$html.find(':first-child').removeClass().addClass('fas fa-sign-in-alt rotate3').prop('title', 'Container');
				$document.append($html.prop('outerHTML'))
			}
		}

		let children = [];
		$tree.find(`.enchiridion-children`).first().children().each(function(){
			children.push($( this )?.data()?.uuid)
		});
		children.forEach(function(child){
			const childDocument = game.collections.get(child.split('.')[0])?.get(child.split('.')[1]);
			if (!childDocument.visible) return;
			let type = childDocument?.data?.type || childDocument.documentName
			if (childDocument.documentName == 'Folder') type = "Folder";
			const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
			var $html = $(TextEditor._createContentLink('',childDocument.documentName,childDocument.id,(childDocument.data.flags.enchiridion?.icon||defaultIcon)+childDocument.name));
			$html.find(':first-child').removeClass().addClass('fas fa-sign-in-alt rotate1').prop('title', 'Content');
			$document.append($html.prop('outerHTML'))
		})

		
		const assets = document?.data?.flags?.enchiridion?.assets;
		assets?.forEach(function(asset){
			const assetDocument = game.collections.get(asset?.uuid?.split('.')[0])?.get(asset?.uuid?.split('.')[1]);
			if (!assetDocument?.visible || (asset?.permissions?.default && !game.user.isGM)) return;
			let type = assetDocument?.data?.type || assetDocument.documentName
			if (assetDocument.documentName == 'Folder') type = "Folder";
			let defaultIcon = ''
			try {defaultIcon = game.settings.get('enchiridion', 'default-'+type)} catch (err) {};
			var $html = $(TextEditor._createContentLink('',assetDocument.documentName,assetDocument.id,(assetDocument.data.flags.enchiridion?.icon||defaultIcon)+assetDocument.name));
			$html.find(':first-child').removeClass().addClass('fas fa-sign-in-alt').prop('title', 'Outgoing Reference');
			$document.append($html.prop('outerHTML'));

			const $document2 = $('#enchiridion').find(`.enchiridion-body [data-uuid="${asset?.uuid}"] .enchiridion-references`);
			var $html2 = $(TextEditor._createContentLink('',document.documentName,document.id,(document.data.flags.enchiridion?.icon||defaultIcon)+document.name));
			$html2.find(':first-child').removeClass().addClass('fas fa-sign-in-alt rotate2').prop('title', 'Incoming Reference');
			$document2.append($html2.prop('outerHTML'));
		})


	})

	//Add Permission Indicators
	documents.forEach(function(document){
		if (!game.user.isGM) return;
		const $document = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${document.uuid}"] h4`).first();
		let users = []
		for (let id in document.data.permission) {

			let permission = document.data.permission[id]
			let bg_color = "rgba(0, 0, 0, 0.3);"
			let name = 'Default'
			if (id != "default") {
				const user = game.users.get(id)
				if (user) {
					if (user.isGM) continue;
					bg_color = user.data.color;
					name = user.name;
				} else {
					continue;
				}
			}
			let user_div = $('<div></div>')
			user_div.attr("data-user-id", id)
			if (permission === CONST.ENTITY_PERMISSIONS.LIMITED) {
				user_div.append($(`<div><i title="${name}: Limited" class="fas fa-low-vision" style="color: ${bg_color};"/></div>`))
			} else if (permission === CONST.ENTITY_PERMISSIONS.OBSERVER) {
				user_div.append($(`<div><i title="${name}: Observer" class="fas fa-eye" style="color: ${bg_color};"/></div>`))
			} else if (permission === CONST.ENTITY_PERMISSIONS.OWNER) {
				user_div.append($(`<div><i title="${name}: Owner" class="fas fa-pen" style="color: ${bg_color};"/></div>`))
			} else {
				user_div.append($(`<div><i title="${name}: Hidden" class="fas fa-lock" style="color: ${bg_color};"/></div>`))
			}
			users.push(user_div)
		}
		if (users.length === 0) return;
		let div = $('<div class="enchiridion-permissions"></div>')
		let a = $(`<a></a>`)
		div.append(a)
		a.append(...users.reverse())
		$document.append(div)
	})

	// Remove Hidden Assets
	if (!game.user.isGM) $('#enchiridion .private-true').remove()

	game.ForgeOfLegends?.registerTooltips(html)
	
	//MCE
	if (game.user.isGM) tinymce.init({
		selector: '.enchiridion-note',
		menubar: false,
		inline: true,
		plugins: [
			'autolink',
			'codesample',
			'link',
			'lists',
			'media',
			//'powerpaste',
			'table',
			'image',
			//'quickbars',
			'codesample',
			'help',
			'noneditable'
		],
		toolbar: false,
		//quickbars_insert_toolbar: 'quicktable image media codesample numlist bullist',
		quickbars_selection_toolbar: 'bold italic underline | styleselect | blockquote quicklink | fontselect fontsizeselect forecolor backcolor',
		contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
		//powerpaste_word_import: 'clean',
	});
	$('body').find('[style*="position: static; height: 0px; width: 0px; padding: 0px; margin: 0px; border: 0px;"]').remove()

	//Add the functionality to drag and drop sound effects
	$('.playlist').each((i, li) => {
		if (!game.user.isGM) li.ondrop = ev => playlistDrop(ev);
	});

	async function playlistDrop(ev){
		if (!game.user.isGM) return;
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

	//Drop Ambient Sounds
	$("#board")[0].addEventListener("drop", (ev) => {
		if (!game.user.isGM) return;
		let dataTransfer;
		try {
			dataTransfer = JSON.parse(ev.dataTransfer.getData("text/plain"));
		} catch (err) {
			return;
		}
		if (dataTransfer?.asset?.type =='audio'){
			const data = {
				t: "l",
				path: dataTransfer.asset.id,
				radius: 10,
				easing: true,
				repeat: true,
				volume: 1.0
			};
		
			const [x, y] = [ev.clientX, ev.clientY];
			const t = canvas.stage.worldTransform;
			data.x = (x - t.tx) / canvas.stage.scale.x;
			data.y = (y - t.ty) / canvas.stage.scale.y;
		
			// Allow other modules to overwrite this, such as Isometric
			Hooks.callAll("dragDropPositioning", { event: ev, data: data });
			
			canvas.getLayer("SoundsLayer").activate();
			AmbientSound.create(data);
		}
	});



	/* -------------------------------------------------------------------------- */
	/*                               Context Menus                               */
	/* -------------------------------------------------------------------------- */



	const documentItems = [
		{
			name: "Create Contents",
			icon: '<i class="fas fa-plus"></i>',
			condition: () => game.user.isGM,
			callback: async li => Enchiridion.createContents(li)
			},
		{
			name: "Clear Container",
			icon: '<i class="fas fa-unlink"></i>',
			condition: li => {
				const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
				const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
				return document?.data?.flags?.enchiridion?.parent && game.user.isGM;
			},
			callback: async li => {
				const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
				const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
				await document?.setFlag('enchiridion', 'parent', null);
				//await document?.update({folder: null});
				await document?.update({parent: null});
				return Enchiridion.update();
			}
		},
		{
			name: "FOLDER.Clear",
			icon: '<i class="fas fa-folder"></i>',
			condition: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			return game.user.isGM && !!document?.data?.folder;
			},
			callback: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			document?.update({folder: null});
			return Enchiridion.update();
			}
		},
		{
			name: "SIDEBAR.Delete",
			icon: '<i class="fas fa-trash"></i>',
			condition: () => game.user.isGM,
			callback: async li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			await document?.deleteDialog({
				top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 720
			});
			return Enchiridion.update();
			}
		},
		{
			name: "SIDEBAR.Duplicate",
			icon: '<i class="far fa-copy"></i>',
			condition: () => game.user.isGM,
			callback: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			return document?.clone({name: `${document?.name} (Copy)`}, {save: true});
			}
		},
		{
			name: "Permissions",
			icon: '<i class="fas fa-lock"></i>',
			condition: () => game.user.isGM,
			callback: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			new PermissionControl(document, {
				top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 720
			}).render(true);
			return Enchiridion.update();
			}
		},
		{
			name: "SIDEBAR.Export",
			icon: '<i class="fas fa-file-export"></i>',
			condition: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			return document?.isOwner;
			},
			callback: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			return document?.exportToJSON();
			}
		},
		{
			name: "SIDEBAR.Import",
			icon: '<i class="fas fa-file-import"></i>',
			condition: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			return document?.isOwner;
			},
			callback: li => {
			const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
			const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
			return document?.importFromJSONDialog();
			}
		}
	];

	const folderItems = [
		{
			name: "Create Contents",
			icon: '<i class="fas fa-plus"></i>',
			condition: () => game.user.isGM,
			callback: async li => Enchiridion.createContents(li)
			},
		{
			name: "Clear Container",
			icon: '<i class="fas fa-unlink"></i>',
			condition: li => {
				const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
				const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
				return document?.data?.flags?.enchiridion?.parent && game.user.isGM;
			},
			callback: async li => {
				const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
				const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
				await document?.setFlag('enchiridion', 'parent', null);
				//await document?.update({folder: null});
				await document?.update({parent: null});
				return Enchiridion.update();
			}
		},
		{
			name: "FOLDER.Edit",
			icon: '<i class="fas fa-edit"></i>',
			condition: game.user.isGM,
			callback: header => {
			const li = header.parent()[0];
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			const options = {top: li.offsetTop, left: window.innerWidth - 310 - FolderConfig.defaultOptions.width};
			new FolderConfig(folder, options).render(true);
			}
		},
		{
			name: "PERMISSION.Configure",
			icon: '<i class="fas fa-lock"></i>',
			condition: () => game.user.isGM,
			callback: header => {
			const li = header.parent()[0];
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			new PermissionControl(folder, {
				top: Math.min(li.offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 720
			}).render(true);
			}
		},
		{
			name: "FOLDER.Export",
			icon: `<i class="fas fa-atlas"></i>`,
			condition: header => {
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			return CONST.COMPENDIUM_ENTITY_TYPES.includes(folder.type);
			},
			callback: header => {
			const li = header.parent();
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			return folder.exportDialog(null, {
				top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 720,
				width: 400
			});
			}
		},
		{
			name: "FOLDER.CreateTable",
			icon: `<i class="${CONFIG.RollTable.sidebarIcon}"></i>`,
			condition: header => {
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			return CONST.COMPENDIUM_ENTITY_TYPES.includes(folder.type);
			},
			callback: header => {
			const li = header.parent()[0];
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			return Dialog.confirm({
				title: `${game.i18n.localize("FOLDER.CreateTable")}: ${folder.name}`,
				content: game.i18n.localize("FOLDER.CreateTableConfirm"),
				yes: () => RollTable.fromFolder(folder),
				options: {
				top: Math.min(li.offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 680,
				width: 360
				}
			});
			}
		},
		{
			name: "FOLDER.Remove",
			icon: '<i class="fas fa-trash"></i>',
			condition: game.user.isGM,
			callback: header => {
			const li = header.parent();
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			return Dialog.confirm({
				title: `${game.i18n.localize("FOLDER.Remove")} ${folder.name}`,
				content: `<h4>${game.i18n.localize("AreYouSure")}</h4><p>${game.i18n.localize("FOLDER.RemoveWarning")}</p>`,
				yes: () => folder.delete({deleteSubfolders: false, deleteContents: false}),
				options: {
				top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 720,
				width: 400
				}
			});
			}
		},
		{
			name: "FOLDER.Delete",
			icon: '<i class="fas fa-dumpster"></i>',
			condition: game.user.isGM,
			callback: header => {
			const li = header.parent();
			const folder = game.folders.get(header.closest('.enchiridion-document')?.data()?.uuid.split('.')[1]);
			return Dialog.confirm({
				title: `${game.i18n.localize("FOLDER.Delete")} ${folder.name}`,
				content: `<h4>${game.i18n.localize("AreYouSure")}</h4><p>${game.i18n.localize("FOLDER.DeleteWarning")}</p>`,
				yes: () => folder.delete({deleteSubfolders: true, deleteContents: true}),
				options: {
				top: Math.min(li[0].offsetTop, window.innerHeight - 350),
				left: window.innerWidth - 720,
				width: 400
				}
			});
			}
		}
	];

	new ContextMenu(html.find('.enchiridion-tab'), null, documentItems);
	new ContextMenu(html.find('.enchiridion-tree:not([data-uuid*="Folder"])').children('h4'), null, documentItems);
	new ContextMenu(html.find('.enchiridion-tree[data-uuid*="Folder"]').children('h4'), null, folderItems);
}














/* -------------------------------------------------------------------------- */
/*                            Enchiridion Functions                           */
/* -------------------------------------------------------------------------- */






Enchiridion.collapse = function(ev) {
	//console.log($(ev.currentTarget).siblings().hide())
}


Enchiridion.createContents = async function(li){

	let uuid = null
	
	if(li.length) uuid = li?.closest('.enchiridion-document')?.data()?.uuid;
	let documentTypes = ['Journal Entry'].concat(game.system.documentTypes["Actor"]).concat(game.system.documentTypes["Item"]);
	const html = await renderTemplate(`modules/enchiridion/templates/enchiridion-create.html`, {documentTypes});
	Dialog.prompt({
		title: "Create New Document",
		content: html,
		callback: async function(html) {
			const form = html[0].querySelector("form");
			const name = $(form).find('[name="name"]').val()
			const newSubType = $(form).find('[name="type"]').val()
			const folder = uuid?.split('.')[0]=='Folder'?uuid?.split('.')[1]:null;
			let icon = $(form).find('.enchiridion-icon')[0].innerText

			if (icon =='❓') icon = null;
			let newData = {
				name,
				folder,
				flags: {
					enchiridion:{
						parent: uuid || null,
						icon
					}}
			}
			let newId ='';
			if (newSubType == 'Journal Entry'){
				let newDocuemnt = await JournalEntry.create(newData);
				newId = await newDocuemnt.uuid
			} else if (game.system.documentTypes["Actor"].includes(newSubType)){
				newData.type = newSubType;
				let newDocuemnt = await Actor.create(newData);
				newId = await newDocuemnt.uuid
			} else if (game.system.documentTypes["Item"].includes(newSubType)){
				newData.type = newSubType;
				let newDocuemnt = await Item.create(newData);
				newId = await newDocuemnt.uuid
			} else {
				newData.type = newSubType.split('.')[0];
				await Folder.create(newData)
			}
			let expanded = game.settings.get('enchiridion', 'userExpanded')
			expanded.indexOf(uuid) === -1 ? expanded.push(uuid) : 1;
			game.settings.set('enchiridion', 'userExpanded', expanded)

			let tabs = game.settings.get('enchiridion', 'userTabs')
			tabs.push(newId)
			game.settings.set('enchiridion', 'userTabs', tabs)
			game.settings.set('enchiridion', 'activeTab', newId)
			Enchiridion.open();
		},
		rejectClose: false,
		render: html => {
			html.find('.enchiridion-icon').each(function(i,icon){
				EmojiButton(icon, async function (emoji) {
					icon.innerText = emoji;
				});
			})
			}
	});
}






Enchiridion.selectTab = function (ev){
	const newTab = ev.currentTarget.dataset.tab
	game.settings.set('enchiridion', 'activeTab', newTab)
}

Enchiridion.openTab = function(ev){
	if (!ev.shiftKey){
		const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
		if (uuid.split('.')[0] == "Folder"){
			let expanded = game.settings.get('enchiridion', 'userExpanded')
			expanded.indexOf(uuid) === -1 ? expanded.push(uuid) : expanded.splice(expanded.indexOf(uuid), 1);
			game.settings.set('enchiridion', 'userExpanded', expanded)
			return Enchiridion.update()
		}
		let tabs = game.settings.get('enchiridion', 'userTabs')
		tabs.push(uuid)
		game.settings.set('enchiridion', 'userTabs', tabs)
		game.settings.set('enchiridion', 'activeTab', uuid)
		Enchiridion.update()
	} else{
		$(ev.currentTarget).toggleClass('enchiridion-multiselect')
	}

};

Enchiridion.clickImage = function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	if (!document.img) return;
	const dataset = ev.currentTarget.dataset
	let ip = new ImagePopout(document.data.img, {
		title: document.name,
		shareable: true,
		uuid: document.uuid
	})
	ip.render(true);
	if(dataset?.activation ==2 && game.user.isGM)	ip.shareImage();

}

Enchiridion.permissions = function (ev){
	ev.preventDefault();
	ev.stopPropagation();
	let li = $(ev.currentTarget).closest("li")
	const uuid = li?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	new PermissionControl(document, {
	  top: Math.min(li[0].offsetTop, window.innerHeight - 350),
	  left: window.innerWidth - 720
	}).render(true);
}

Enchiridion.ownedItem = function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const itemId = ev.currentTarget.dataset.documentId
	const item = document.getOwnedItem(itemId)
	if (item?.sheet?.rendered) {
		item.sheet.maximize();
		item.sheet.bringToTop();
	} else item?.sheet?.render(true);
}

Enchiridion.newNote = async function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
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

Enchiridion.openDocument = function (ev) {
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const sheet = document.sheet;
	if(ui.PDFoundry?.Utilities?.getPDFData(document)){
		const pdf = ui.PDFoundry.Utilities.getPDFData(document)
		ui.PDFoundry.openPDF(pdf)
	} else if ( sheet.rendered ) {
		sheet.maximize();
		sheet.bringToTop();
	} else sheet.render(true);
}

Enchiridion.openLink = function  (ev) {
	const  a = ev.currentTarget;
	const uuid = a.dataset.entity+'.'+a.dataset.id;
	if (!uuid || uuid.split('.')[0] == "Folder") return;
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	if (!document?.visible) return;
	let tabs = game.settings.get('enchiridion', 'userTabs')
	tabs.push(uuid)
	game.settings.set('enchiridion', 'userTabs', tabs)
	game.settings.set('enchiridion', 'activeTab', uuid)
	Enchiridion.update()
}

Enchiridion.deleteNote = function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const index = ev.currentTarget.dataset.index;
	let notes = document.getFlag('enchiridion', 'notes')
	notes.splice(index, 1);
	document.setFlag('enchiridion', 'notes', notes)
	Enchiridion.update()
}

Enchiridion.expand = function  (ev) {
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	let expanded = game.settings.get('enchiridion', 'userExpanded')
	expanded.indexOf(uuid) === -1 ? expanded.push(uuid) : expanded.splice(expanded.indexOf(uuid), 1);
	game.settings.set('enchiridion', 'userExpanded', expanded)
	Enchiridion.update()
}

Enchiridion.closeTab = function  (ev) {
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data().uuid
	let tabs = game.settings.get('enchiridion', 'userTabs')
	tabs = $.grep(tabs, function(value) {
	  return value != uuid;
	});
	game.settings.set('enchiridion', 'userTabs', tabs)
	Enchiridion.update()
}

Enchiridion.middleCloseTab = function  (ev) {
	if (ev.button !=1) return;
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data().uuid
	let tabs = game.settings.get('enchiridion', 'userTabs')
	tabs = $.grep(tabs, function(value) {
	  return value != uuid;
	});
	game.settings.set('enchiridion', 'userTabs', tabs)
	Enchiridion.update()
}

Enchiridion.emojiButton = function (i,icon){
	EmojiButton(icon, async function (emoji) {
		const uuid = $(icon)?.closest('.enchiridion-document')?.data()?.uuid
		const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
		await document.setFlag('enchiridion', 'icon', emoji)
		return Enchiridion.update();
	  });
}

Enchiridion.hideNote = function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const index = ev.currentTarget.dataset.index;
	let notes = document.getFlag('enchiridion', 'notes')
	notes[index].permissions={default:!notes[index].permissions.default}
	document.setFlag('enchiridion', 'notes', notes)
	return Enchiridion.update()
}

Enchiridion.editNote = function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const index = ev.currentTarget.dataset.index;
	const text = this.innerHTML
	let notes = document.getFlag('enchiridion', 'notes')
	notes[index].content = TextEditor.enrichHTML(text)
	document.setFlag('enchiridion', 'notes', notes)
}


Enchiridion.updateAssetName = function (ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const asset = $(ev.currentTarget).closest('.enchiridion-asset').data()
	const index = asset.index;
	const text = $(this).val()
	let assets = document.getFlag('enchiridion', 'assets')
	assets[index].name = text
	document.setFlag('enchiridion', 'assets', assets)
}

Enchiridion.toggleSearch = function (ev) {
	const toggle = $(ev.currentTarget).data().toggle;
	let searchOptions = game.settings.get('enchiridion','searchOptions');
	searchOptions[toggle] = !searchOptions[toggle];
	game.settings.set('enchiridion','searchOptions', searchOptions);
	Enchiridion.update()
}

Enchiridion.setFilter = function () {
	var searchStr = $( this ).val().toLowerCase();
	game.settings.set('enchiridion','searchFilter',$( this ).val())
	if (searchStr == '') return Enchiridion.update();
	Enchiridion.filter(searchStr)
}

Enchiridion.filter = function (searchStr){

	if (searchStr == '') return
	const searchOptions = game.settings.get('enchiridion','searchOptions');

	const actors = game.actors;
	const items = game.items;
	const journal = game.journal;
	const folders = game.folders.filter((folder) => ["Actor","JournalEntry","Item"].includes(folder.data.type));
	let documents = [...journal, ...actors, ...items, ...folders];

	function filterNotes(notes, searchStr){
		if (!notes || !searchOptions.notes) return false;
		let r = false
		notes.forEach(function(note){
			if (note.content.toLowerCase().includes(searchStr)) r = true
		})
		return r
	};

	function filterAssets(assets, searchStr){
		if (!assets || !searchOptions.assets) return false;
		let r = false
		assets.forEach(function(asset){
			if (asset.name.toLowerCase().includes(searchStr)) r = true
		})
		return r
	};

	function filterItems(actor, searchStr){
		if (!actor?.items || !searchOptions.items) return false;
		let r = false
		actor.items.forEach(function(item){
			
			if (item.name.toLowerCase().includes(searchStr)) {
				r = true
			}
		})
		return r
	};


	for ( let [k, v] of Object.entries(documents) ) {
		const name = v?.name.toLowerCase()
		const uuid = v?.uuid
		const notes = v?.data?.flags?.enchiridion?.notes
		const assets = v?.data?.flags?.enchiridion?.assets
		if (!name.includes(searchStr) && !filterNotes(notes, searchStr) && !filterAssets(assets, searchStr) && !filterItems(v?.data, searchStr)){
			$(`.enchiridion-nav [data-uuid="${uuid}"]`).hide();
			
		console.log($(`.enchiridion-nav [data-uuid="${uuid}"]`))
		}



	}
	for ( let [k, v] of Object.entries(documents) ) {
		const name = v.name.toLowerCase()
		const uuid = v.uuid
		const notes = v?.data?.flags?.enchiridion?.notes
		const assets = v?.data?.flags?.enchiridion?.assets

		if (name.includes(searchStr) || filterNotes(notes, searchStr) || filterAssets(assets, searchStr) || filterItems(v?.data, searchStr)){
			$(`.enchiridion-nav [data-uuid="${uuid}"]`).show();
			$(`.enchiridion-nav [data-uuid="${uuid}"]`).parentsUntil( ".enchiridion-nav" ).show();
		}
	}

}



/* -------------------------------------------------------------------------- */
/*                                Drag and Drop                               */
/* -------------------------------------------------------------------------- */




Enchiridion.onDragItemStart = async function (ev){
	if (!game.user.isGM) return;
	const uuid = $(ev.srcElement)?.closest('.enchiridion-document')?.data()?.uuid;
	const document = game.collections.get(uuid?.split('.')[0])?.get(uuid?.split('.')[1]);

	const assets = document?.getFlag('enchiridion', 'assets') || [];
	const assetIndex = $(ev.srcElement)?.closest('.enchiridion-asset')?.data()?.index;
	const asset = assets[assetIndex];

	const src = $(ev.srcElement)?.attr('src');
	let type = asset?.type || document?.documentName;
	if (asset?.type == 'image' || asset?.type == 'video' || src) type= "Tile";
	const id = asset?.id || document?.id;

	ev.dataTransfer.setData("text/plain", JSON.stringify({
		uuid,
		type,
		id,
		img: asset?.img || src,
		tileSize: 100,
		document,
		asset,
		assetIndex
		}));
}

Enchiridion.onDrop = async function(ev){
	if (!game.user.isGM) return;

	
	const uuid = $(ev.srcElement)?.closest('.enchiridion-document')?.data('uuid');
	const document = await fromUuid(uuid);
	let assets = document.getFlag('enchiridion', 'assets') || [];

	const dropType = $(ev.srcElement).closest('.enchiridion-drop').data()?.dropType;
	const files = ev.dataTransfer.files;
	let dataTransfer;try {dataTransfer = JSON.parse(ev.dataTransfer.getData('text/plain'));} catch (err) {};
	
/* Drop from External File*/

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
				permissions:{default:false}
			}

			if(dropType == "mainImage"){
				if (fileType == 'image' || fileType == 'video'){
					await document.update({[`img`]: assetFile});
				}
			} else {
				assets = [].concat(assets,[newAsset])
				await document.setFlag('enchiridion', 'assets', assets)
			}
		})
		return Enchiridion.update();
	} else

/* Drop from Foundry*/

	if(dataTransfer){
		// const multiUuid = $('.enchiridion-multiselect')?.closest('.enchiridion-document')?.map(function(){
		// 	return $(this).data('uuid');
		// }).get();
		// console.log(multiUuid)

		const asset = $(ev.srcElement)?.closest('.enchiridion-asset')?.data();
		const sourceAsset = dataTransfer?.asset;
		const sourceIndex = dataTransfer?.assetIndex;
		const destinationIndex = asset?.index;
	
		const sourceUuid = dataTransfer.uuid;
		let sourceDocument = game.collections.get(sourceUuid?.split('.')[0])?.get(sourceUuid?.split('.')[1])
		|| game.collections.get(dataTransfer?.type)?.get(dataTransfer?.id);
	
		let image = 'modules/enchiridion/icons/book-open-solid.png';
		if (sourceDocument.documentName == 'Scene') image = 'modules/enchiridion/icons/map-solid.png';
		if (sourceDocument.documentName == 'Playlist') image = 'modules/enchiridion/icons/music-solid.png';
		if (sourceDocument.documentName == 'Folder') image = 'modules/enchiridion/icons/folder-open-solid.png';
		if (sourceDocument.data.flags.pdfoundry?.PDFData?.url) image = 'modules/enchiridion/icons/file-pdf-regular.png';
		if (sourceDocument.data?.img) image = sourceDocument.data.img;
		const newAsset = {
			uuid: sourceDocument.uuid,
			id: sourceDocument.data._id,
			name: sourceDocument.data.name,
			image,
			type: sourceDocument.documentName,
			permissions:{}
		}

/* Drop from Enchiridion*/
		if(sourceUuid){
			switch(dropType){
				case "swap":
					if (!(sourceIndex+1) || !(destinationIndex+1)) return;
					assets[sourceIndex] = [assets[destinationIndex],assets[destinationIndex]=assets[sourceIndex]][0]
					await document.setFlag('enchiridion', 'assets', assets)
				break;
				case "mainImage":
					const newAsset = {
						id: document.data._id,
						name: document.data.name + " Previous Image",
						image: document.data.img,
						type: 'image',
						permissions:{}
					}
					assets = [].concat(assets,[newAsset])
					document.update({[`img`]: sourceAsset.image});
					await document.setFlag('enchiridion', 'assets', assets);
				break;
				case "note":
					let notes = document.getFlag('enchiridion', 'notes')
					const index = $(ev.srcElement)?.closest('.enchiridion-note')?.data()?.index
					var fig = `<figure class="image">
					<img src="${sourceAsset.image}" alt="" />
					<figcaption>${sourceAsset.name}</figcaption>
					</figure>`
					notes[index].content += fig
					await document.setFlag('enchiridion', 'notes', notes);
				break;
				default:
					if(!assets.find(asset => asset?.id==sourceAsset?.id)){
						assets = [].concat(assets,[sourceAsset])
						await document.setFlag('enchiridion', 'assets', assets)
					}
			}
			return Enchiridion.update();
		}
		
/* Drop from Outside Enchiridion*/
		
		else if(sourceDocument){
			switch(dropType){
				case 'tree':

					function checkLoops(document){
						if(sourceUuid == uuid) return true;
						const destinationParentUuid = document?.data?.flags?.enchiridion?.parent
						if(destinationParentUuid == uuid || destinationParentUuid == sourceUuid || document?.folder?.uuid == sourceUuid){
							ui.notifications.warn("That arrangement would create a loop! Please choose a different arrangement.")
							return true};
							
						const parent = game.collections.get(destinationParentUuid?.split('.')[0])?.get(destinationParentUuid?.split('.')[1]);
						if (parent){
							return checkLoops(fromUuid(destinationParentUuid))
						} else {
							return false
						};
					}

					if(ev.ctrlKey){

						let parentUuid = document?.data?.flags?.enchiridion?.parent;
						const parent = game.collections.get(parentUuid?.split('.')[0])?.get(parentUuid?.split('.')[1]);
						if (checkLoops(parent)) return;

						let folder = game.folders.get(parentUuid?.split('.')[1])
						let expanded = game.settings.get('enchiridion', 'userExpanded')
						expanded.indexOf(parentUuid) === -1 ? expanded.push(parentUuid) : 1;
						await sourceDocument.setFlag('enchiridion', 'parent', parentUuid)
						await sourceDocument.update({folder: parentUuid?.split('.')[1] || null});
						await sourceDocument.update({parent: parentUuid?.split('.')[1] || null});
						await game.settings.set('enchiridion', 'userExpanded', expanded)

						const actors = game.actors;
						const items = game.items;
						const journal = game.journal;
						const folders = game.folders.filter((folder) => ["Actor","JournalEntry","Item"].includes(folder.data.type));
						let documents = [...journal, ...actors, ...items, ...folders];

						let h = $(ev.srcElement).innerHeight();
						let o = $(ev.srcElement).offset(); 
						let y = ev.pageY - o.top;
						let sortBefore = false
						if(h/2 > y) sortBefore = true;


						const sorting = SortingHelpers.performIntegerSort(sourceDocument, {target:document, siblings:documents, sortKey:'sort', sortBefore});
						const itemSort = sorting.filter(d => d.target.documentName == "Item");
						const actorSort = sorting.filter(d => d.target.documentName == "Actor");
						const journalSort = sorting.filter(d => d.target.documentName == "JournalEntry");
						const folderSort = sorting.filter(d => d.target.documentName == "Folder");

						async function updateSort(sorter, constructor){
							const updates = [];
							let updateData={};
							for ( let s of sorter ) {
								const doc = s.target;
								const update = foundry.utils.mergeObject(updateData, s.update, {inplace: false});
								update._id = doc.id;
								if ( doc.sheet && doc.sheet.rendered ) await doc.sheet.submit({updateData: update});
								else updates.push(update);
							}
							if ( updates.length ) await constructor.updateDocuments(updates);
						}

						await updateSort(itemSort, Item)
						await updateSort(actorSort, Actor)
						await updateSort(journalSort, JournalEntry)
						await updateSort(folderSort, Folder)



						return Enchiridion.update()
					}


					if (checkLoops(document)) return;

					let folder = game.folders.get(uuid.split('.')[1])
					let expanded = game.settings.get('enchiridion', 'userExpanded')
					expanded.indexOf(uuid) === -1 ? expanded.push(uuid) : 1;
					await sourceDocument.setFlag('enchiridion', 'parent', uuid)
					if (uuid.split('.')[0]=="Folder") await sourceDocument.update({folder: uuid.split('.')[1]});
					await sourceDocument.update({parent: uuid?.split('.')[1] || null});
					await game.settings.set('enchiridion', 'userExpanded', expanded)
				break;

				case "note":
					let notes = document.getFlag('enchiridion', 'notes')
					const index = $(ev.srcElement)?.closest('.enchiridion-note')?.data()?.index
					var $html = $(TextEditor._createContentLink('',dataTransfer.type,dataTransfer.id,(sourceDocument.data.flags.enchiridion?.icon||'')+sourceDocument.name));    
					$html.find(':first-child').remove();
					var link = $html.addClass('mceNonEditable').prop('outerHTML');
					notes[index].content += link
					await document.setFlag('enchiridion', 'notes', notes)
				break;


				// case "references":
				// 	//console.log("ASD")
				// break;
				case "tab":
					let tabs = game.settings.get('enchiridion', 'userTabs');
					if (!(tabs.indexOf(dataTransfer.uuid)+1) || !(tabs.indexOf(uuid)+1)){
						if(!assets.find(asset => asset.id==newAsset.id)){
							assets = [].concat(assets,[newAsset])
							await document.setFlag('enchiridion', 'assets', assets)
						}
					} else{
						tabs[tabs.indexOf(dataTransfer.uuid)] = [tabs[tabs.indexOf(uuid)],tabs[tabs.indexOf(uuid)]=tabs[tabs.indexOf(dataTransfer.uuid)]][0]
						game.settings.set('enchiridion', 'userTabs', tabs)
					};
					game.settings.set('enchiridion', 'activeTab', uuid);
				break;
				default:
					if(!assets.find(asset => asset.id==newAsset.id)){
						assets = [].concat(assets,[newAsset])
						await document.setFlag('enchiridion', 'assets', assets)
					}
				}
			Enchiridion.update()
		}
	}
};



/* -------------------------------------------------------------------------- */
/*                               Activate Assets                              */
/* -------------------------------------------------------------------------- */




Enchiridion.assetActivate = function(ev){
	const uuid = $(ev.currentTarget)?.closest('.enchiridion-document')?.data()?.uuid;
	const document = game.collections.get(uuid.split('.')[0])?.get(uuid.split('.')[1]);
	const dataset = ev.currentTarget.dataset;
	let activation = dataset.activation;

	const index = $(ev.currentTarget).closest('.enchiridion-asset').data()?.index
	const asset = document.data.flags.enchiridion.assets[index]
	const assetUuid = asset.uuid
	const assetDocument = game.collections.get(assetUuid?.split('.')[0])?.get(assetUuid?.split('.')[1]);
	const assetTitle = asset.name
	const extention = asset.id?.split('.')[1];
	const assetType = asset.type;

	let assets = document.getFlag('enchiridion', 'assets');
	let src, ip

	if (activation == 4 && game.user.isGM){
		assets.splice(index, 1);
		document.setFlag('enchiridion', 'assets', assets)
		return Enchiridion.update()
	}
	if (activation == 3 && game.user.isGM){
		assets[index].permissions={default:!assets[index].permissions.default}
		document.setFlag('enchiridion', 'assets', assets)
		return Enchiridion.update()
	}
	if (extention == 'pdf'){
		if (ui.PDFoundry) {
			ui.PDFoundry.openURL(asset.id);
		} else {
			ui.notifications.warn('PDFoundry must be installed to view PDF files.');
		}
		return
	}
	if (activation == 0){
		if (ev.type=='contextmenu' ){
			src = ev.currentTarget.src || $(ev.currentTarget).closest('.enchiridion-asset').find('img').attr('src');
			ip = new ImagePopout(src, {
				title: assetTitle,
				shareable: true,
				uuid: document.uuid
			})
			return ip.render(true);
		} else {
			activation =1;
		}
	}

	switch (assetType){
		case 'image':
			src = ev.currentTarget.src || $(ev.currentTarget).closest('.enchiridion-asset').find('img').attr('src');
			ip = new ImagePopout(src, {
				title: /*document.data.name + " - " +*/ assetTitle,
				shareable: true,
				uuid: document.uuid
			})
			ip.render(true);
			if(activation == 2 && game.user.isGM) ip.shareImage();
		break;
		case 'video':
			src = ev.currentTarget.src || $(ev.currentTarget).closest('.enchiridion-asset').find('img').attr('src');
			ip = new ImagePopout(src, {
				title: /*document.data.name + " - " +*/ assetTitle,
				shareable: true,
				uuid: document.uuid
			})
			ip.render(true);
			if(activation == 2 && game.user.isGM) ip.shareImage();
		break;
		case 'audio':
			if (!game.user.isGM) return;
			const sounds = [...game.audio.playing.values()]
			const sound = sounds.find(el => el.src == asset.id);
			const playing = sound?.playing
			const loop = (activation ==2);
			if (playing){
				sound.stop()
			} else {
				AudioHelper.play({
					src: asset.id,
					volume: 1.0,
					loop
					});
			}
		break;
		case "RollTable" :
			if(activation == 1){
				assetDocument.draw()
			} else {
				if (assetDocument.sheet.rendered) {
					assetDocument.sheet.maximize();
					assetDocument.sheet.bringToTop();
				} else assetDocument.sheet.render(true);
			}
		break;
		case "Playlist" :
			if (!game.user.isGM) return;
			if(activation == 1){
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

			} else if (activation == 2){
				if (assetDocument.sheet.rendered) {
					assetDocument.sheet.maximize();
					assetDocument.sheet.bringToTop();
				} else assetDocument.sheet.render(true);
			}
		break;
		case "Scene" :
			if (!game.user.isGM) return;
			if(activation == 1){
				assetDocument.activate();
			} else if (dataset?.activation == 2){
				if (assetDocument.sheet.rendered) {
					assetDocument.sheet.maximize();
					assetDocument.sheet.bringToTop();
				} else assetDocument.sheet.render(true);
			}
		break;
		case "JournalEntry" :
			if (assetDocument){
				if(activation == 2){
				let tabs = game.settings.get('enchiridion', 'userTabs')
				tabs.push(assetUuid)
				game.settings.set('enchiridion', 'userTabs', tabs)
				game.settings.set('enchiridion', 'activeTab', assetUuid)
				Enchiridion.update()
			}
			else if(activation == 1 && ui.PDFoundry?.Utilities?.getPDFData(assetDocument)){
				const pdf = ui.PDFoundry.Utilities.getPDFData(assetDocument);
				ui.PDFoundry.openPDF(pdf);
			} else {
				if (assetDocument.sheet.rendered) {
					assetDocument.sheet.maximize();
					assetDocument.sheet.bringToTop();
				} else assetDocument.sheet.render(true);
			}
			} else {
				ui.notifications.warn("That Document Could not be Found")
			}
		break;
		case "Actor" :
			if (assetDocument){
				if(activation == 2){
						let tabs = game.settings.get('enchiridion', 'userTabs')
						tabs.push(assetUuid)
						game.settings.set('enchiridion', 'userTabs', tabs)
						game.settings.set('enchiridion', 'activeTab', assetUuid)
						Enchiridion.update()
				} else {
					if (assetDocument.sheet.rendered) {
						assetDocument.sheet.maximize();
						assetDocument.sheet.bringToTop();
					} else assetDocument.sheet.render(true);
				}				
			} else {
				ui.notifications.warn("That Document Could not be Found")
			}
		break;
		case "Item" :
			if (assetDocument){
				if(activation == 2){
						let tabs = game.settings.get('enchiridion', 'userTabs')
						tabs.push(assetUuid)
						game.settings.set('enchiridion', 'userTabs', tabs)
						game.settings.set('enchiridion', 'activeTab', assetUuid)
						Enchiridion.update()
				} else {
					if (assetDocument.sheet.rendered) {
						assetDocument.sheet.maximize();
						assetDocument.sheet.bringToTop();
					} else assetDocument.sheet.render(true);
				}				
			} else {
				ui.notifications.warn("That Document Could not be Found")
			}
		break;
		default:
			if (assetDocument){
				if (assetDocument.sheet.rendered) {
					assetDocument.sheet.maximize();
					assetDocument.sheet.bringToTop();
				} else assetDocument.sheet.render(true);
			} else {
				ui.notifications.warn("That Document Could not be Found")
			}
	};
};







/* -------------------------------------------------------------------------- */
/*                                    Handlebars                              */
/* -------------------------------------------------------------------------- */



Hooks.once("ready", async function() {

	$.get( "modules/enchiridion/templates/enchiridion-body.html", function( data ) {
		$( ".result" ).html( data );
		Handlebars.registerPartial('enchiridionBody', data)
	  });


	Handlebars.registerHelper('isGM', function(options) {
		if (game.user.isGM) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('notGM', function(options) {
		if (!game.user.isGM) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('enchiridionEnrich', function(str) {
		if (!str) return '';
		return TextEditor.enrichHTML(str);
	});

	Handlebars.registerHelper('enchiridionDefaultIcon', function(document) {
		let type = document?.data?.type || document?.documentName;
		if (document?.documentName == 'Folder') type = "Folder";
		type = type || "JournalEntry";
		const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
		return defaultIcon;
	});

	Handlebars.registerHelper('enchiridionExpanded', function(document) {
		const expanded = game.settings.get('enchiridion', 'userExpanded');
		if (expanded.includes(document.uuid)) return `<a class="fas fa-chevron-down"></a>`;
		return `<a class="fas fa-chevron-right"></a>`;
	});

	Handlebars.registerHelper('enchiridionFilter', function() {
		return 	game.settings.get('enchiridion','searchFilter')
	});

	Handlebars.registerHelper('filterDocument', function(document, options) {
		const tabs = game.settings.get('enchiridion', 'userTabs');
		if (tabs.includes(document.uuid) && document.documentName!="Folder") {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('filterEnchiridionDocuments', function(documents, options) {
		const tabs = game.settings.get('enchiridion', 'userTabs');
		return documents.filter(document => tabs.includes(document.uuid) && document.documentName!="Folder")
	});

	Handlebars.registerHelper('enchiridionActivationIcon', function(asset, num) {
		let hide = '';
		if (game.user.isGM) hide =` <a class="fas fa-eye-slash enchiridion-asset-activate" data-activation="3" title = "Hide From Players"></a> `;
		switch(asset?.type){
			case 'image':
				return num==1?
				'<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a>':
				'<a class="fas fa-share enchiridion-asset-activate" data-activation="2" title = "Share"></a>'+hide;
			case 'video':
				return num==1?
				'<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a>':
				'<a class="fas fa-share enchiridion-asset-activate" data-activation="2" title = "Share"></a>'+hide;
			case 'audio':
				return num==1?
				'<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a>':
				'<a class="fas fa-sync enchiridion-asset-activate" data-activation="2" title = "Loop"></a>'+hide;
			case 'RollTable':
				return num==1?
				'<a class="fas fa-dice enchiridion-asset-activate" data-activation="1" title = "Roll on Table"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
			case 'Playlist':
				return num==1?
				'<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
			case 'Scene':
				return num==1?
				'<a class="fas fa-map enchiridion-asset-activate" data-activation="1" title = "Activate Scene"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
			case 'application':
				return num==1?
				'<a class="fas fa-file-pdf enchiridion-asset-activate" data-activation="1" title = "View PDF"></a>':
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
			case 'Actor':
				return num==1?
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':
				'<a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'+hide;
			case 'Item':
				return num==1?
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':
				'<a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'+hide;
			case 'JournalEntry':
				return num==1?
				'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':
				'<a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'+hide;
			default:
				return num==1?'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>'+hide:'';
		}
	});

	Handlebars.registerHelper('enchiridionTabs', function() {
		const actors = game.actors;
		const items = game.items;
		const journal = game.journal;
		let documents = [...journal, ...actors, ...items];
		documents = documents.filter((document)=> document.visible);
		const tabs = game.settings.get('enchiridion', 'userTabs')
		//documents = documents.filter((document)=> tabs.includes(document.uuid));
		documents = documents.sort(function(a, b) {
			return tabs.indexOf(b.uuid) - tabs.indexOf(a.uuid);
	  	});
		let html ='';
		documents.forEach(function(document){
			let type = document?.data?.type || document.documentName
			if (document.documentName == 'Folder') type = "Folder";
			const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
			if (tabs.includes(document.uuid)){
				html = `
				<li class="enchiridion-tab enchiridion-document  enchiridion-drag enchiridion-drop" data-drop-type="tab" title="${document.data.name}"  data-tab="${document.uuid}" data-uuid="${document.uuid}">
						<a><i class="fas fa-times enchiridion-close-tab"></i></a><a class="tab-content" data-drop-type="tab">${document.data.flags?.enchiridion?.icon || defaultIcon}${document.data.name}</a>
				</li>
				` +html
			}
		})
		return html;
	});




/* -------------------------------------------------------------------------- */
/*                                  Settings                                  */
/* -------------------------------------------------------------------------- */



	game.settings.register("enchiridion", "activeTab", {
		name: "activeTab",
		hint: "",
		scope: "client",
		config: false,
		default: "",
		type: String
	});

	game.settings.register("enchiridion", "searchFilter", {
		name: "searchFilter",
		hint: "",
		scope: "client",
		config: false,
		default: "",
		type: String
	});

	game.settings.register("enchiridion", "searchOptions", {
		name: "searchOptions",
		hint: "",
		scope: "client",
		config: false,
		default: {
			names: false,
			references: false,
			notes: false,
			assets: false,
			items: false,
			case: false,
		},
		type: Object
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

	game.settings.register("enchiridion", "open", {
		name: "Open at Starup",
		hint: "Open Enchiridion as soon as the game initializes.",
		scope: "client",
		config: true,
		default: false,
		type: Boolean
	});

	if (game.settings.get("enchiridion", "open"))	Enchiridion.open();

	// console.log(game)
	const documentTypes = ['JournalEntry', 'Folder'].concat(game.system.documentTypes["Actor"]).concat(game.system.documentTypes["Item"]);
	const defaults = {
		character: '🧑',
		npc: '👤',
		vehicle: '⛵',
		item: '♟️',
		skill: '⚡',
		weapon: '🗡️',
		equipment: '🛡️',
		consumable: '🧪',
		tool: '🛠️',
		loot: '💰',
		class: '🧙',
		spell: '🔥',
		feat: '⚡',
		backpack: '🎒',
		Folder: '📂',
		base: '📖'
	}
	documentTypes.forEach(function(type){
		game.settings.register("enchiridion", "default-"+type, {
			name: "Default " + type.charAt(0).toUpperCase() + type.slice(1) +" Icon",
			hint: "",
			scope: "world",
			config: game.user.isGM,
			default: defaults[type] || '📖',
			type: String
		});
	})

	if (game.user.isGM) await createFoldersIfMissing();
	async function createFolderIfMissing(folderPath) {
		let source = "data";
		if (typeof ForgeVTT != "undefined" && ForgeVTT.usingTheForge) {
			source = "forgevtt";
		}
		try {
			await FilePicker.browse(source, folderPath);
		} catch (error){
			await FilePicker.createDirectory(source, folderPath);
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
	

	if (game.user.isGM) {
		const navToggleButton = $('#nav-toggle');
		navToggleButton.before(
			`<button id='openEnchiridion' type="button" class="nav-item" title="Open Enchiridion"><i class="fas fa-book-medical"></i></button>`
		);

		$('#openEnchiridion').on('click', () => Enchiridion.open())
		$('#openEnchiridion').on('contextmenu', () => Enchiridion.createContents())

	}




// 	TextEditor.prototype.constructor._onClickContentLink = function(event) {
// 		console.log(evenssssssssst)
// 			}
// // 	TextEditor._onClickContentLink = function(event) {
// // console.log(event)
// // 	}
// 	TextEditor.activateListeners = function() {

// 		const body = $("body");
// 		//body.on("click", "a.entity-link", this._onClickContentLink);
// 		body.on("click", "a.entity-link", 		console.log("HHHHHHHHHHHHHHHHHHHHHHHH"));
// 		body.on('dragstart', "a.entity-link", this._onDragEntityLink);
// 		body.on("click", "a.inline-roll", this._onClickInlineRoll);
// 	  }

//TextEditor._createContentLink = function(){}

});



/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */




Hooks.on("createItem", Enchiridion.update)
Hooks.on("updateItem", Enchiridion.update)
Hooks.on("deleteItem", Enchiridion.update)
Hooks.on("createActor", Enchiridion.update)
Hooks.on("updateActor", Enchiridion.update)
Hooks.on("deleteActor", Enchiridion.update)
Hooks.on("createJournalEntry", Enchiridion.update)
Hooks.on("updateJournalEntry", Enchiridion.update)
Hooks.on("deleteJournalEntry", Enchiridion.update)
Hooks.on("deleteFolder", Enchiridion.update)
Hooks.on("updateFolder", Enchiridion.update)
Hooks.on("createFolder", Enchiridion.update)
 




Hooks.on("renderActorSheet", function(document, html){
	html.find("a.entity-link").on("contextmenu", Enchiridion.openLink);
})
 


Hooks.on("renderActorSheet", async function(document,html){

	html.find('.window-header h4').after('<a class="open-enchiridion"><i class="fas fa-book-medical"></i>Enchiridion</a>')
	html.find('.open-enchiridion').on("click",function(){
		const uuid = document.document.uuid
		let tabs = game.settings.get('enchiridion', 'userTabs')
		tabs.indexOf(uuid) === -1 ? tabs.push(uuid) : 1;
		game.settings.set('enchiridion', 'userTabs', tabs)
		game.settings.set('enchiridion', 'activeTab', uuid)
		Enchiridion.open()
	});

})

Hooks.on("renderItemSheet", async function(document,html){
	if (document.actor) return;
	html.find('.window-header h4').after('<a class="open-enchiridion"><i class="fas fa-book-medical"></i>Enchiridion</a>')
	html.find('.open-enchiridion').on("click",function(){
		const uuid = document.document.uuid
		let tabs = game.settings.get('enchiridion', 'userTabs')
		tabs.indexOf(uuid) === -1 ? tabs.push(uuid) : 1;
		game.settings.set('enchiridion', 'userTabs', tabs)
		game.settings.set('enchiridion', 'activeTab', uuid)
		Enchiridion.open()
	});

	html.find('.tabs').append(`<a class="item" data-tab="${document.document.uuid}">Enchiridion</a>`)
	html.find('.tabs .item').css('margin',0)
	const enchiridion = await renderTemplate(`modules/enchiridion/templates/enchiridion-body.html`, document);
	html.find('.sheet-body').append(`<div id="enchiridion">${enchiridion}</div>`)
	
})

Hooks.on("renderJournalSheet", async function(document,html){
	html.find('.window-header h4').after('<a class="open-enchiridion"><i class="fas fa-book-medical"></i>Enchiridion</a>')
	html.find('.open-enchiridion').on("click",function(){
		const uuid = document.document.uuid
		let tabs = game.settings.get('enchiridion', 'userTabs')
		tabs.indexOf(uuid) === -1 ? tabs.push(uuid) : 1;
		game.settings.set('enchiridion', 'userTabs', tabs)
		game.settings.set('enchiridion', 'activeTab', uuid)
		Enchiridion.open()
	});

	// const enchiridion = await renderTemplate(`modules/enchiridion/templates/enchiridion-body.html`, document);
	// html.find('input').append(`<div id="enchiridion">${enchiridion}</div>`)
})
