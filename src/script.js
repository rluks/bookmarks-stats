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

function requestClearingHistoryStorage() {
    browser.runtime.sendMessage({ type: 'clear_history' });
}

function getCurrentCount() {
    browser.runtime.sendMessage({ type: 'get_current_count' });
}

function refreshData() {
    browser.runtime.sendMessage({ type: 'download_history' });
    getCurrentCount();
}

function downloadHistory() {
    testDownload(bookmarksCountData);
}

var bookmarksCountData;

function updateCurrent(bookmarksCount) {
    document.querySelector('#counter').textContent = bookmarksCount;
}

function printDatapointsCount(count) {
    if(count === 0){
        document.querySelector('#datapointscount').textContent = "No data points of bookmarks count history. Continue using your bookmarks as usuall and check back later.";
    }else{
        document.querySelector('#datapointscount').textContent = "Data points of bookmarks count history: " + count;
    }
}

/* -------------------------------------------------------- */
/*                         ONCLICK                          */
/* -------------------------------------------------------- */

function setListeners() {
    document.getElementById('download-history-btn').addEventListener('click', function () {
        downloadHistory();
    });
    document.getElementById('clear-history-btn').addEventListener('click', function () {
        requestClearingHistoryStorage();
    });
    var textLink = document.getElementById('clear-history-a');
    textLink.setAttribute("href", "javascript:;");
    textLink.addEventListener('click', showClearStatsBtn);
    document.getElementById('dont-clear-history-btn').addEventListener('click', hideClearStatsBtn);
}

/* -------------------------------------------------------- */
/*          COMMUNCIATION with BACKGROUND SCRIPT            */
/* -------------------------------------------------------- */

browser.runtime.onMessage.addListener((message) => {
    if (message.type === 'current_count') {
        updateCurrent(message.bookmarksCount);
    }
    else if (message.type === 'history_data') {
        bookmarksCountData = message.historyData;
        console.log(bookmarksCountData);
        printDatapointsCount(Object.keys(bookmarksCountData).length);
    }
});

/* -------------------------------------------------------- */
/*                        Math                              */
/* -------------------------------------------------------- */

/* find minimum and maximum in array */
function arrMin(array) { return Math.min.apply(Math, array); }
function arrMax(array) { return Math.max.apply(Math, array); }

/* rounding */
function toInt(n) { return Math.round(Number(n)); }
;

/* -------------------------------------------------------- */
/*                        MAIN                              */
/* -------------------------------------------------------- */

setListeners();
refreshData();

var intervalSeconds = 30; //TODO get rid of pooling
setInterval(refreshData, intervalSeconds * 1000);
setTimeout(createChart, intervalSeconds * 100);

/* -------------------------------------------------------- */
/*                        Chart                              */
/* -------------------------------------------------------- */

function createCanvas() {
    var canvasDiv = document.getElementById('chart');
    var width = canvasDiv.offsetWidth;
    var canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    canvas.width = width;
    canvas.height = 450;
    canvasDiv.appendChild(canvas);
    return canvas;
}

function createChart() {
    var sketchCanvas = createCanvas();
    var ctx = sketchCanvas.getContext('2d');
    let minimumDatetime = bookmarksCountData[Object.keys(bookmarksCountData)[0]]; //first record
    let minimumCount = arrMin(Object.values(bookmarksCountData));
    let chartMin = minimumCount - (10 * minimumCount / 100); //10%
    chartMin = (chartMin < 0) ? 0 : chartMin;
    chartMin = toInt(chartMin);
    let maximumCount = arrMax(Object.values(bookmarksCountData));
    let chartMax = maximumCount + (10 * maximumCount / 100); //10%
    chartMax = toInt(chartMax);
    var options = {
        title: {
            display: false,
            text: 'Number of bookmarks'
        },
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        //unitStepSize: 0.5,
                        round: 'minutes',
                        tooltipFormat: 'YYYY-MM-DD HH:mm',
                        displayFormats: {
                            second: 'YYYY-MM-DD HH:mm'
                        }
                    },
                    ticks: {
                        min: minimumDatetime,
                        max: new Date()
                    }
                }],
            yAxes: [{
                    ticks: {
                        //suggestedMin: chartMin,
                        //suggestedMax: chartMax,
                        userCallback: function (label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
                        },
                    }
                }]
        }
    };
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(bookmarksCountData),
            datasets: [{
                    data: Object.values(bookmarksCountData),
                    label: 'Count',
                    lineTension: 0.05,
                    borderColor: '#3e95cd',
                    fill: false,
                    radius: 1,
                    hitRadius: 3
                }
            ]
        },
        options: options
    });
}
