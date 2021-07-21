import { foregroundID } from '/bg/foregroundinfo.js';
import {bookmarkStatsData as data} from '/bg/bookmarkdata.js';

function sendBookmarkStats(){
    browser.tabs.sendMessage(foregroundID, { type: "data", data });
}

export { sendBookmarkStats };