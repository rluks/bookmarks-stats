import { sendBookmarkStats } from '/bg/send.js';
import { refreshBookmarkStats } from '/bg/bookmarkdata.js';
import { onBrowserAction } from '/bg/browseraction.js';
import { handleRemoved } from '/bg/foregroundinfo.js';

function onMessage(message, sender, sendResponse) {
    if (message.type == "hello") {

        //send what stats are available right away
        sendBookmarkStats();

        //but update the stats and then once ready send the new stats
        refreshBookmarkStats().then(sendBookmarkStats);
    }
}

browser.runtime.onMessage.addListener(onMessage);
browser.browserAction.onClicked.addListener(onBrowserAction);
browser.tabs.onRemoved.addListener(handleRemoved);
