"use strict";

function showClearStatsBtn() {
    let btn = document.getElementById("clear-history-btn");
    btn.className = "showme";
    let noBtn = document.getElementById("dont-clear-history-btn");
    noBtn.className = "showme";
}

function hideClearStatsBtn() {
    let btn = document.getElementById("clear-history-btn");
    btn.className = "hideme";
    let noBtn = document.getElementById("dont-clear-history-btn");
    noBtn.className = "hideme";
}

function updateBookmarkCount(bookmarksCount) {
    document.querySelector('#counter').textContent = bookmarksCount;
}

function updateDatapointsCount(count) {
    if(count === 0){
        document.querySelector('#datapointscount').textContent = "No stats history yet. Continue using your bookmarks as usual and check back later.";
    }else{
        document.querySelector('#datapointscount').textContent = "Stats history: " + count + " changes to bookmarks recorded.";
    }
}

function setButtonsListeners() {
    
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

setButtonsListeners();