browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({url: "/index.html"});
});


async function findDead(error, progress) {
    const ignoredScheme = /^(place|about|javascript|data)\:/i;

    let found = 0;
    function work(queue, error, progress) {

        if (queue.length == 0) {
            return;
        }

        const [url, bookmark] = queue.shift();
		
		found++;
        progress(bookmark.id, 0);

		/*if (!response.ok) {
			error(bookmark, response.status);
			return;
		}*/

        work(queue, error, progress);
    }

    browser.bookmarks.search({}).then(bookmarks => {
        let queue = [];
        for (const bookmark of bookmarks) {
            const url = bookmark.url;
            if (!url || ignoredScheme.test(url)) {
                continue;
            }

            queue.push([url, bookmark]);
        }
		progress(0, queue.length);
        //work(queue, error, progress);
    });
}

function onMessage(message, sender, sendResponse) {
    if (message.type == "find_dead") {
        findDead((bookmark, error) => {
            //browser.tabs.sendMessage(sender.tab.id, {type: "dead", bookmark, error});
        }, (id, found) => {
            browser.tabs.sendMessage(sender.tab.id, {type: "alive", id, found}); //msg to script.js
        });
    }

    return true;
}

browser.runtime.onMessage.addListener(onMessage);
