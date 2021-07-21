//let bookmarkStatsData = {"2021-01-19T20:08:41.784Z":150,"2021-02-20T15:44:13.013Z":40,"2021-03-20T15:44:29.670Z":400,"2021-07-20T15:44:29.931Z":552};
let bookmarkStatsData = {};

function onBookmarksSearchFulfilled(bookmarks){
    console.log("counting");
    const ignoredScheme = /^(place|about|javascript|data)\:/i;
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
    console.log(bookmarkStatsData)
}

function refreshBookmarkStats(){
    console.log("refreshing stats");
    return browser.bookmarks.search({}).then(onBookmarksSearchFulfilled);
}

export { bookmarkStatsData, refreshBookmarkStats };