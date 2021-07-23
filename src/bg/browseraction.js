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

function formatBadgeText(count){
    let countText;
    if(count > 9999){//only 4 digits are visible
        let countThousands = count / 1000;
        countThousands = Math.trunc(countThousands);
        countText = countThousands.toString() + "k";
    }else{
        countText = count.toString();
    }
    
    return countText;
}

function updateBadge(count) {
    let text = formatBadgeText(count);
    setBadgeText(text);
}

function setBadgeText(text){
    browser.browserAction.setBadgeText({ text: text});
}

export {onBrowserAction, updateBadge};