import { updateBadge } from '/bg/browseraction.js';
import { sendBookmarkStats } from '/bg/send.js';

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
    //TODO incrementally add stats to storage
}

function refreshBookmarkStats(){
    //TODO poslat zpravu frontendu ze refreshuje
    return browser.bookmarks.search({}).then(onBookmarksSearchFulfilled);
}

export { bookmarkStatsData, refreshBookmarkStats };