function count(){
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
		//progress(queue.length);
		//console.log(queue.length);
		document.querySelector("#live").textContent = queue.length;
    });
}

count();

