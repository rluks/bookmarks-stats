
/* generic error handler */
function onError(error) {
    console.log(error);
}

function storeNote(timestamp, body) {
    var storingNote = browser.storage.local.set({ [timestamp] : body });
    storingNote.then(() => {
        //displayNote(timestamp,body);
    }, onError);
}

/* clearing storage */
function onCleared() {
    console.log("Storage cleared, OK.");
}

function clearStorage(){
    var clearStorage = browser.storage.local.clear();
    clearStorage.then(onCleared, onError);
}

function storeCount(){
    storeNote(new Date(), bookmarksCount);
}