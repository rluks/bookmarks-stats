import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);

let enableCall = true;
let queueDepth = 0;
let maxInterval = 5000;
let defaultInterval = 400;

function handleThrottleTimeout(){
  enableCall = true;

  if(queueDepth > 0){
    queueDepth = 0;
    onBookmarkChange();
  }
}

function throttle(callback, interval) {//milliseconds

  return function(...args) {
    if (!enableCall) {
      queueDepth++;
      interval = interval+queueDepth*10;
      if(interval > maxInterval){
        interval = maxInterval;
      }
      return;
    };

    enableCall = false;
    callback.apply(this, args);
    console.log(new Date().toISOString() + " " + interval);
    setTimeout(handleThrottleTimeout, interval);
  }
}

function onBookmarkChange() {
    refreshBookmarkStats();
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle(onBookmarkChange,defaultInterval));
    browser.bookmarks.onRemoved.addListener(throttle(onBookmarkChange,defaultInterval));
}

addBookmarkListeners()
refreshBookmarkStats();
