"use strict";

function onStorageError(error) {
    console.log(error);
}

function onCleared() {
    console.log("Storage cleared, OK.");
}

function storeNote(timestamp, body) {
    timestamp = timestamp.toISOString();
    console.log("Storing note...");
    console.log(timestamp + " : " + body);
    var storingNote = browser.storage.local.set({ [timestamp]: body });
    storingNote.then(() => {
    }, onStorageError);
}

function storeCount() {
    storeNote(new Date(), bookmarksCount);
}

function clearStorage() {
    var clearStorage = browser.storage.local.clear();
    clearStorage.then(onCleared, onStorageError);
}

function onStorageItems(results) {
    console.log("Loading history from storage...")
    var historyDataTmp = {};
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
        historyDataTmp[noteKey] = results[noteKey];
    }
    console.log("tmp history");
    console.log(historyDataTmp);
    historyData = historyDataTmp;
}

function loadHistory() {
    browser.storage.local.get(null).then(onStorageItems, onStorageError);
}
