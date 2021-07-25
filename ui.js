import {updateBookmarkCount, updateDatapointsCount, updateNotification, updateVersion} from '/ui/text.js';
import {createChart, updateChart} from '/ui/chart.js';
import {setButtonsListeners} from '/ui/buttons.js';
import {getCurrentBookmarkCount} from '/ui/count.js';
import {downloadHistory} from '/ui/download.js';


let data = {};
let firstRun = true;

function updateUI(data){
    updateBookmarkCount(getCurrentBookmarkCount(data));
    updateDatapointsCount(Object.keys(data).length);

    if(firstRun){
        firstRun = false;
        createChart(data);
    }else{
        updateChart(data);
    }

    updateNotification("Updated");
}

function requestHistoryClear(){
    browser.runtime.sendMessage({ type: "clear-history" });
}

function requestHistoryDownload(){
    downloadHistory(data);
}

browser.runtime.sendMessage({ type: "hello" });

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'data') {
        data = message.data;
        updateUI(data);
    }else if(message.type === "notification"){
        updateNotification(message.data);
    }
});

setButtonsListeners();
updateVersion(browser.runtime.getManifest().version);

export {requestHistoryClear, requestHistoryDownload}
