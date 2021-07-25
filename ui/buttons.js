import {requestHistoryClear, requestHistoryDownload} from '/ui.js';

function showClearStatsBtn() {
    ChangeElVisibility("clear-history-btn", "showme");
    ChangeElVisibility("dont-clear-history-btn", "showme");
}

function hideClearStatsBtn() {
    ChangeElVisibility("clear-history-btn", "hideme");
    ChangeElVisibility("dont-clear-history-btn", "hideme");
}

function ChangeElVisibility(elID, visibilityClass){
    let mEl = document.getElementById(elID);
    mEl.className = visibilityClass;
}

//TODO import stats history

function setButtonsListeners() {
    
    document.getElementById('download-history-btn').addEventListener('click', function () {
        requestHistoryDownload();
    });

    document.getElementById('clear-history-btn').addEventListener('click', function () {
        requestHistoryClear();
        window.location.reload();
    });
    
    document.getElementById('clear-history-p').addEventListener('click', showClearStatsBtn);

    document.getElementById('dont-clear-history-btn').addEventListener('click', hideClearStatsBtn);

}

export{setButtonsListeners}
