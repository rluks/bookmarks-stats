import { registerForegroundID } from '/bg/foregroundinfo.js';
import { sendBookmarkStats } from '/bg/send.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

function onMessage(message, sender, sendResponse) {
    if (message.type == "hello") {
        registerForegroundID(sender.tab.id);

        //send what stats are available right away
        sendBookmarkStats();

        //but update the stats and then once ready send the new stats
        refreshBookmarkStats().then(sendBookmarkStats);
    }
}

browser.runtime.onMessage.addListener(onMessage);

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({ url: "/index.html" });
});
