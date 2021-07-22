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

  refreshBookmarkStats().then(()=>{
      interval = defaultInterval;
      queueDepth = 0;
      console.log("ready for more");
      
      enableCall = true;
  });
  
}

function throttle() {

    if (!enableCall) {
      queueDepth++;
      interval = 2*interval;
      if(interval > maxInterval){
        interval = maxInterval;
      }
      //console.log("throttle()" + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);
      return;
    }

    enableCall = false;
    //console.log("throttle()" + new Date().toISOString() + " " + interval + " queuedepth: " + queueDepth);

    refreshBookmarkStats().then(setTimeout(handleThrottleTimeout, interval));
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle);
    browser.bookmarks.onRemoved.addListener(throttle);
}

addBookmarkListeners()
refreshBookmarkStats();
