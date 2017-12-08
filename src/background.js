"use strict";

var DEBUG = true;

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
}

browser.runtime.onMessage.addListener(onMessage);

/* -------------------------------------------------------- */

/*                        COUNT                             */

/* -------------------------------------------------------- */

function countBookmarks(){
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
    countBookmarks();
}

function onBookmarkRemoved(id, removeInfo) {
    countBookmarks();
}

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

function generateInitialZeroCount(){
    let minuteOld = new Date();
    minuteOld.setSeconds(minuteOld.getSeconds() - 60);
    storeNote(minuteOld, 0);
}

generateFakeHistory();
countBookmarks();

browser.bookmarks.onCreated.addListener(_.debounce(onBookmarkCreated, bounceDelay, {'leading': true,
    'trailing': true}
));
browser.bookmarks.onRemoved.addListener(_.debounce(onBookmarkRemoved, bounceDelay, {'leading': true,
    'trailing': true}
));