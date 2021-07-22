import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);

function onBookmarkChange() {
    refreshBookmarkStats();
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(onBookmarkChange);
    browser.bookmarks.onRemoved.addListener(onBookmarkChange);
}

/*

/As of 2021 07 - not yet supported in FF, see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/bookmarks/onImportBegan

function onImportStart(){
    browser.bookmarks.onCreated.removeListener(onBookmarkChange);
    browser.bookmarks.onRemoved.removeListener(onBookmarkChange);
}

function onImportEnd(){
    addBookmarkListeners();
    refreshBookmarkStats();
}

/
//browser.bookmarks.onImportBegan.addListener(onImportStart); 
//browser.bookmarks.onImportEnded.addListener(onImportEnd);

*/

addBookmarkListeners()

refreshBookmarkStats();
