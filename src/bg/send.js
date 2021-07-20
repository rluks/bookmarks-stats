import { foregroundID } from '/bg/foregroundinfo.js';
import {bookmarkData as data} from '/bg/bookmarkdata.js';

function sendBookmarkData(){
    browser.tabs.sendMessage(foregroundID, { type: "data", data });
}

export { sendBookmarkData };