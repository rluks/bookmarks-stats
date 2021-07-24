import { sendBookmarkStats } from '/bg/send.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

function onMessage(message, sender, sendResponse) {
    if (message.type == "hello") {

        //send what stats are available right away
        sendBookmarkStats();

        //but update the stats and then once ready send the new stats
        refreshBookmarkStats().then(sendBookmarkStats);
    }else if (message.type == "clear-history"){
        clearHistory();
    }
}

export {onMessage};