"use strict";

//listener required
browser.browserAction.onClicked.addListener(() => {
    //generateTestingData();
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

function onBookmarkCreated(id, bookmarkInfo) {
    count();
}

function onBookmarkRemoved(id, removeInfo) {
    count();
}

/* -------------------------------------------------------- */

/*                        Math                              */

/* -------------------------------------------------------- */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

var bookmarksCount = 0;
var DEBUG = true;

function generateTestingBookmark(number) {
    var createBookmark = browser.bookmarks.create({
        title: "bookmark" + number,
        url: "https://www.example.org"
    });
}

function generateTestingBookmarks() {
    if(!DEBUG)
        return;
    for (var i = 0; i < 3; i++) {
        generateTestingBookmark(i);
    }
}

function generateInitialZeroCount(){
    let minuteOld = new Date();
    minuteOld.setSeconds(minuteOld.getSeconds() - 60);
    storeNote(minuteOld, 0);
}

function generateFakeHistory(){
    if(!DEBUG)
        return;
    for(let i = 600; i > 0; i -= 30){
        let minuteOld = new Date();
        minuteOld.setSeconds(minuteOld.getSeconds() - i);
        storeNote(minuteOld, getRandomInt(0, 100));
    }
}

//generateTestingBookmarks();
//generateInitialZeroCount();

generateFakeHistory();
count();

browser.bookmarks.onCreated.addListener(onBookmarkCreated);
browser.bookmarks.onRemoved.addListener(onBookmarkRemoved);