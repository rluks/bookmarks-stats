import { getForegroundID } from '/bg/foregroundinfo.js';
import {bookmarkStatsData as data} from '/bg/bookmarkdata.js';

function sendBookmarkStats(){
    let tabid = getForegroundID();
    if (typeof tabid !== "undefined") {
        browser.tabs.sendMessage(tabid, { type: "data", data });
    }
}

export { sendBookmarkStats };