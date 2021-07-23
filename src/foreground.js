"use strict";

function getCurrentBookmarkCount(data){
    let maxKey = Object.keys(data).reduce((a, b) => a > b ? a : b);
    let bookmarkCount = data[maxKey];
    return bookmarkCount;
}

function updateUI(data){
    console.log(data);
    updateBookmarkCount(getCurrentBookmarkCount(data));
    updateDatapointsCount(Object.keys(data).length);
    //TODO refresh the chart
    //TODO add the chart yo! xD
}

browser.runtime.sendMessage({ type: "hello" });

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'data') {
        updateUI(message.data);
    }
});