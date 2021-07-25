import {getForegroundID } from '/bg/foregroundinfo.js';
import {bookmarkStatsData} from '/bg/bookmarkdata.js';

function sendBookmarkStats(){
    send("data", bookmarkStatsData);
}

function notifyRefreshing(){
    send("notification", "Refreshing");
}

function notifyClearing(){
    send("notification", "Removing");
}

function notifyCleared(){
    send("notification", "Stats removed. Add or remove bookmarks to generate new stats.");
}

function send(msgType, data){
    let tabid = getForegroundID();
    if (typeof tabid !== "undefined") {
        browser.tabs.sendMessage(tabid, { type: msgType, data: data});
    }
}

export { sendBookmarkStats, notifyRefreshing, notifyClearing, notifyCleared};