"use strict";

function onError (error) {
  console.log(error);
}

var bookmarksCountData = {};

function initializeStorage () {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey, curValue);
      bookmarksCountData[noteKey] = curValue;
    }
  }, onError);
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
  initializeStorage();
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
});

/* -------------------------------------------------------- */

/*                        Math                              */

/* -------------------------------------------------------- */

/* find minimum in array */
Array.min = function( array ){
    return Math.min.apply( Math, array );
};

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

/* rounding */
function toInt(n){ return Math.round(Number(n)); };

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

refreshData();

var intervalSeconds = 10;
setInterval(refreshData, intervalSeconds * 1000);
setTimeout(createChart, intervalSeconds * 100);

/* -------------------------------------------------------- */

/*                        Chart                              */

/* -------------------------------------------------------- */

function createChart () {
  var ctx = document.getElementById('myChart').getContext('2d');

  let minimumDatetime = bookmarksCountData[Object.keys(bookmarksCountData)[0]];//first record
  let minimumCount = Array.min(Object.values(bookmarksCountData));
  let chartMin = minimumCount - (10*minimumCount/100);//10%
  chartMin = (chartMin < 0) ? 0 : chartMin;
  chartMin = toInt(chartMin);

  let maximumCount = Array.max(Object.values(bookmarksCountData));
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
          //unit: 'minutes',
          //unitStepSize: 0.5,
          //round: 'minutes',
          //tooltipFormat: 'h:mm:ss a',
          displayFormats: {
            hour: 'MMM D, h:mm A'
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
        borderColor: '#3e95cd',
        fill: false
      }
      ]
    },
    options: options
  });
}
