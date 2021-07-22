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
let queue = 0;
let maxQueue = 0;

function handleThrottleTimeout(){

  if(queue > maxQueue){
    console.log(new Date().toISOString() + " more requests came during timeout, waiting if there would be even more...");
    maxQueue = queue;
    setTimeout(handleThrottleTimeout, interval);
    return;
  }
  else if(queue > 0){
    console.log(new Date().toISOString() + " requests came during timeout, refreshing...");
    queue = 0;
    maxQueue = 0;
    refreshBookmarkStats().then(()=>{
      console.log(new Date().toISOString() + " done refreshing. Give me more.");
      enableCall = true;
    });

  }
  else{
    console.log(new Date().toISOString() + " all peaceful, listening for more.");
    enableCall = true;
  }
}

function throttle() {

    if (!enableCall) {
      queue++;
      return;
    }

    enableCall = false;

    console.log(new Date().toISOString() + " refreshing and setting timeout");
    refreshBookmarkStats().then(setTimeout(handleThrottleTimeout, interval));
}

function addBookmarkListeners() {
    browser.bookmarks.onCreated.addListener(throttle);
    browser.bookmarks.onRemoved.addListener(throttle);
}

addBookmarkListeners()
refreshBookmarkStats();
