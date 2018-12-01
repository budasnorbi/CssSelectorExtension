const contextMenuItem = {
	id: "getSelector",
	title:"Copy price and url",
	contexts: ["all"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener( clickData => {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, 'getSelector');
	});
});