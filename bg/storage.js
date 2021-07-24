import { addBookmarkStatsData } from '/bg/bookmarkdata.js';

function storeCount(timestamp, count) {
    return browser.storage.local.set({ [timestamp]: count });
}

function onStorageError(error) {
    console.log(error);
}

function onStorageItems(results) {
    var historyDataTmp = {};
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
        historyDataTmp[noteKey] = results[noteKey];
    }
    
    addBookmarkStatsData(historyDataTmp);
}

function loadHistory() {
    browser.storage.local.get(null).then(onStorageItems, onStorageError);
}

function onCleared(){
    console.log("Storage cleared");//TODO notification
}

function clearStorage() {
    var clearStorage = browser.storage.local.clear();
    clearStorage.then(onCleared, onStorageError);
}

export {storeCount, loadHistory, clearStorage}

