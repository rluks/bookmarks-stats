import { sendBookmarkStats } from '/bg/send.js';
import { clearHistory } from '/bg/bookmarkdata.js';

function onMessage(message, sender, sendResponse) {
    if (message.type == "hello") {
        sendBookmarkStats();
    }else if (message.type == "clear-history"){
        clearHistory();
    }
}

export {onMessage};