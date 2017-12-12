
function onStorageError (error) {
  console.log(error);
}

function storeNote(timestamp, body) {
    var storingNote = browser.storage.local.set({ [timestamp] : body });
    storingNote.then(() => {
    }, onStorageError);
}

/* clearing storage */
function onCleared() {
    console.log("Storage cleared, OK.");
}

function clearStorage(){
    var clearStorage = browser.storage.local.clear();
    clearStorage.then(onCleared, onStorageError);
}

function storeCount(){
    storeNote(new Date(), bookmarksCount);
}

var bookmarksCountData = {};

function initializeStorage () {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      //displayNote(noteKey, curValue);
      bookmarksCountData[noteKey] = curValue;
    }
  }, onStorageError);
}
