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
			minimum: 0,
			scrollY: ['.enchiridion-body', '.enchiridion-nav', '.enchiridion-main', '.enchiridion-document'],
			maximum: null,
			minimizable: true,
			resizable: true,
			tabs: [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: ""}]
		});
	}

	getData() {return {documents: this.options.documents}};

	async activateListeners(html) {
		const documents = this.options.documents;
		Enchiridion.listeners()
		Enchiridion.addToTree(documents);
		Enchiridion.addToBody(documents);
		this.form.ondrop = ev => Enchiridion.onDrop(ev);
	};
};

/* -------------------------------------------------------------------------- */
/*                               Open and Update                              */
/* -------------------------------------------------------------------------- */
Enchiridion.open = async function(){
	const actors = game.actors;
	const items = game.items;
	const journal = game.journal;
	let documents = [...journal, ...actors, ...items];
	documents = documents.filter((document)=> document.visible);
	const folders = game.folders.filter((folder) => ["Actor","JournalEntry","Item"].includes(folder.type));
	documents = [...documents, ...folders];
	documents.sort((a, b) => a.sort - b.sort);
	const activeTab = game.settings.get('enchiridion', 'activeTab');
	const tabs = [{ navSelector: ".enchiridion-tabs", contentSelector: ".enchiridion-body", initial: activeTab}]
	const title = game.world.data.title+" Enchiridion"
	const options = {title, documents, tabs/*, openTabs*/};
	const window = new Enchiridion(this.object, options);
	await window.render(true);
}


Enchiridion.updateDocument = async function (document, updates, options){
	if (updates?.flags?.enchiridion?.notes || updates?.flags?.enchiridion?.assets || document.actor) return;

	const otherUuids = options.otherUuids;
	let documents = [document]
	await otherUuids?.forEach(async function (uuid){
		if (!uuid) return;
		const otherDocument = await fromUuid(uuid);
		documents.push(otherDocument);
	})
	Enchiridion.addToTree(documents);
	Enchiridion.addToBody(documents);
}

Enchiridion.deleteDocument = async function (document){
	if (!$(`.enchiridion-tree[data-uuid="${document.uuid}"]`).siblings().length) $(`.enchiridion-tree[data-uuid="${document.uuid}"]`).parent().parent().children('h4').children('.enchiridion-expand').children('.enchiridion-chevron').hide();
	$(`#enchiridion [data-uuid="${document.uuid}"]`).remove()
	let tabs = game.settings.get('enchiridion', 'userTabs')
	tabs = $.grep(tabs, function(value) {
	return value != document.uuid;
	});
	game.settings.set('enchiridion', 'userTabs', tabs);

	const active = game.settings.get('enchiridion', 'activeTab');
	$('#enchiridion').find('.active').removeClass('active');
	$(`#enchiridion .enchiridion-main [data-uuid="${active}"]`).addClass("active")
}

Enchiridion.addToTree = function (documents){
	const $tree = $('#enchiridion .enchiridion-nav > ul');
	const expanded = game.settings.get("enchiridion", "userExpanded");
	documents.forEach(document => {
		if (!document?.visible && document?.documentName != 'Folder') return;
		const $document = $tree.find(`.enchiridion-tree[data-uuid="${document.uuid}"]`);

		//Children and Expanded?
		const $children = $document?.children('.enchiridion-children').html() || "";
		let expandedClass = expanded.includes(document.uuid)?"expanded":"";

		//Determine the entry icon
		let type = document.type || document.documentName
		if (document.documentName == 'Folder') type = "Folder";
		const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
		const icon = (document.flags?.enchiridion?.icon||defaultIcon);

		//Determine the ownership icons
		let ownership = '';
		if (game.user.isGM){
			for (let id in document.ownership) {
				const thisOwnership = document.ownership[id];
				if (id == 'default' || thisOwnership != 3 ){
					const user = game.users.get(id);
					const color = user?.color || "rgba(0, 0, 0, 0.3)";
					const name = user?.name || 'Default';
	
					let ownershipIcon ='fa-lock';
					let ownershipName ='Hidden';
					switch (thisOwnership){
						case CONST.DOCUMENT_PERMISSION_LEVELS.LIMITED:
							ownershipIcon = 'fa-low-vision';
							ownershipName = 'Limited';
							break;
						case CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER:
							ownershipIcon = 'fa-eye';
							ownershipName = 'Observer';
							break;
						case CONST.DOCUMENT_PERMISSION_LEVELS.OWNER:
							ownershipIcon = 'fa-pen';
							ownershipName = 'Owner';
							break;
					}
	
					ownership = `<i title="${name}: ${ownershipName}" class="fas ${ownershipIcon}" style="color: ${color};"/></i>` + ownership;
				};

			}
		}

		//Exposes Resernces
		let referencesString = '';
		document.flags?.enchiridion?.assets?.forEach(asset =>{
			referencesString += " reference-"+asset?.uuid?.replace('.','-');
		})
		
		
		if (document.documentName != 'Folder'){
			let summary = document.content||document.system?.details?.biography?.value||document.system?.description?.value||document.system?.background||document?.system?.summary||"";
			let summaryUuids = summary?.match(/@(.*?)\[(.*?)]/g)
			if (summaryUuids?.length){
				for (let summaryUuid of summaryUuids) {
					summaryUuid = summaryUuid.replace('[','.').replace(']','').replace('@','')
					referencesString += " reference-"+summaryUuid.replace('.','-');
				}
			}
		}

		//Generate the entry
		const treeEntry = `
		<li class="add-listener enchiridion-document enchiridion-tree ${expandedClass} enchiridion-drop ${referencesString}" data-drop-type="tree" data-uuid="${document.uuid}" data-sort="${document.sort || "0"+document.id.split('').map(x=>x.charCodeAt(0)).reduce((a,b)=>a+b)}">
			<hr>
			<h4 class="enchiridion-tree-header">
				<div class = 'enchiridion-expand'>
					<a class="fas fa-chevron-right enchiridion-chevron" style="display: none"></a>
				</div>
				<div class = 'enchiridion-tree-title enchiridion-open-tab enchiridion-drag'>
					<a><span class = "icon">${icon}</span> ${document.name}</a>
				</div>
				<div><a class="enchiridion-ownership">${ownership}</a></div>
			</h4>
			<ul class="enchiridion-children">${$children}</ul>
		</li>`;

		//Update the entry if it already exists, otherwise create it
		if($document.length && document.flags?.enchiridion?.parent){
			$document.replaceWith(treeEntry)
		}else{
			$(`#enchiridion .enchiridion-tree[data-uuid="${document.uuid}"]`).remove()
			$tree.append(treeEntry);
		};
		
		;
	});

	// Sort documents under their parents
	const children  = documents.filter(document => document?.flags?.enchiridion?.parent || document?.folder?.uuid || document?.parentFolder?.uuid);
	children.forEach(function(document){
		const parent = document.flags?.enchiridion?.parent || document.folder?.uuid || document.parentFolder?.uuid;
		if (!parent) return;
		let $parent = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${parent}"] > .enchiridion-children`);
		if (!$parent.length) return;//$parent = $('.enchiridion-unknown > .enchiridion-children') ;
		$parent.siblings('h4').children('.enchiridion-expand').children('.enchiridion-chevron').show()
		const $child = $('#enchiridion').find(`.enchiridion-tree[data-uuid="${document.uuid}"]`);
		$parent.append($child.prop('outerHTML'));
		$child.remove();
	});

	//Hide Chevrons and Hidden Folders
	documents.forEach(document => {
		if (!document?.visible && document?.documentName != 'Folder') return; // && !shownFolders.includes(document.uuid)
		const $document = $tree.find(`.enchiridion-tree[data-uuid="${document.uuid}"]`);
		const $children = $document?.children('.enchiridion-children').html() || "";
		if($children.trim()){$(`#enchiridion .enchiridion-tree[data-uuid="${document.uuid}"] > h4 > .enchiridion-expand > .enchiridion-chevron`).show()}
		else {$(`#enchiridion .enchiridion-tree[data-uuid="${document.uuid}"] > h4 > .enchiridion-expand > .enchiridion-chevron`).hide()}
	});

	$(`#enchiridion .enchiridion-tree[data-uuid*="Folder"]`).filter(function(){
        return $(this).children(".enchiridion-children").children().length == 0 && (!game.user.isGM || $(this).data('uuid') == 'Folder.Unknown');
    }).hide();

	//Sort and Listen
	Enchiridion.sort(documents)
	Enchiridion.listeners()
}











