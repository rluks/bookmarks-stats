let foregroundTab = {};

function registerForeground(tab){
    foregroundTab = tab;
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
        if (changeInfo.url){
            if(browser.runtime.getURL("index.html") !== changeInfo.url){
                unregisterForeground();
            }
        }
    }
}

function getForegroundID(){
    return foregroundTab.id;
}


export { getForegroundID, registerForeground, isRegistered, handleRemoved, handleUpdated};