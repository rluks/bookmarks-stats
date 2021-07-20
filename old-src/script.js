"use strict";

function requestClearingHistoryStorage() {
    browser.runtime.sendMessage({ type: 'clear_history' });
}

function getCurrentCount() {
    browser.runtime.sendMessage({ type: 'get_current_count' });
}

function refreshData() {
    browser.runtime.sendMessage({ type: 'get_stats_history' });
    getCurrentCount();
}

function downloadHistory() {
    DownloadStatsHistory(statsHistory);
}

var statsHistory;

/* -------------------------------------------------------- */
/*          COMMUNCIATION with BACKGROUND SCRIPT            */
/* -------------------------------------------------------- */

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'current_count') {
        updateCurrent(message.bookmarksCount);
    }
    else if (message.type === 'stats_history') {
        statsHistory = message.historyData;
        console.log(statsHistory);
        printDatapointsCount(Object.keys(statsHistory).length);
    }
});

/* -------------------------------------------------------- */
/*                        MAIN                              */
/* -------------------------------------------------------- */

setListeners();
refreshData();

var intervalSeconds = 30; //TODO get rid of pooling
setInterval(refreshData, intervalSeconds * 1000);
setTimeout(createChart, intervalSeconds * 100);