Enchiridion.addToBody = async function (documents){
	
	const $body = $('#enchiridion').find('.enchiridion-body');
	const $tabs = $('#enchiridion').find('.enchiridion-tabs');
	const userTabs = game.settings.get('enchiridion', 'userTabs');
	const activeTab = game.settings.get('enchiridion', 'activeTab');

	if (game.ForgeOfLegends){
		for (const tab of userTabs) {
			const document = documents.find(document => document.uuid === tab);
			if (document?.visible && document.documentName =="Item"){
				await game.ForgeOfLegends?.generateItemSummary(document);
			}
		}
	}

	for (const tab of userTabs) {
		const document = documents.find(document => document.uuid === tab);
		if (document?.visible){

			//Determine the entry icon
			let type = document.type || document.documentName
			if (document.documentName == 'Folder') type = "Folder";
			const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
			const icon = (document.flags?.enchiridion?.icon||defaultIcon);

			//Add references to header
			let references ='';

			let parent =null;
			const parentUuid = document.flags?.enchiridion?.parent;
			if (parentUuid) parent = await fromUuid(parentUuid);
			if (parent?.visible) {
				let type = parent.type || parent.documentName
				if (parent.documentName == 'Folder') type = "Folder";
				const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
				references += `<span title="Container" class="enchiridion-reference-section">🔼<a class="enchiridion-open-reference" data-reference-uuid="${parent.uuid}">${parent.flags.enchiridion?.icon||defaultIcon} ${parent.name} </a></span>`
			}

			const childrenUuids = $(`.enchiridion-tree[data-uuid="${document.uuid}"]`).children(`.enchiridion-children`).children().toArray().map(el => $(el).data('uuid'));
			if (childrenUuids.length) references += `<span title="Contents" class="enchiridion-reference-section">🔽`;
			for (const childUuid of childrenUuids) {
				const child = await fromUuid(childUuid)
				if (child?.visible) {
					let type = child.type || child.documentName
					if (child.documentName == 'Folder') type = "Folder";
					const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
					references += `<a class="enchiridion-open-reference" data-reference-uuid="${child.uuid}">${child.flags.enchiridion?.icon||defaultIcon} ${child.name} </a>`
				}
			}
			if (childrenUuids.length) references += `</span>`;

						
			let referenceUuids = $(`#enchiridion .reference-${document?.uuid.replace('.','-')}`).map(function(){
				return $(this).data('uuid');
			}).get()

			if (referenceUuids.length) references += `<span title="Incoming References" class="enchiridion-reference-section">◀️`;
			for (const referenceUuid of referenceUuids) {
				const reference = await fromUuid(referenceUuid);
				let type = reference?.type || reference?.documentName
				if (["Item","Actor","JournalEntry"].includes(reference?.documentName)){
					if (reference.documentName == 'Folder') type = "Folder";
					const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
					references += `<a class="enchiridion-open-reference" data-reference-uuid="${reference.uuid}">${reference.flags.enchiridion?.icon||defaultIcon} ${reference.name} </a>`
				}
			}

			//Summary
			let summary = document.content||document.system?.details?.biography?.value||document.system?.description?.value||document.system?.background||document?.system?.summary||"";
			let summaryUuids = summary.match(/@(.*?)\[(.*?)]/g)
			if (summaryUuids?.length){
				for (let summaryUuid of summaryUuids) {
					summaryUuid = summaryUuid.replace('[','.').replace(']','').replace('@','')
					const reference = await fromUuid(summaryUuid);
					let type = reference?.type || reference?.documentName
					if (["Item","Actor","JournalEntry"].includes(reference?.documentName)){
						if (reference.documentName == 'Folder') type = "Folder";
						const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
						references += `<a class="enchiridion-open-reference" data-reference-uuid="${reference.uuid}">${reference.flags.enchiridion?.icon||defaultIcon} ${reference.name} </a>`
					}
				}
			}
			if (referenceUuids.length) references += `</span>`;
			summary = TextEditor.enrichHTML(summary);

			//Assets
			let assets = "";
			if (document.flags?.enchiridion?.assets){
				if(document.flags?.enchiridion?.assets.some(el => el.uuid) || summaryUuids?.length) references += `<span title="Outgoing References" class="enchiridion-reference-section">▶️`;
				for (const asset of document.flags?.enchiridion?.assets) {
						let assetButtons = '';
						switch(asset?.type){
							case 'image':
								assetButtons += '<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a><a class="fas fa-share enchiridion-asset-activate" data-activation="2" title = "Share"></a>';
							break;
							case 'video':
								assetButtons += '<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a><a class="fas fa-share enchiridion-asset-activate" data-activation="2" title = "Share"></a>';
							break;
							case 'audio':
								assetButtons += '<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a><a class="fas fa-sync enchiridion-asset-activate" data-activation="2" title = "Loop"></a>';
							break;
							case 'RollTable':
								assetButtons += '<a class="fas fa-dice enchiridion-asset-activate" data-activation="1" title = "Roll on Table"></a><a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
							break;
							case 'Playlist':
								assetButtons += '<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a><a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
							break;
							case 'Scene':
								assetButtons += '<a class="fas fa-map enchiridion-asset-activate" data-activation="1" title = "Activate Scene"></a><a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
							break;
							case 'application':
								assetButtons += '<a class="fas fa-file-pdf enchiridion-asset-activate" data-activation="1" title = "View PDF"></a><a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>';
							break;
							case 'Actor':
								assetButtons += '<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a><a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>';
							break;
							case 'Item':
								assetButtons += '<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a><a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>';
							break;
							case'JournalEntry':
								assetButtons += '<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a><a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'
							break;
							default: assetButtons += '<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>';
						}
		
						let specialClass = ''
						if (asset?.type == 'Scene' && game.scenes.active.id == asset.id) specialClass = 'scene-active'
						if (game.user.isGM) assetButtons += ` <a class="fas fa-eye-slash enchiridion-asset-activate" data-activation="3" title = "Hide From Players"></a><a class="fas fa-times enchiridion-asset-activate" data-activation="4" title = "Remove Association"></a>`;
						assets+=
						`<li class="enchiridion-asset enchiridion-drop private-${asset.permissions.default} ${specialClass}" data-drop-type="swap" title="${asset.name}" data-name="${asset.name}" data-type='${asset.type}' data-id='${asset.id}' data-img = "${asset.image}">
							<div class="crop asset-image">
								<img class="enchiridion-asset-activate cover enchiridion-drag" src="${asset.image}" height="100%" width="100%" data-activation="0"/>
							</div>
							<input type="text" class="enchiridion-asset-name" value="${asset.name}" ${game.user.isGM?"":"readonly"}>
							<div>                             
								${assetButtons}
								
							</div>
						</li>`;
		
						//Resernces
						if (asset?.uuid){
							const assetDocument = await fromUuid(asset.uuid);
							let type = assetDocument?.type || assetDocument?.documentName
							if (["Item","Actor","JournalEntry"].includes(assetDocument?.documentName)){
								if (assetDocument.documentName == 'Folder') type = "Folder";
								const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
								references += `<a class="enchiridion-open-reference" data-reference-uuid="${assetDocument.uuid}">${assetDocument.flags.enchiridion?.icon||defaultIcon} ${assetDocument.name} </a>`
							}
						}
		
					};
					
				if(document.flags?.enchiridion?.assets.some(el => el.uuid) || summaryUuids?.length) references += `</span>`;
			}

			//Notes
			let notes = "";
			let noteControls = "";
			if(game.user.isGM){
				noteControls =`<a class="fas fa-eye-slash enchiridion-hide-note" title = "Hide From Players"></a>
				<a class = "fas fa-times enchiridion-delete-note" title = "Delete"></a>`
			}
			document.flags?.enchiridion?.notes?.forEach(note =>{
				notes+=
				`<li class ="private-${note.permissions.default} enchiridion-note enchiridion-drop" data-drop-type="note">
						<div class="enchiridion-note-content">${note.content}</div>
						<h3>
							${noteControls}
						</h3>
				</li>`
			})

			//Owned Items
			let items = "";
			document.items?.forEach(item =>{
				items+=
				`<li class="enchiridion-owned-item enchiridion-drag">
					<img class="enchiridion-owned-item" src="${item.img}" data-item-id="${item.id}" data-uuid="${item.uuid}" height="30" width="30"/>
					<div>${item.name}</div>
				</li>`
			});
			
			if (document.items){
				items =
				`<div class="enchiridion-items">
				<h2>Owned Items</h2>
				<ol class="enchiridion-item-list">
					${items}
				</ol>
			</div>`
			}

			const active = (document.uuid === activeTab)?"active":"";

			let bodyEntry = 
			`<div class="tab add-listener ${active} enchiridion-document form-group enchiridion-drop" data-drop-type="asset" data-tab="${document.uuid}" data-uuid="${document.uuid}">		
				<div class="enchiridion-header">
					<div class = 'crop'>
						<img class="enchiridion-main-image cover enchiridion-drag enchiridion-drop" data-drop-type="mainImage" src="${document.img||"icons/svg/mystery-man.svg"}" title="${document.name}" height="100%" width="100%"/>
					</div>
					<div class = 'enchiridion-banner'>
						<h1 class="enchiridion-title">
							<div class="enchiridion-icon"><a>${icon}</a></div>
							<div class = 'enchiridion-open-document enchiridion-name enchiridion-drag'><a>${document.name}</a></div>
						</h1>

						<div class = 'enchiridion-references enchiridion-drop' data-drop-type="references">
							${references}
						</div>

					</div>

				</div>
				<hr>
				<div class="enchiridion-summary">
					<h2>Summary</h2>
					${summary}
				</div>

				<div class="enchiridion-assets">
					<h2>Assets</h2>
					<ul class="enchiridion-asset-list">
						${assets}
					</ul>
				</div>

				<div class="enchiridion-notes">
					<h2>Notes <a class="fas fa-message-plus enchiridion-new-note"></a></h2>
					<ul class = "enchiridion-note-list">
						${notes}
					</ul>
				</div>

				${items}

			</div>`;

			//Update the body if it already exists, otherwise create it
			const $currentBody = $body.find(`[data-uuid="${document.uuid}"]`);
			if($currentBody.length){
				$currentBody.replaceWith(bodyEntry)
			}else{
				$body.append(bodyEntry);
			};


			//Include additional Info?

			// if (document.documentName == 'Actor'){
			// 	const sheet = document.sheet
			// 	console.log(sheet)
			// 	const data = await sheet.getData()
			// 	const html = await renderTemplate(`systems/forgeoflegends/templates/actor/character-sheet.html`, data);
			// 	sheet.activateListeners($body.find(`[data-uuid="${document.uuid}"]`).append(html));
			// }

			// if (document.documentName == 'JournalEntry'){
			// 	const sheet = document.sheet
			// 	console.log(sheet)
			// 	const data = await sheet.getData()
			// 	const html = await renderTemplate(`templates/journal/sheet.html`, data);
			// 	sheet.activateListeners($body.find(`[data-uuid="${document.uuid}"]`).append(html));
			// }

			//Generate the tab
			const tabEntry = `
			<li class="add-listener enchiridion-tab ${active} enchiridion-document enchiridion-drag enchiridion-drop" data-drop-type="tab" title="${document.name}" data-tab="${document.uuid}" data-uuid="${document.uuid}">
					<a class ="enchiridion-close-tab"><i class="fas fa-times"></i></a>
					<h4><a class="tab-content enchiridion-drag enchiridion-drop" data-drop-type="tab"><span class = "icon">${icon}</span>${document.name}</a></h4>
			</li>`;

			//Update the tab if it already exists, otherwise create it
			const $tab = $tabs.find(`[data-uuid="${document.uuid}"]`);
			if($tab.length){
				$tab.replaceWith(tabEntry)
			}else{
				$tabs.append(tabEntry);
			};

			if(active != "")$tabs.find(`[data-uuid="${document.uuid}"] .tab-content`)[0].click()
		}
	}

	Enchiridion.listeners()
}













