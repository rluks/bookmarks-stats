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


/*function handleThrottleTimeout(){
  enableCall = true;

  if(interval > defaultInterval){
    queueDepth = 0;
    interval = interval/2;
    if(interval < defaultInterval){
      interval = defaultInterval;
    }

    refreshBookmarkStats();//TODO no chaining,  

    if(interval > defaultInterval){
      setTimeout(handleThrottleTimeout, interval);//TODO remove calling itself
    }
  }
}*/

function handleThrottleTimeout(){
  enableCall = true;

  if(interval > defaultInterval){
    queueDepth = 0;
    interval = interval/2;
    if(interval < defaultInterval){
      interval = defaultInterval;
    }

    refreshBookmarkStats().then(interval = defaultInterval);
  }
}

function throttle() {

    if (!enableCall) {
      //console.log(new Date() + " throttle()");
      queueDepth++;
      interval = 2*interval;
      if(interval > maxInterval){
        interval = maxInterval;
      }
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
