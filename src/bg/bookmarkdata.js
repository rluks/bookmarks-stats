import { updateBadge } from '/bg/browseraction.js';
import { sendBookmarkStats, notifyRefreshing, notifyClearing } from '/bg/send.js';
import { storeCount, loadHistory, clearStorage } from '/bg/storage.js';

let bookmarkStatsData = {};

function onBookmarksSearchFulfilled(bookmarks){;
    const ignoredScheme = /^(place|javascript|data)\:/i;//TODO do I want to ignore these?
    let queue = [];
    for (const bookmark of bookmarks) {
        const url = bookmark.url;
        if (!url || ignoredScheme.test(url)) {
            continue;
        }
        queue.push([url, bookmark]);
    }
    
    var bookmarksCount = queue.length;
    var dateNow = new Date().toISOString();
    bookmarkStatsData[dateNow] = bookmarksCount;
    updateBadge(bookmarksCount);
    sendBookmarkStats();
    storeCount(dateNow, bookmarksCount);
}

function refreshBookmarkStats(){
    notifyRefreshing();
    return browser.bookmarks.search({}).then(onBookmarksSearchFulfilled);
}

function loadHistoryStats(){
    loadHistory();
}

function addBookmarkStatsData(obj){

    /*console.log("Current stats: ");
    console.log(bookmarkStatsData);

    console.log("History from storage: ");
    console.log(obj);*/
     
    bookmarkStatsData = Object.assign(obj, bookmarkStatsData); //TODO if this is unrealiable I can add sorting...
}

function clearHistory(){
    notifyClearing();
    bookmarkStatsData = {};
    clearStorage();
}

export { 
    bookmarkStatsData, 
    refreshBookmarkStats, 
    loadHistoryStats, 
    addBookmarkStatsData,
    clearHistory
};