/* -------------------------------------------------------------------------- */
/*                               Listeners                                    */
/* -------------------------------------------------------------------------- */
Enchiridion.listeners = function(){
	const html = $('#enchiridion').find('.add-listener');
	html.find('.enchiridion-open-tab').on("dblclick", Enchiridion.openDocument);
	html.find('.enchiridion-open-tab').on("singleclick", Enchiridion.openTab);
	html.find('.enchiridion-open-reference').on("dblclick", Enchiridion.openReferenceDocument);
	html.find('.enchiridion-open-reference').on("singleclick", Enchiridion.openReferenceTab);
	html.find("a.entity-link").on("contextmenu", Enchiridion.openTab);
	html.find('.fa-plus').on("click", Enchiridion.createContents);
	html.find('.enchiridion-search-controls a').on("click", Enchiridion.toggleSearch);
	html.find('.enchiridion-search').on("input", Enchiridion.filter);
	html.find('.enchiridion-open-document').on("click", Enchiridion.openDocument);
	html.find('.enchiridion-main-image').on("dblclick", Enchiridion.openDocument);
	html.find('.enchiridion-main-image').on("singleclick", Enchiridion.clickImage);
	html.find('.enchiridion-main-image').on("contextmenu", Enchiridion.clickImage);
	html.find('.tab-content').on("singleclick", Enchiridion.selectTab);
	html.find('.tab-content').on("dblclick", Enchiridion.selectTab);
	html.find('.tab-content').on("dblclick", Enchiridion.openDocument);
	html.find('.tab-content').on("mousedown", Enchiridion.middleCloseTab);
	html.find('.enchiridion-expand a').on("click", Enchiridion.expand);
	html.find('.enchiridion-close-tab').on("click", Enchiridion.closeTab);
	html.find('.enchiridion-owned-item').on("click", Enchiridion.ownedItem);
	html.find('.enchiridion-asset-activate').on("click", Enchiridion.assetActivate);
	html.find('.enchiridion-asset-activate').on("contextmenu", Enchiridion.assetActivate);
	if (game.user.isGM){
		html.find('.enchiridion-note-content').on("input", Enchiridion.editNote);
		html.find('.enchiridion-icon').each(Enchiridion.emojiButton);
		html.find('.enchiridion-hide-note').on("click", Enchiridion.hideNote);
		html.find('.enchiridion-asset-name').on("input", Enchiridion.updateAssetName);
		html.find('.enchiridion-new-note').on("click", Enchiridion.newNote);
		html.find('.enchiridion-delete-note').on("click", Enchiridion.deleteNote);
		html.find(".enchiridion-ownership").on("click", Enchiridion.ownership);
	} else {
		html.find('.private-true').hide()
	};

	Enchiridion.contextmenu(html);

	html.find('.enchiridion-search-controls a').each(function(){
		let searchOptions = game.settings.get('enchiridion','searchOptions');
		const toggle = $(this).data('toggle');
		if(!searchOptions[toggle]) $(this).addClass('inactive');
	})

	let handler = ev => Enchiridion.onDragItemStart(ev);
	html.find('.enchiridion-drag').each((i, li) => {
		li.setAttribute("draggable", true);
		li.addEventListener("dragstart", handler, false);
	});

	game.ForgeOfLegends?.registerTooltips(html)
	
	//MCE
	if (game.user.isGM) tinymce.init(Enchiridion.mceOptions);
	$('body').find('[style*="position: static; height: 0px; width: 0px; padding: 0px; margin: 0px; border: 0px;"]').remove()

	$('#enchiridion').find('.add-listener').removeClass('add-listener');
}



