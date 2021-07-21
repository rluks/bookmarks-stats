import { registerForegroundID } from '/bg/foregroundinfo.js';
import { sendBookmarkStats } from '/bg/send.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';

function onMessage(message, sender, sendResponse) {
    if (message.type == "hello") {
        console.log("registering")
        registerForegroundID(sender.tab.id);

        console.log("sending what I got right away");
        //send what stats are available right away
        sendBookmarkStats();

        console.log("refreshing and then sending fresh");
        //but update the stats and then once ready send the new stats
        refreshBookmarkStats().then(sendBookmarkStats);
    }
}

browser.runtime.onMessage.addListener(onMessage);

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({ url: "/index.html" });
});
