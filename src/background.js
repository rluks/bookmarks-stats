import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';
import { throttle } from '/bg/throttle.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle);
    browser.bookmarks.onRemoved.addListener(throttle);
}

//TODO load from storage
addBookmarkListeners()
refreshBookmarkStats();
//TODO save to storage