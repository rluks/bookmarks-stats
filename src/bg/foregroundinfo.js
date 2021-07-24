let foregroundTab = {};

function registerForeground(tab){
    foregroundTab = tab;//is this a copy or reference?!
}

function unregisterForeground(){
    foregroundTab = {};
}

function isRegistered(){
    return (Object.keys(foregroundTab).length !== 0);
}

function handleRemoved(tabId, removeInfo) {
    if(tabId === foregroundTab.id){
        unregisterForeground();
    }
}

function handleUpdated(tabId, changeInfo, tabInfo){
    if(tabId === foregroundTab.id){
        console.log("tab changeinfo:");
        console.log(changeInfo);
        if (changeInfo.url){
            console.log("url change");
            if(browser.runtime.getURL("index.html") !== changeInfo.url){
                console.log("unregistering");
                unregisterForeground();
            }
        }
    }
}

function getTabsObj(){
    return {"tabs" : foregroundTab.index};
}

function getForegroundID(){
    return foregroundTab.id;
}


export { getForegroundID, registerForeground, isRegistered, handleRemoved, getTabsObj, handleUpdated};