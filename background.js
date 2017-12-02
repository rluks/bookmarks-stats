"use strict";

//listener required
browser.browserAction.onClicked.addListener(() => {
    count();
    browser.tabs.create({url: "/index.html"});
});

/* -------------------------------------------------------- */

/*                        STORAGE                           */

/* -------------------------------------------------------- */

/* generic error handler */
function onError(error) {
  console.log(error);
}

/*function initializeStorage() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
}*/

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
/* -------------------------------------------------------- */

/*           COMMUNCIATION with CONTENT SCRIPT              */

/* -------------------------------------------------------- */
function onMessage(message, sender, sendResponse) {
    if (message.type == "clear_history") {
      clearStorage();
    }else if (message.type == "get_current_count") {
        browser.tabs.sendMessage(sender.tab.id, {type: "current_count", bookmarksCount});
    }
}

browser.runtime.onMessage.addListener(onMessage);

/* -------------------------------------------------------- */

/*                        COUNT                             */

/* -------------------------------------------------------- */

function count(){
  const ignoredScheme = /^(place|about|javascript|data)\:/i;

    browser.bookmarks.search({}).then(bookmarks => {
        let queue = [];
        for (const bookmark of bookmarks) {
            const url = bookmark.url;
            if (!url || ignoredScheme.test(url)) {
                continue;
            }

            queue.push([url, bookmark]);
        }
    bookmarksCount = queue.length;
    displayCountBadge();
    storeCount();
    });
}

function displayCountBadge(){
  browser.browserAction.setBadgeText({text: bookmarksCount.toString()});
}

function storeCount(){
  storeNote(new Date(), bookmarksCount);
}

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

var bookmarksCount = 0;
var intervalSeconds = 10;

count();
setInterval(count, intervalSeconds * 1000);
