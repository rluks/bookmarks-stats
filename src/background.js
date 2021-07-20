import { registerForegroundID } from '/bg/foregroundinfo.js';
import { sendBookmarkData } from '/bg/send.js';

function onMessage(message, sender, sendResponse) {
    if (message.type == "hello") {
        registerForegroundID(sender.tab.id);
        sendBookmarkData();
    }
}

browser.runtime.onMessage.addListener(onMessage);

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({ url: "/index.html" });
});
