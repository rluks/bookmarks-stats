import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved, handleUpdated } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats, loadHistoryStats } from '/bg/bookmarkdata.js';
import { throttle } from '/bg/throttle.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);
browser.tabs.onUpdated.addListener(handleUpdated);

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle);
    browser.bookmarks.onRemoved.addListener(throttle);
}

loadHistoryStats();
addBookmarkListeners()
refreshBookmarkStats();
