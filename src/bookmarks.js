function countBookmarks() {
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
        
        displayCountBadge();
        storeCount();
    });
}
