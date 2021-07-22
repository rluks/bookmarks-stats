import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);

let enableCall = true;
let queueDepth = 0;
const maxInterval = 50000;
const defaultInterval = 400;
let interval = defaultInterval;

function handleThrottleTimeout(){
  enableCall = true;

  console.log("handleThrottleTimeout() s " + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);

  if(interval > defaultInterval){
    queueDepth = 0;
    interval = interval/2;
    if(interval < defaultInterval){
      interval = defaultInterval;
    }

    console.log("handleThrottleTimeout() q " + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);

    onBookmarkChange();

    if(interval > defaultInterval){
      setTimeout(handleThrottleTimeout, interval);
    }
  }
}

function throttle(callback) {//milliseconds

  return function(...args) {
    if (!enableCall) {
      queueDepth++;
      interval = 2*interval;
      if(interval > maxInterval){
        interval = maxInterval;
      }

      console.log("throttle() return " + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);

      return;
    };

    enableCall = false;
    console.log("throttle() go " + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);

    callback.apply(this, args);
    setTimeout(handleThrottleTimeout, interval);
  }
}

function onBookmarkChange() {
    refreshBookmarkStats();
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle(onBookmarkChange));
    browser.bookmarks.onRemoved.addListener(throttle(onBookmarkChange));
}

addBookmarkListeners()
refreshBookmarkStats();
