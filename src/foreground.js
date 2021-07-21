"use strict";

function updateUI(data){
    console.log(data);
}

browser.runtime.sendMessage({ type: "hello" });

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'data') {
        updateUI(message.data);
    }
});