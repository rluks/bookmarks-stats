/*function handleAlive({found}) {
    document.querySelector("#live").textContent = found;
}*/

/*function onMessage(message) {
	handleAlive(message);
}*/

//browser.runtime.onMessage.addListener(onMessage);
//browser.runtime.sendMessage({type: "find_dead"});

function test(){
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

test();

