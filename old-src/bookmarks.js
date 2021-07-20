"use strict";

function countBookmarks() {
    console.log("Counting bookmarks...");
    const ignoredScheme = /^(place|about|javascript|data)\:/i;
    browser.bookmarks.search({}).then(bookmarks => {
        let queue = [];
        for (const bookmark of bookmarks) {
            const url = bookmark.url;
            if (!url || ignoredScheme.test(url)) {
                continue;
            }
            queue.push([url, bookmark]);
        }
        
        bookmarksCount = queue.length;
        console.log(bookmarksCount);
        displayCountBadge();
        storeCount();
    });
}
