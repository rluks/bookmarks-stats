//listener required
browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({url: "/index.html"});
});

async function noop(error, progress){
	progress(0);
}

function onMessage(message, sender, sendResponse) {
    if (message.type == "noop") {
    }
    return true;
}

browser.runtime.onMessage.addListener(onMessage);