Enchiridion.openTab = async function(ev){
	if (ev.shiftKey){
		$(ev.currentTarget).closest('.enchiridion-document').toggleClass('enchiridion-multiselect');
	} else{
		const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
		if (uuid.split('.')[0] == "Folder") return Enchiridion.expand(ev);
		game.settings.set('enchiridion', 'activeTab', uuid);
		let tabs = game.settings.get('enchiridion', 'userTabs');
		if (tabs.indexOf(uuid) == -1){
			tabs.push(uuid);
			game.settings.set('enchiridion', 'userTabs', tabs);
			const document = await fromUuid(uuid);
			Enchiridion.addToBody([document]);
		}else{
			$(`[data-uuid="${uuid}"] .tab-content`)[0].click()
		};
	}
};

Enchiridion.openDocument = async function (ev) {
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	console.log(document.visible)
	if (!document.visible) return;
	const sheet = document.sheet;
	if(ui.PDFoundry?.Utilities?.getPDFData(document)){
		const pdf = ui.PDFoundry.Utilities.getPDFData(document)
		ui.PDFoundry.openPDF(pdf)
	} else if ( sheet.rendered ) {
		sheet.maximize();
		sheet.bringToTop();
	} else sheet.render(true);
}

Enchiridion.openReferenceTab = async function(ev){
	const uuid = $(ev.currentTarget).data('referenceUuid');
	if (uuid.split('.')[0] == "Folder") return;
	game.settings.set('enchiridion', 'activeTab', uuid);
	let tabs = game.settings.get('enchiridion', 'userTabs');
	if (tabs.indexOf(uuid) == -1){
		tabs.push(uuid);
		game.settings.set('enchiridion', 'userTabs', tabs);
		const document = await fromUuid(uuid);
		Enchiridion.addToBody([document]);
	}else{
		$(`[data-uuid="${uuid}"] .tab-content`)[0].click()
	};
};

Enchiridion.openReferenceDocument = async function (ev) {
	const uuid = $(ev.currentTarget).data('referenceUuid');
	const document = await fromUuid(uuid);
	if (!document.visible) return;
	const sheet = document.sheet;
	if(ui.PDFoundry?.Utilities?.getPDFData(document)){
		const pdf = ui.PDFoundry.Utilities.getPDFData(document)
		ui.PDFoundry.openPDF(pdf)
	} else if ( sheet.rendered ) {
		sheet.maximize();
		sheet.bringToTop();
	} else sheet.render(true);
}

Enchiridion.selectTab = function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	game.settings.set('enchiridion', 'activeTab', uuid)
}

Enchiridion.closeTab = function  (ev) {
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	$(`#enchiridion .enchiridion-main [data-uuid="${uuid}"]`).remove()
	let tabs = game.settings.get('enchiridion', 'userTabs')
	tabs = $.grep(tabs, function(value) {
	  return value != uuid;
	});
	game.settings.set('enchiridion', 'userTabs', tabs);
	
	const active = game.settings.get('enchiridion', 'activeTab');
	if (active == uuid) $(`#enchiridion .tab-content`)[0].click();
}

Enchiridion.middleCloseTab = function  (ev) {
	if (ev.button === 1) Enchiridion.closeTab(ev);
}

Enchiridion.expand = async function (ev) {
	const $tree = $(ev.currentTarget).closest('.enchiridion-tree');
	const uuid = $tree.data('uuid')
	const document = await fromUuid(uuid)
	let expanded = game.settings.get('enchiridion', 'userExpanded');
	expanded.indexOf(uuid) != -1?expanded.splice(expanded.indexOf(uuid), 1):expanded.push(uuid);
	game.settings.set('enchiridion', 'userExpanded', expanded);
	Enchiridion.addToTree([document]);
}

Enchiridion.emojiButton = function (i,icon){
	EmojiButton(icon, async function (emoji) {
		const $document = $(icon).closest('.enchiridion-document');
		const uuid = $document.data('uuid');
		const document = await fromUuid(uuid);
		document.setFlag('enchiridion', 'icon', emoji);
	  });
}

Enchiridion.createContents = async function(ev){
	let uuid = null;
	let parentDescription ='';
	if (ev?.closest){
		uuid = ev.closest('.enchiridion-document').data('uuid');
		const parent = await fromUuid(uuid)
		parentDescription = `${parent.name} ➜ `;
	};

	let documentTypes = ['Journal Entry'].concat(game.system.documentTypes["Actor"]).concat(game.system.documentTypes["Item"]);
	const html = await renderTemplate(`modules/enchiridion/templates/enchiridion-create.html`, {documentTypes});
	Dialog.prompt({
		title: `${parentDescription}Create New Document`,
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
						parent: uuid,
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
};

Enchiridion.clickImage = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	if (!document?.img) return;
	let ip = new ImagePopout(document.img, {
		title: document.name,
		shareable: true,
		uuid: document.uuid
	}).render(true);
	if($(ev.currentTarget).data('activation') == 2 && game.user.isGM)	ip.shareImage();
}

Enchiridion.ownership = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	new PermissionControl(document).render(true);
}

Enchiridion.ownedItem = async function (ev){
	const itemUuid = $(ev.currentTarget).data('uuid');
	const item = await fromUuid(itemUuid);
	if (item?.sheet?.rendered) {
		item.sheet.maximize();
		item.sheet.bringToTop();
	} else item?.sheet?.render(true);
}

Enchiridion.editNote = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	const index =  $(ev.currentTarget).parents('.enchiridion-note').index();
	let notes = document.getFlag('enchiridion', 'notes')
	const text = this.innerHTML
	notes[index].content = TextEditor.enrichHTML(text)
	document.setFlag('enchiridion', 'notes', notes)
}

Enchiridion.newNote = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	let notes = document.getFlag('enchiridion', 'notes') || []
	const newNote = [
		{
			content:"",
			permissions:{}
		}
	];
	notes = [].concat(notes,newNote)
	await document.setFlag('enchiridion', 'notes', notes);
	Enchiridion.addToBody([document]);
};

Enchiridion.deleteNote = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	const index =  $(ev.currentTarget).parents('.enchiridion-note').index();
	let notes = document.getFlag('enchiridion', 'notes')
	notes.splice(index, 1);
	await document.setFlag('enchiridion', 'notes', notes)
	Enchiridion.addToBody([document]);
}

Enchiridion.hideNote = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	const index =  $(ev.currentTarget).parents('.enchiridion-note').index();
	let notes = document.getFlag('enchiridion', 'notes')
	notes[index].permissions={default:!notes[index].permissions.default}
	await document.setFlag('enchiridion', 'notes', notes)
	Enchiridion.addToBody([document]);
}

Enchiridion.updateAssetName = async function (ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	const index =  $(ev.currentTarget).parents('.enchiridion-asset').index();
	const text = $(this).val();
	let assets = document.getFlag('enchiridion', 'assets');
	assets[index].name = text;
	document.setFlag('enchiridion', 'assets', assets);
}

Enchiridion.toggleSearch = function (ev) {
	const toggle = $(ev.currentTarget).data('toggle');
	let searchOptions = game.settings.get('enchiridion','searchOptions');
	searchOptions[toggle] = !searchOptions[toggle];
	game.settings.set('enchiridion','searchOptions', searchOptions);
	$(ev.currentTarget).toggleClass('inactive');
	$(`.enchiridion-not-found`).removeClass('enchiridion-not-found');
	$(`.enchiridion-found`).removeClass('enchiridion-found');
	Enchiridion.filter();
}

Enchiridion.sort = function (documents){
	const $nav = $(`.enchiridion-nav`)
	documents.forEach(document => {
		const $tree = $nav.find(`.enchiridion-tree[data-uuid="${document?.uuid}"]`);
		const $parent = $tree.parent();
		const siblings = $parent.children().toArray();
		siblings.sort(function(a, b){
            var aVal = parseInt($(a).data('sort')),
                bVal = parseInt($(b).data('sort'));
            return aVal - bVal;
        });
		if ($parent.length && siblings.length) $parent.html($(siblings).addClass('add-listener'));
		// Enchiridion.listeners()
	});
}

