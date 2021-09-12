import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

let enableCall = true;
const defaultInterval = 300;
let interval = defaultInterval;//milliseconds
let queue = 0;
let maxQueue = 0;

function handleThrottleTimeout(){

  if(queue > maxQueue){
    //more requests came during timeout, waiting if there would be even more
    maxQueue = queue;
    setTimeout(handleThrottleTimeout, interval*0.66);
    return;
  }
  else if(queue > 0){
    //requests came during timeout, refreshing
    queue = 0;
    maxQueue = 0;
    refreshBookmarkStats().then(()=>{
      //done refreshing. Give me more
      enableCall = true;
    });

  }
  else{
    //no more requests, listening for more
    enableCall = true;
  }
}

function throttle() {

    if (!enableCall) {
      queue++;
      return;
    }

    enableCall = false;

    //refreshing and setting timeout
    refreshBookmarkStats().then(setTimeout(handleThrottleTimeout, interval));
}

export {throttle}