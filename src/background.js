import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);

let enableCall = true;
let queueDepth = 0;
const maxInterval = 5000;
const defaultInterval = 400;
let interval = defaultInterval;//milliseconds


function handleThrottleTimeout(){
  enableCall = true;

  console.log("handleThrottleTimeout() s " + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);

  if(interval > defaultInterval){
    queueDepth = 0;
    interval = interval/2;
    if(interval < defaultInterval){
      interval = defaultInterval;
    }

    refreshBookmarkStats();

    if(interval > defaultInterval){
      setTimeout(handleThrottleTimeout, interval);
    }
  }
}

function throttle() {

    if (!enableCall) {
      queueDepth++;
      interval = 2*interval;
      if(interval > maxInterval){
        interval = maxInterval;
      }
      return;
    };

    enableCall = false;
    refreshBookmarkStats();
    setTimeout(handleThrottleTimeout, interval);
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle);
    browser.bookmarks.onRemoved.addListener(throttle);
}

addBookmarkListeners()
refreshBookmarkStats();