Enchiridion.filter = function (){
	var searchStr = $('.enchiridion-search').val().toLowerCase();
	const searchOptions = game.settings.get('enchiridion','searchOptions');

	const actors = game.actors;
	const items = game.items;
	const journal = game.journal;
	const folders = game.folders.filter((folder) => ["Actor","JournalEntry","Item"].includes(folder.data.type));
	let documents = [...journal, ...actors, ...items, ...folders];

	if (searchStr == ''){
		$(`.enchiridion-not-found`).removeClass('enchiridion-not-found');
		return $(`.enchiridion-found`).removeClass('enchiridion-found');
	}

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
			if (asset?.name?.toLowerCase().includes(searchStr)) r = true
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
			$(`.enchiridion-nav [data-uuid="${uuid}"]`).addClass('enchiridion-not-found').removeClass('enchiridion-found');
		}



	}
	for ( let [k, v] of Object.entries(documents) ) {
		const name = v.name.toLowerCase()
		const uuid = v.uuid
		const notes = v?.data?.flags?.enchiridion?.notes
		const assets = v?.data?.flags?.enchiridion?.assets

		if (name.includes(searchStr) || filterNotes(notes, searchStr) || filterAssets(assets, searchStr) || filterItems(v?.data, searchStr)){
			$(`.enchiridion-nav [data-uuid="${uuid}"]`).addClass('enchiridion-found').removeClass('enchiridion-not-found');
			$(`.enchiridion-nav [data-uuid="${uuid}"]`).parentsUntil( ".enchiridion-nav" ).removeClass('enchiridion-not-found').addClass('enchiridion-found');
		}
	}

}

Enchiridion.contextmenu = function (html){
	const contextItems = [
		{
			name: "Create Contents",
			icon: '<i class="fas fa-plus"></i>',
			condition: game.user.isGM,
			callback: li => {
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
				Enchiridion.createContents(li);
			}
		},
		{
			name: "Remove from Container",
			icon: '<i class="fas fa-unlink"></i>',
			condition: li => game.user.isGM && li.parent().parent().hasClass('enchiridion-children'),
			callback: async li => {
				const uuid = li.closest('.enchiridion-document').data('uuid')
				const multiUuid = $('.enchiridion-multiselect')?.closest('.enchiridion-document')?.map(function(){
					return $(this).data('uuid');
				}).get();
				if (multiUuid.indexOf(uuid) == -1) multiUuid.push(uuid);
				multiUuid.forEach(async function (uuid) {
					const document = await fromUuid(uuid);
					await document.update({
							flags: {
								enchiridion: {
									parent: null
								}
							},
							folder: null
						},
						{
							otherUuids: [document.flags?.enchiridion?.parent]
						}
					)
				});
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
			}
		},
		{
			name: "View Image",
			icon: '<i class="fas fa-image"></i>',
			condition: li => !li.parent().is('[data-uuid*="Folder"]'),
			callback: async li => {
				const uuid = li.closest('.enchiridion-document').data('uuid');
				const multiUuid = $('.enchiridion-multiselect')?.closest('.enchiridion-document')?.map(function(){
					return $(this).data('uuid');
				}).get();
				if (multiUuid.indexOf(uuid) == -1) multiUuid.push(uuid);
				multiUuid.forEach(async function (uuid) {
					const document = await fromUuid(uuid);
					new ImagePopout(document.img, {
						title: document.name,
						shareable: true,
						uuid: document.uuid
					}).render(true);
				});
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
			}
		},
		{
			name: "SIDEBAR.Delete",
			icon: '<i class="fas fa-trash"></i>',
			condition: () => game.user.isGM,
			callback: async li => {
				const uuid = li.closest('.enchiridion-document').data('uuid');
				const multiUuid = $('.enchiridion-multiselect')?.closest('.enchiridion-document')?.map(function(){
					return $(this).data('uuid');
				}).get();
				if (multiUuid.indexOf(uuid) == -1) multiUuid.push(uuid);
				multiUuid.forEach(async function (uuid) {
					const document = await fromUuid(uuid);
					const childrenUuids = $(`.enchiridion-tree[data-uuid="${document.uuid}"]`).children('.enchiridion-children').children().map(function(){
						return $(this).data('uuid');
					}).get()
				
					for (let i = 0; i < childrenUuids.length; i++) {
						const child = await fromUuid(childrenUuids[i]);
						await child.update({
							flags: {
								enchiridion: {
									parent: null
								}
							},
							folder: null
						})
					}
					return document.delete();
					// // return document.deleteDialog();
					// const type = game.i18n.localize(document.constructor.metadata.label);
					// enchidiriondelete =function(document){
					// 	console.log(document, this)
					// 	this.delete.bind(document)
					// }
					// return Dialog.confirm({
					// 	title: `${game.i18n.format("DOCUMENT.Delete", {type})}: ${document.name}`,
					// 	content: `<h4>${game.i18n.localize("AreYouSure")}</h4><p>${game.i18n.format("SIDEBAR.DeleteWarning", {type})}</p>`,
					// 	yes: enchidiriondelete(document)
					//   });
				});
			}
		},
		// {
		// 	name: "PERMISSION.Configure",
		// 	icon: '<i class="fas fa-lock"></i>',
		// 	condition: li => game.user.isGM && !li.parent().is('[data-uuid*="Folder"]'),
		// 	callback: async li => {
		// 		const uuid = li.closest('.enchiridion-document').data('uuid')
		// 		const document = await fromUuid(uuid);
		// 		new PermissionControl(document).render(true);
		// 	}
		// },
		// {
		// 	name: "Confiture Content Permissions",
		// 	icon: '<i class="fas fa-lock"></i>',
		// 	condition: li => game.user.isGM && li.parent().is('[data-uuid*="Folder"]'),
		// 	callback: async li => {
		// 		const uuid = li.closest('.enchiridion-document').data('uuid')
		// 		const document = await fromUuid(uuid);
		// 		new PermissionControl(document).render(true);
		// 	}
		// },
		// {
		// 	name: "Delete all Contents",
		// 	icon: '<i class="fas fa-dumpster"></i>',
		// 	condition: li => game.user.isGM && li.parent().is('[data-uuid*="Folder"]'),
		// 	callback: async li => {
		// 		const uuid = li.closest('.enchiridion-document').data('uuid')
		// 		const document = await fromUuid(uuid);
		// 		return Dialog.confirm({
		// 			title: `${game.i18n.localize("FOLDER.Delete")} ${document.name}`,
		// 			content: `<h4>${game.i18n.localize("AreYouSure")}</h4><p>${game.i18n.localize("FOLDER.DeleteWarning")}</p>`,
		// 			yes: () => {
		// 				console.log(li.closest('.enchiridion-document .enchiridion-children'))
		// 				//document.delete({deleteSubfolders: true, deleteContents: true})
		// 			}
		// 		});
		// 	}
		// },
		{
			name: "Select all Contents",
			icon: '<i class="fas fa-file-check"></i>',
			condition: li => game.user.isGM && li.siblings('.enchiridion-children').children().length,
			callback: async li => {
				li.closest('.enchiridion-document').children(".enchiridion-children").children().addClass('enchiridion-multiselect');
			}
		},

				{
			name: "SIDEBAR.Duplicate",
			icon: '<i class="far fa-copy"></i>',
			condition: li => game.user.isGM && !li.parent().is('[data-uuid*="Folder"]'),
			callback: async li => {
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
				const uuid = li.closest('.enchiridion-document').data('uuid')
				const document = await fromUuid(uuid);
				return document.clone({name: `${document?.name} (Copy)`}, {save: true});
			}
		},
		{
			name: "SIDEBAR.Export",
			icon: '<i class="fas fa-file-export"></i>',
			condition: li => game.user.isGM && !li.parent().is('[data-uuid*="Folder"]'),
			callback: async li => {
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
				const uuid = li.closest('.enchiridion-document').data('uuid')
				const document = await fromUuid(uuid);
				return document.exportToJSON();
			}
		},
		{
			name: "SIDEBAR.Import",
			icon: '<i class="fas fa-file-import"></i>',
			condition: li => game.user.isGM && !li.parent().is('[data-uuid*="Folder"]'),
			callback: async li => {
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
				const uuid = li.closest('.enchiridion-document').data('uuid')
				const document = await fromUuid(uuid);
				return document?.importFromJSONDialog();
			}
		},
		// {
		// 	name: "FOLDER.Export",
		// 	icon: `<i class="fas fa-atlas"></i>`,
		// 	condition: li => game.user.isGM && li.parent().is('[data-uuid*="Folder"]'),
		// 	callback: async li => {
		// 		const uuid = li.closest('.enchiridion-document').data('uuid')
		// 		const document = await fromUuid(uuid);
		// 		return document.exportDialog(null, {
		// 			top: Math.min(li[0].offsetTop, window.innerHeight - 350),
		// 			left: window.innerWidth - 720,
		// 			width: 400
		// 		});
		// 	}
		// },
		{
			name: "FOLDER.CreateTable",
			icon: `<i class="fas fa-th-list"></i>`,
			condition: li => game.user.isGM && li.parent().is('[data-uuid*="Folder"]'),
			callback: async li => {
				$('.enchiridion-multiselect').removeClass('enchiridion-multiselect');
				const uuid = li.closest('.enchiridion-document').data('uuid')
				const document = await fromUuid(uuid);
				return Dialog.confirm({
					title: `${game.i18n.localize("FOLDER.CreateTable")}: ${document.name}`,
					content: game.i18n.localize("FOLDER.CreateTableConfirm"),
					yes: async () => {
						const uuids = li.closest('.enchiridion-document').children(".enchiridion-children").children().map(function(){
							return $(this).data('uuid');
						}).get()
						let contents =[]
						await uuids.forEach(async function (uuid){
							const c= await fromUuid(uuid)
							contents.push(c)
						});
						const results = contents.map((e, i) => {
							return {
							  text: e.name,
							  type: CONST.TABLE_RESULT_TYPES.DOCUMENT,
							  collection: e.documentName,
							  resultId: e.id,
							  img: e.thumbnail || e.img,
							  weight: 1,
							  range: [i+1, i+1],
							  drawn: false
							};
						  });
						  const table = await RollTable.create({
							name: document.name,
							description: `A random table created from the contents of the ${document.name} Folder.`,
							results: results,
							formula: `1d${results.length}`
						  });
						  return table.sheet.render(true)
					},
					options: {
						top: Math.min(li.offsetTop, window.innerHeight - 350),
						left: window.innerWidth - 680,
						width: 360
					}
				});
			}
		}
	];

	new ContextMenu(html.filter('.enchiridion-tree, .enchiridion-tab').find('h4'), null, contextItems);
};

