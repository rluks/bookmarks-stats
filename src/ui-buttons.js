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

export{setButtonsListeners}
