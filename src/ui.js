import {updateBookmarkCount, updateDatapointsCount, updateNotification} from '/ui-text.js';
import {createChart, updateChart} from '/ui-chart.js';
import {setButtonsListeners} from '/ui-buttons.js';
import {getCurrentBookmarkCount} from '/ui-count.js';

let data = {};
let firstRun = true;

function updateUI(data){
    console.log(data);
    updateBookmarkCount(getCurrentBookmarkCount(data));
    updateDatapointsCount(Object.keys(data).length);

    if(firstRun){
        firstRun = false;
        createChart(data);
    }else{
        updateChart(data);
    }

    updateNotification("Data updated");
}

browser.runtime.sendMessage({ type: "hello" });

browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    if (message.type === 'data') {
        data = message.data;
        updateUI(data);
    }else if(message.type === "notification"){
        updateNotification(message.data);
    }
});

setButtonsListeners();