Enchiridion.mceOptions = {
	selector: '.enchiridion-note-content',
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
}













/* -------------------------------------------------------------------------- */
/*                                Drag and Drop                               */
/* -------------------------------------------------------------------------- */

Enchiridion.onDragItemStart = async function (ev){
	if (!game.user.isGM) return;
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	const assetIndex =  $(ev.currentTarget).parents('.enchiridion-asset').index();

	const assets = document?.getFlag('enchiridion', 'assets') || [];
	const asset = assets[assetIndex];

	const src = $(ev.srcElement).attr('src');
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
};

Enchiridion.onDrop = async function(ev){
	if (!game.user.isGM) return;

	const uuid = $(ev.srcElement).closest('.enchiridion-document').data('uuid') || $(ev.srcElement).find('.enchiridion-document.active').data('uuid');
	const document = await fromUuid(uuid);
	let assets = document.getFlag('enchiridion', 'assets') || [];

	const dropType = $(ev.srcElement).closest('.enchiridion-drop').data('dropType');

	const files = ev.dataTransfer.files;
	let dataTransfer;
	try {dataTransfer = JSON.parse(ev.dataTransfer.getData('text/plain'));}
	catch (err) {};
	
	const sourceAsset = dataTransfer?.asset;

	
	
/* Drop from External File*/

	if(files.length && !sourceAsset){
		Object.values(files).forEach(async function(file){
			const fileType = file.type.split('/')[0]
			const extention = file.type.split('/')[1]
			if (!fileType || (fileType == 'application' && extention != 'pdf')) return ui.notifications.warn("That file type is not supported.")
			if (dropType) await FilePicker.upload("data", `enchiridion-uploads/${fileType}s/${document.collectionName}`, file, {});

			const assetFile = `enchiridion-uploads/${fileType}s/${document.collectionName}/${file.name}`
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
				await document.setFlag('enchiridion', 'assets', assets);
				return Enchiridion.addToBody([document]);
			}
		})
	} else

/* Drop from Anywhere in Foundry*/

	if(dataTransfer){

		// const asset = $(ev.srcElement).closest('.enchiridion-asset').index();
		const destinationIndex = $(ev.srcElement).closest('.enchiridion-asset').index();
		const sourceIndex = dataTransfer.assetIndex;
	
		const sourceUuid = dataTransfer.uuid || (dataTransfer.pack?"Compendium."+dataTransfer.pack:dataTransfer.type) +"."+ dataTransfer.id;

		const multiUuid = $('.enchiridion-multiselect')?.closest('.enchiridion-document')?.map(function(){
			return $(this).data('uuid');
		}).get();
		if (multiUuid.indexOf(sourceUuid) == -1) multiUuid.push(sourceUuid);

		multiUuid.forEach(async function(sourceUuid){
			let sourceDocument = await fromUuid(sourceUuid);

			let sourceParentUuid = sourceDocument.flags?.enchiridion?.parent
			let sourceParent
			if (sourceParentUuid) sourceParent = await fromUuid(sourceParentUuid);
		
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

			if(sourceDocument){
				switch(dropType){
					default:
						if(!assets.find(asset => asset?.id==sourceAsset?.id)){
							assets = [].concat(assets,[sourceAsset || newAsset])
							await document.setFlag('enchiridion', 'assets', assets)
							return Enchiridion.addToBody([document]);
						}
					break;
					case "swap":
						if (!(sourceIndex+1) || !(destinationIndex+1)) {
							assets = [].concat(assets,[sourceAsset || newAsset]);
							await document.setFlag('enchiridion', 'assets', assets);
							return Enchiridion.addToBody([document]);
						} else {
							assets[sourceIndex] = [assets[destinationIndex],assets[destinationIndex]=assets[sourceIndex]][0];
							await document.setFlag('enchiridion', 'assets', assets);
							return Enchiridion.addToBody([document]);
						};
					break;
					case "mainImage":
						const newImage = {
							id: document.data._id,
							name: document.data.name + " Previous Image",
							image: document.data.img,
							type: 'image',
							permissions:{}
						}
						assets = [].concat(assets,[newImage])
						document.update({[`img`]: sourceAsset.image});
						await document.setFlag('enchiridion', 'assets', assets);
						return Enchiridion.addToBody([document]);
					break;
					case "note":
						let notes = document.getFlag('enchiridion', 'notes')
						const index = $(ev.srcElement).closest('.enchiridion-note').index();
						if (sourceAsset){
							var fig = `<figure class="image">
							<img src="${sourceAsset.image}" alt="" width: 100px; />
							<figcaption>${sourceAsset.name}</figcaption>
							</figure>`
							notes[index].content += fig
							await document.setFlag('enchiridion', 'notes', notes);
							return Enchiridion.addToBody([document]);
						} else if (sourceDocument){
								var fig = `${sourceDocument.name}`
								notes[index].content += fig
								await document.setFlag('enchiridion', 'notes', notes);
								return Enchiridion.addToBody([document]);
						}
					break;
					case "tab":
						let tabs = game.settings.get('enchiridion', 'userTabs');
						if (!(tabs.indexOf(dataTransfer.uuid)+1) || !(tabs.indexOf(uuid)+1)){
							if(!assets.find(asset => asset.id==newAsset.id)){
								assets = [].concat(assets,[newAsset])
								await document.setFlag('enchiridion', 'assets', assets)
							}
						} else{
							tabs[tabs.indexOf(dataTransfer.uuid)] = [tabs[tabs.indexOf(uuid)],tabs[tabs.indexOf(uuid)]=tabs[tabs.indexOf(dataTransfer.uuid)]][0]
							game.settings.set('enchiridion', 'userTabs', tabs);
							jQuery.fn.swapWith = function(to) {
								return this.each(function() {
									var copy_to = $(to).clone(true);
									var copy_from = $(this).clone(true);
									$(to).replaceWith(copy_from);
									$(this).replaceWith(copy_to);
								});
							};
							$(`.enchiridion-tab[data-uuid="${document.uuid}"]`).swapWith($(`.enchiridion-tab[data-uuid="${sourceDocument.uuid}"]`));
						};

						return Enchiridion.addToBody([document, sourceDocument]);
					break;
					case 'tree':
						async function checkLoops(targetDocument){
							let parentUuids = [];
							async function pushParent(child){
								parentUuids.push(child?.uuid);
								let parentUuid = child?.flags?.enchiridion?.parent;
								if (parentUuid){
									const parent = await fromUuid(parentUuid);
									
									await pushParent(parent);
								};
							};

							await pushParent(targetDocument);

							if(parentUuids.includes(sourceUuid)){
								ui.notifications.warn("That arrangement would create a loop! Please choose a different arrangement.")
								return true
							};
						};
						if (await checkLoops(document)) return;
							
						if(ev.ctrlKey){
							
							const parentUuid = document.flags?.enchiridion?.parent;
							if (parentUuid) {
								const parent = await fromUuid(parentUuid);
								if (checkLoops(parent)) return;
	
								let expanded = game.settings.get('enchiridion', 'userExpanded');
								expanded.indexOf(parentUuid) === -1 ? expanded.push(parentUuid) : 1;
								await sourceDocument.setFlag('enchiridion', 'parent', parentUuid);
								if (parentUuid.split('.')[0]=="Folder") await sourceDocument.update({parent: parentUuid.split('.')[1]});
								await game.settings.set('enchiridion', 'userExpanded', expanded)
							} else {
								await sourceDocument.setFlag('enchiridion', 'parent', null);
							}
	
							let h = $(ev.srcElement).innerHeight();
							let o = $(ev.srcElement).offset(); 
							let y = ev.pageY - o.top;
							let sortBefore = false
							if(h/2 > y) sortBefore = true;
	
							const actors = game.actors;
							const items = game.items;
							const journal = game.journal;
							const folders = game.folders.filter((folder) => ["Actor","JournalEntry","Item"].includes(folder.data.type));
							let documents = [...journal, ...actors, ...items, ...folders];
	
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
							// return Enchiridion.addToTree([document,sourceDocument,sourceParent].filter(x => x !== undefined));
						} else {
							let expanded = game.settings.get('enchiridion', 'userExpanded')
							expanded.indexOf(uuid) === -1 ? expanded.push(uuid) : 1;
							game.settings.set('enchiridion', 'userExpanded', expanded);
							// await sourceDocument.setFlag('enchiridion', 'parent', uuid)
							let updates = {
								flags: {
									enchiridion: {
										parent: uuid
									}
								},
							}
							if (uuid.split('.')[0]=="Folder"){
								updates.folder = uuid.split('.')[1],
								updates.parent = uuid.split('.')[1]
							}
							sourceDocument.update(updates, {otherUuids: [document?.uuid,sourceParent?.uuid]});
						}
					break;
				}
			}
		})
	}

};











