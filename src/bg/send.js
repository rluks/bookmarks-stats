import { getForegroundID } from '/bg/foregroundinfo.js';
import {bookmarkStatsData as data} from '/bg/bookmarkdata.js';

function sendBookmarkStats(){
    browser.tabs.sendMessage(getForegroundID(), { type: "data", data });
}

export { sendBookmarkStats };