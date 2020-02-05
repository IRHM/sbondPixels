function onError(e){
  console.error(e);
}

var settings = {
  enabled: 1
}

async function sendMessageAll(msg){
	browser.tabs.query({}, function(tabs){
    for (var i=0; i < tabs.length; ++i){
			browser.tabs.sendMessage(tabs[i].id, msg);
    }
	});
}

async function setDefault(storedSettings){
  if(!storedSettings.settings){
    browser.storage.local.set({settings});
  }
	else{
		var enabled = storedSettings.settings.enabled;
	
		if(enabled){
			sendMessageAll({enabled: 1});
			console.log(storedSettings);
		}
		else{
			sendMessageAll({enabled: 0});
			console.log(storedSettings);
		}
		
		// 100ms timeout
		await new Promise(r => setTimeout(r, 100));
	}
}

const getStorage = browser.storage.local.get();
getStorage.then(setDefault, onError);