/* -------------------------------------------------------------------------- */
/*                               Activate Assets                              */
/* -------------------------------------------------------------------------- */
Enchiridion.assetActivate = async function(ev){
	const uuid = $(ev.currentTarget).closest('.enchiridion-document').data('uuid');
	const document = await fromUuid(uuid);
	const dataset = ev.currentTarget.dataset;
	let activation = dataset.activation;
	const $asset = $(ev.currentTarget).closest('.enchiridion-asset')
	const index =  $asset.index();
	let assets = document.getFlag('enchiridion', 'assets');

	if (activation == 4 && game.user.isGM){
		const asset = document.flags?.enchiridion?.assets[index]
		assets.splice(index, 1);
		document.setFlag('enchiridion', 'assets', assets)
		$asset.remove();
		let updates = [document]
		if (asset.uuid){
			const assetDocument = await fromUuid(asset.uuid);
			updates.push(assetDocument)
		}
		console.log(updates)
		return Enchiridion.addToBody(updates);
	};

	if (activation == 3 && game.user.isGM){
		assets[index].permissions={default:!assets[index].permissions.default}
		document.setFlag('enchiridion', 'assets', assets);
		return $asset.toggleClass('private-true');
	};

	const asset = document.flags?.enchiridion?.assets[index]
	if (!asset) return;
	const assetUuid = asset.uuid
	let assetDocument
	if (assetUuid) assetDocument = await fromUuid(assetUuid);
	const assetTitle = asset.name
	const extention = asset.id?.split('.')[1];
	const assetType = asset.type;
	let src, ip;


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
				title: assetTitle,
				shareable: true,
				uuid: document.uuid
			})
			ip.render(true);
			if(activation == 2 && game.user.isGM) ip.shareImage();
		break;
		case 'video':
			src = ev.currentTarget.src || $(ev.currentTarget).closest('.enchiridion-asset').find('img').attr('src');
			ip = new ImagePopout(src, {
				title: assetTitle,
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
				if (!assetDocument.visible) return;
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
				} else {
					assetDocument.playAll()
				}

			} else if (activation == 2){
				if (!assetDocument.visible) return;
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
				let tabs = game.settings.get('enchiridion', 'userTabs');
				tabs.push(assetUuid);
				game.settings.set('enchiridion', 'userTabs', tabs);
				game.settings.set('enchiridion', 'activeTab', assetUuid);
				Enchiridion.addToBody([assetDocument]);
			}
			else if(activation == 1 && ui.PDFoundry?.Utilities?.getPDFData(assetDocument)){
				const pdf = ui.PDFoundry.Utilities.getPDFData(assetDocument);
				ui.PDFoundry.openPDF(pdf);
			} else {
				if (!assetDocument.visible) return;
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
						let tabs = game.settings.get('enchiridion', 'userTabs');
						tabs.push(assetUuid);
						game.settings.set('enchiridion', 'userTabs', tabs);
						game.settings.set('enchiridion', 'activeTab', assetUuid);
						Enchiridion.addToBody([assetDocument]);
				} else {
					if (!assetDocument.visible) return;
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
						let tabs = game.settings.get('enchiridion', 'userTabs');
						tabs.push(assetUuid);
						game.settings.set('enchiridion', 'userTabs', tabs);
						game.settings.set('enchiridion', 'activeTab', assetUuid);
						Enchiridion.addToBody([assetDocument]);
				} else {
					if (!assetDocument.visible) return;
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
				if (!assetDocument.visible) return;
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
/*                                  Settings                                  */
/* -------------------------------------------------------------------------- */
Hooks.once("ready", async function() {

	game.settings.register("enchiridion", "activeTab", {
		name: "activeTab",
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

	const documentTypes = ['JournalEntry', 'Folder', 'Playlist', 'Scene'].concat(game.system.documentTypes["Actor"]).concat(game.system.documentTypes["Item"]);

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
		Playlist: '🎵',
		Scene: '🗺️',
		Deck: '🃏',
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
		await createFolderIfMissing("enchiridion-uploads");
		await createFolderIfMissing("enchiridion-uploads/images");
		await createFolderIfMissing("enchiridion-uploads/images/actors");
		await createFolderIfMissing("enchiridion-uploads/images/journal");
		await createFolderIfMissing("enchiridion-uploads/images/items");
		await createFolderIfMissing("enchiridion-uploads/audios");
		await createFolderIfMissing("enchiridion-uploads/audios/actors");
		await createFolderIfMissing("enchiridion-uploads/audios/journal");
		await createFolderIfMissing("enchiridion-uploads/audios/items");
		await createFolderIfMissing("enchiridion-uploads/videos");
		await createFolderIfMissing("enchiridion-uploads/videos/actors");
		await createFolderIfMissing("enchiridion-uploads/videos/journal");
		await createFolderIfMissing("enchiridion-uploads/videos/items");
		await createFolderIfMissing("enchiridion-uploads/applications");
		await createFolderIfMissing("enchiridion-uploads/applications/actors");
		await createFolderIfMissing("enchiridion-uploads/applications/journal");
		await createFolderIfMissing("enchiridion-uploads/applications/items");
	}
	

	// const navToggleButton = $('#nav-toggle');
	// navToggleButton.before(
	// 	`<button id='openEnchiridion' type="button" class="nav-item" title="Open Enchiridion"><i class="fas fa-book-medical"></i></button>`
	// );

	$('.main-controls').append(
		`<li class="scene-control openEnchiridion" title="Open Enchiridion"><i class="fas fa-book-medical" ></i></li>`
	);

	$('.openEnchiridion').on('click', () => Enchiridion.open())
	$('.openEnchiridion').on('contextmenu', () => Enchiridion.createContents())





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
Hooks.on("createItem", Enchiridion.updateDocument)
Hooks.on("updateItem", Enchiridion.updateDocument)
Hooks.on("deleteItem", Enchiridion.deleteDocument)
Hooks.on("createActor", Enchiridion.updateDocument)
Hooks.on("updateActor", Enchiridion.updateDocument)
Hooks.on("deleteActor", Enchiridion.deleteDocument)
Hooks.on("createJournalEntry", Enchiridion.updateDocument)
Hooks.on("updateJournalEntry", Enchiridion.updateDocument)
Hooks.on("deleteJournalEntry", Enchiridion.deleteDocument)
Hooks.on("deleteFolder", Enchiridion.deleteDocument)
Hooks.on("updateFolder", Enchiridion.updateDocument)
Hooks.on("createFolder", Enchiridion.updateDocument)
 
Hooks.on("renderActorSheet", function(document, html){
	html.find("a.entity-link").on("contextmenu", Enchiridion.openTab);
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

	// html.find('.tabs').append(`<a class="item" data-tab="${document.document.uuid}">Enchiridion</a>`)
	// html.find('.tabs .item').css('margin',0)
	// const enchiridion = await renderTemplate(`modules/enchiridion/templates/enchiridion-body.html`, document);
	// console.log(enchiridion, document)
	// html.find('.sheet-body').append(`<div id="enchiridion">${enchiridion}</div>`)
	
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































/* -------------------------------------------------------------------------- */
/*                                    Handlebars                              */
/* -------------------------------------------------------------------------- */

	// $.get( "modules/enchiridion/templates/enchiridion-body.html", function( data ) {
	// 	$( ".result" ).html( data );
	// 	Handlebars.registerPartial('enchiridionBody', data)
	//   });


	// Handlebars.registerHelper('isGM', function(options) {
	// 	if (game.user.isGM) {
	// 		return options.fn(this);
	// 	}
	// 	return options.inverse(this);
	// });

	// Handlebars.registerHelper('notGM', function(options) {
	// 	if (!game.user.isGM) {
	// 		return options.fn(this);
	// 	}
	// 	return options.inverse(this);
	// });

	// Handlebars.registerHelper('enchiridionEnrich', function(str) {
	// 	if (!str) return '';
	// 	return TextEditor.enrichHTML(str);
	// });

	// Handlebars.registerHelper('enchiridionDefaultIcon', function(document) {
	// 	let type = document?.data?.type || document?.documentName;
	// 	if (document?.documentName == 'Folder') type = "Folder";
	// 	type = type || "JournalEntry";
	// 	const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
	// 	return defaultIcon;
	// });

	// Handlebars.registerHelper('enchiridionExpanded', function(document) {
	// 	const expanded = game.settings.get('enchiridion', 'userExpanded');
	// 	if (expanded.includes(document.uuid)) return `<a class="fas fa-chevron-down"></a>`;
	// 	return `<a class="fas fa-chevron-right"></a>`;
	// });

	// Handlebars.registerHelper('enchiridionFilter', function() {
	// 	return 	game.settings.get('enchiridion','searchFilter')
	// });

	// Handlebars.registerHelper('filterDocument', function(document, options) {
	// 	const tabs = game.settings.get('enchiridion', 'userTabs');
	// 	if (tabs.includes(document.uuid) && document.documentName!="Folder") {
	// 		return options.fn(this);
	// 	}
	// 	return options.inverse(this);
	// });

	// Handlebars.registerHelper('filterEnchiridionDocuments', function(documents, options) {
	// 	const tabs = game.settings.get('enchiridion', 'userTabs');
	// 	return documents.filter(document => tabs.includes(document.uuid) && document.documentName!="Folder")
	// });

	// Handlebars.registerHelper('enchiridionActivationIcon', function(asset, num) {
	// 	let hide = '';
	// 	if (game.user.isGM) hide =` <a class="fas fa-eye-slash enchiridion-asset-activate" data-activation="3" title = "Hide From Players"></a> `;
	// 	switch(asset?.type){
	// 		case 'image':
	// 			return num==1?
	// 			'<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a>':
	// 			'<a class="fas fa-share enchiridion-asset-activate" data-activation="2" title = "Share"></a>'+hide;
	// 		case 'video':
	// 			return num==1?
	// 			'<a class="fas fa-image enchiridion-asset-activate" data-activation="1" title = "View"></a>':
	// 			'<a class="fas fa-share enchiridion-asset-activate" data-activation="2" title = "Share"></a>'+hide;
	// 		case 'audio':
	// 			return num==1?
	// 			'<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a>':
	// 			'<a class="fas fa-sync enchiridion-asset-activate" data-activation="2" title = "Loop"></a>'+hide;
	// 		case 'RollTable':
	// 			return num==1?
	// 			'<a class="fas fa-dice enchiridion-asset-activate" data-activation="1" title = "Roll on Table"></a>':
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
	// 		case 'Playlist':
	// 			return num==1?
	// 			'<a class="fas fa-play enchiridion-asset-activate" data-activation="1" title = "Play/Pause"></a>':
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
	// 		case 'Scene':
	// 			return num==1?
	// 			'<a class="fas fa-map enchiridion-asset-activate" data-activation="1" title = "Activate Scene"></a>':
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
	// 		case 'application':
	// 			return num==1?
	// 			'<a class="fas fa-file-pdf enchiridion-asset-activate" data-activation="1" title = "View PDF"></a>':
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="2" title = "Edit"></a>'+hide;
	// 		case 'Actor':
	// 			return num==1?
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':
	// 			'<a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'+hide;
	// 		case 'Item':
	// 			return num==1?
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':
	// 			'<a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'+hide;
	// 		case 'JournalEntry':
	// 			return num==1?
	// 			'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>':
	// 			'<a class="fas fa-book-medical enchiridion-asset-activate" data-activation="2" title = "Enchiridion"></a>'+hide;
	// 		default:
	// 			return num==1?'<a class="fas fa-cog enchiridion-asset-activate" data-activation="1" title = "Edit"></a>'+hide:'';
	// 	}
	// });

	// Handlebars.registerHelper('enchiridionTabs', function() {
	// 	const actors = game.actors;
	// 	const items = game.items;
	// 	const journal = game.journal;
	// 	let documents = [...journal, ...actors, ...items];
	// 	documents = documents.filter((document)=> document.visible);
	// 	const tabs = game.settings.get('enchiridion', 'userTabs')
	// 	//documents = documents.filter((document)=> tabs.includes(document.uuid));
	// 	documents = documents.sort(function(a, b) {
	// 		return tabs.indexOf(b.uuid) - tabs.indexOf(a.uuid);
	//   	});
	// 	let html ='';
	// 	documents.forEach(function(document){
	// 		let type = document?.data?.type || document.documentName
	// 		if (document.documentName == 'Folder') type = "Folder";
	// 		const defaultIcon =  game.settings.get('enchiridion', 'default-'+type);
	// 		if (tabs.includes(document.uuid)){
	// 			html = `
	// 			<li class="enchiridion-tab enchiridion-document  enchiridion-drag enchiridion-drop" data-drop-type="tab" title="${document.data.name}"  data-tab="${document.uuid}" data-uuid="${document.uuid}">
	// 					<a><i class="fas fa-times enchiridion-close-tab"></i></a><a class="tab-content" data-drop-type="tab"><span class = "icon">${document.data.flags?.enchiridion?.icon || defaultIcon}</span>${document.data.name}</a>
	// 			</li>
	// 			` +html
	// 		}
	// 	})
	// 	return html;
	// });


