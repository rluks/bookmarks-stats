import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';
import { onMessage } from '/bg/receiver.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);

let enableCall = true;
const defaultInterval = 1000;
let interval = defaultInterval;//milliseconds

function handleThrottleTimeout(){

  refreshBookmarkStats().then(()=>{
      enableCall = true;
  });
  
}

function throttle() {

    if (!enableCall) {
      return;
    }

    enableCall = false;

    refreshBookmarkStats().then(setTimeout(handleThrottleTimeout, interval));
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle);
    browser.bookmarks.onRemoved.addListener(throttle);
}

addBookmarkListeners()
refreshBookmarkStats();
