"use strict";

function getCurrentBookmarkCount(data){
    let maxKey = Object.keys(data).reduce((a, b) => a > b ? a : b);
    let bookmarkCount = data[maxKey];
    console.log(maxKey + " : " + bookmarkCount);
    return bookmarkCount;
}

function updateUI(data){
    console.log(data);
    updateBookmarkCount(getCurrentBookmarkCount(data));
    updateDatapointsCount(Object.keys(data).length);
}

browser.runtime.sendMessage({ type: "hello" });

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'data') {
        updateUI(message.data);
    }
});