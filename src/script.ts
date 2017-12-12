"use strict";

function onStorageError (error) {
  console.log(error);
}



//  stupid js
function addZero (i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function formatTimestamp (timestamp) {
  var dateObj = new Date(timestamp);
  var isoDate = dateObj.toISOString();

  var datepart = isoDate.split('T')[0];
  var hours = addZero(dateObj.getHours());
  var minutes = addZero(dateObj.getMinutes());
  var seconds = addZero(dateObj.getSeconds());
  var timePart = hours + ':' + minutes + ':' + seconds;

  var tmpStr = datepart + ' ' + timePart;
  return tmpStr;
}

function displayNote (timestamp, body) {
  var tableRef = document.getElementById('history-table').getElementsByTagName('tbody')[0];
  var newRow = tableRef.insertRow(tableRef.rows.length);

  var newCell = newRow.insertCell(0);
  var newText = document.createTextNode(formatTimestamp(timestamp));
  newCell.appendChild(newText);

  var newCell2 = newRow.insertCell(1);
  var newText2 = document.createTextNode(body);
  newCell2.appendChild(newText2);
}

function requestClearingHistoryStorage () {
  browser.runtime.sendMessage({type: 'clear_history'});
}

function clearHistoryTableHTML () {
  var oldTbody = document.getElementById('history-table').getElementsByTagName('tbody')[0];
  var newTbody = document.createElement('tbody');
  oldTbody.parentNode.replaceChild(newTbody, oldTbody);
}

document.getElementById('clear-history-btn').addEventListener('click', function () {
  requestClearingHistoryStorage();
  clearHistoryTableHTML();
});

function getCurrentCount () {
  browser.runtime.sendMessage({type: 'get_current_count'});
}

function refreshData () {
  getCurrentCount();
  clearHistoryTableHTML();
  //initializeStorage();
}

function downloadHistory(){
  browser.runtime.sendMessage({type: 'download_history'});
}


function updateCurrent (bookmarksCount) {
  document.querySelector('#counter').textContent = bookmarksCount;
}
/* -------------------------------------------------------- */

/*          COMMUNCIATION with BACKGROUND SCRIPT            */

/* -------------------------------------------------------- */
browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'current_count') {
    updateCurrent(message.bookmarksCount);
  }
  else if (message.type === 'history_data') {
    testDownload(message.bookmarksCountData);
  }
});

/* -------------------------------------------------------- */

/*                        Math                              */

/* -------------------------------------------------------- */

/* find minimum and maximum in array */
function arrMin( array ){return Math.min.apply( Math, array );}
function arrMax( array ){return Math.max.apply( Math, array );}

/* rounding */
function toInt(n){ return Math.round(Number(n)); };

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

refreshData();

var intervalSeconds = 10;
setInterval(refreshData, intervalSeconds * 1000);
setTimeout(createChart, intervalSeconds * 100);


document.getElementById('download-history-btn').addEventListener('click', function () {
  downloadHistory();
});

/* -------------------------------------------------------- */

/*                        Chart                              */

/* -------------------------------------------------------- */

function createCanvas(){
  var canvasDiv = document.getElementById('chart');
  var width = canvasDiv.offsetWidth;

  var canvas = document.createElement('canvas');
  canvas.id = "CursorLayer";
  canvas.width = width;
  canvas.height = 450;

  canvasDiv.appendChild(canvas);

  return canvas;
}

function createChart () {
  var sketchCanvas = createCanvas();
  var ctx = sketchCanvas.getContext('2d');

  let minimumDatetime = bookmarksCountData[Object.keys(bookmarksCountData)[0]];//first record
  let minimumCount = arrMin(Object.values(bookmarksCountData));
  let chartMin = minimumCount - (10*minimumCount/100);//10%
  chartMin = (chartMin < 0) ? 0 : chartMin;
  chartMin = toInt(chartMin);

  let maximumCount = arrMax(Object.values(bookmarksCountData));
  let chartMax = maximumCount + (10*maximumCount/100);//10%
  chartMax = toInt(chartMax);

  var options = {
    title: {
      display: true,
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
          userCallback: function(label, index, labels) { // <-- hack for rounding the number
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
        fill: false
      }
      ]
    },
    options: options
  });
}
