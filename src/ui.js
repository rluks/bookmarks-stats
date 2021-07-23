import {updateBookmarkCount, updateDatapointsCount} from '/ui-text.js';
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

}

browser.runtime.sendMessage({ type: "hello" });

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'data') {
        data = message.data;
        updateUI(data);
    }
});

setButtonsListeners();
