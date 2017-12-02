//listener required
browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({url: "/index.html"});
});
