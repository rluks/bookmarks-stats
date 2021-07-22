import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);



function throttle(callback, interval) {//milliseconds
  let enableCall = true;

  return function(...args) {
    if (!enableCall) return;

    enableCall = false;
    callback.apply(this, args);
    setTimeout(() => enableCall = true, interval);
  }
}


function onBookmarkChange() {
    refreshBookmarkStats();
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle(onBookmarkChange,300));
    browser.bookmarks.onRemoved.addListener(throttle(onBookmarkChange,300));
}

addBookmarkListeners()

refreshBookmarkStats();
