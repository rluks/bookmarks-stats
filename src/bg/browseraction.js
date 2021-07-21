import { isRegistered, registerForeground, getTabsObj, getForegroundID } from '/bg/foregroundinfo.js';

function onCreated(tab) {
    registerForeground(tab);
  }

function onBrowserAction(){
    if(isRegistered()){
        browser.tabs.highlight(getTabsObj());
        browser.tabs.reload(getForegroundID());
    }else{
        browser.tabs.create({ url: "/index.html" }).then(onCreated);
    }
}

function updateBadge(count) {
    browser.browserAction.setBadgeText({ text: count.toString() });
}

export {onBrowserAction, updateBadge};