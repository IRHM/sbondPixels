function onError(e) {
  console.error(e);
}

async function storeState(state) {
  browser.storage.local.set({
    settings: {
      enabled: state
    }
  });
}

async function checkState(restoredSettings) {
  var settings = {
    enabled: 1
  };

  if (!restoredSettings.settings) {
    browser.storage.local.set({ settings });
  } else {
    var enabled = restoredSettings.settings.enabled;

    if (enabled) {
      await storeState(0);
    } else {
      await storeState(1);
    }
  }
}

browser.browserAction.onClicked.addListener((tab) => {
  const getStorage = browser.storage.local.get();
  getStorage.then(checkState, onError);
});
