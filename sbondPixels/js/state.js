function onError(e){
  console.error(e);
}

async function sendMessageAll(msg){
	browser.tabs.query({}, function(tabs){
    for (var i=0; i < tabs.length; ++i){
			browser.tabs.sendMessage(tabs[i].id, msg);
    }
	});
}

async function storeState(state){
  browser.storage.local.set({
    settings: {
      enabled: state
    }
  });
}

async function checkState(restoredSettings){
	var enabled = restoredSettings.settings.enabled;
	
	if(enabled){
		await storeState(0);
		sendMessageAll({enabled: 0});
	}
	else{
		await storeState(1);
		sendMessageAll({enabled: 1});
	}
	
	// 100ms timeout until window.close
	await new Promise(r => setTimeout(r, 100));
}

browser.browserAction.onClicked .addListener((tab) => {
	const getStorage = browser.storage.local.get();
	getStorage.then(checkState, onError);
});