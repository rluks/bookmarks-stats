
function onStorageError (error) {
  console.log(error);
}

function onCleared() {
    console.log("Storage cleared, OK.");
}

function storeNote(timestamp, body) {
    var storingNote = browser.storage.local.set({ [timestamp] : body });
    storingNote.then(() => {
    }, onStorageError);
}

function storeCount(){
    storeNote(new Date(), bookmarksCount);
}

function clearStorage(){
    var clearStorage = browser.storage.local.clear();
    clearStorage.then(onCleared, onStorageError);
}


function loadHistory () {
  var historyData = {};
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      historyData[noteKey] = results[noteKey];
    }
  }, onStorageError);
}
