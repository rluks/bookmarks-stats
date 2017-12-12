"use strict";

const DEBUG = true;

const bounceDelay = 250; //ms

var bookmarksCount = 0;

/* -------------------------------------------------------- */

/*                  Toolbar icon action                     */

/* -------------------------------------------------------- */
browser.browserAction.onClicked.addListener(() => {
    generateTestingBookmarks();

    _.debounce(countBookmarks, bounceDelay, {'leading': true,
        'trailing': true}
    );

    browser.tabs.create({url: "/index.html"});
});

/* -------------------------------------------------------- */

/*           COMMUNCIATION with CONTENT SCRIPT              */

/* -------------------------------------------------------- */
function onMessage(message, sender, sendResponse) {
    if (message.type == "clear_history") {
      clearStorage();
    }else if (message.type == "get_current_count") {
        browser.tabs.sendMessage(sender.tab.id, {type: "current_count", bookmarksCount});
    }
    else if (message.type == "download_history") {
        initializeStorage ();
        browser.tabs.sendMessage(sender.tab.id, {type: "history_data", bookmarksCountData});
    }
}

function displayCountBadge(){
  browser.browserAction.setBadgeText({text: bookmarksCount.toString()});
}

function onBookmarkCreated(id, bookmarkInfo) {
    countBookmarks();
}

function onBookmarkRemoved(id, removeInfo) {
    countBookmarks();
}

function generateInitialZeroCount(){
    let minuteOld = new Date();
    minuteOld.setSeconds(minuteOld.getSeconds() - 60);
    storeNote(minuteOld, 0);
}

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

browser.runtime.onMessage.addListener(onMessage);

generateFakeHistory();
countBookmarks();

browser.bookmarks.onCreated.addListener(_.debounce(onBookmarkCreated, bounceDelay, {'leading': true,
    'trailing': true}
));
browser.bookmarks.onRemoved.addListener(_.debounce(onBookmarkRemoved, bounceDelay, {'leading': true,
    'trailing': true}
));
