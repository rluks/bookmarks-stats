browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({url: "/index.html"});
});

async function findDead(error, progress) {
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
		progress(queue.length);
    });
}

function onMessage(message, sender, sendResponse) {
    if (message.type == "find_dead") {
        findDead((bookmark, error) => {
            //browser.tabs.sendMessage(sender.tab.id, {type: "dead", bookmark, error});
        }, (found) => {
            browser.tabs.sendMessage(sender.tab.id, {type: "alive", found}); //msg to script.js
        });
    }

    return true;
}

browser.runtime.onMessage.addListener(onMessage);
