"use strict";

function showClearStatsBtn() {
    var btn = document.getElementById("clear-history-btn");
    btn.className = "showme";
    var noBtn = document.getElementById("dont-clear-history-btn");
    noBtn.className = "showme";
}

function hideClearStatsBtn() {
    var btn = document.getElementById("clear-history-btn");
    btn.className = "hideme";
    var noBtn = document.getElementById("dont-clear-history-btn");
    noBtn.className = "hideme";
}

function updateCurrent(bookmarksCount) {
    document.querySelector('#counter').textContent = bookmarksCount;
}

function printDatapointsCount(count) {
    if(count === 0){
        document.querySelector('#datapointscount').textContent = "No data points of bookmarks stats history. Continue using your bookmarks as usual and check back later.";
    }else{
        document.querySelector('#datapointscount').textContent = "Data points of bookmarks stats history: " + count;
    }
}

function setListeners() {
    
    document.getElementById('download-history-btn').addEventListener('click', function () {
        downloadHistory();
    });

    document.getElementById('clear-history-btn').addEventListener('click', function () {
        requestClearingHistoryStorage();
        window.location.reload();
    });
    
    document.getElementById('clear-history-p').addEventListener('click', showClearStatsBtn);

    document.getElementById('dont-clear-history-btn').addEventListener('click', hideClearStatsBtn);
}