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

browser.bookmarks.onCreated.addListener(onBookmarkChange);
browser.bookmarks.onRemoved.addListener(onBookmarkChange);

refreshBookmarkStats();
