function onError(error) {
  console.log(error);
}

function initializeStorage() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
}

function displayCount(){
	document.querySelector("#counter").textContent = bookmarksCount;
}

//stupid js
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function formatTimestamp(timestamp){
  var dateObj = new Date(timestamp);
  var isoDate = dateObj.toISOString();

  var datepart =  isoDate.split('T')[0];
  var hours = addZero(dateObj.getHours());
  var minutes =  addZero(dateObj.getMinutes());
  var seconds =  addZero(dateObj.getSeconds());
  var timePart = hours + ":" + minutes + ":" + seconds;

  var tmpStr = datepart + " " + timePart;
  return tmpStr;
}

function displayNote(timestamp, body) {
	var tableRef = document.getElementById('history-table').getElementsByTagName('tbody')[0];
	var newRow = tableRef.insertRow(tableRef.rows.length);

	var newCell  = newRow.insertCell(0);
	var newText  = document.createTextNode(formatTimestamp(timestamp));
  newCell.appendChild(newText);

	var newCell2  = newRow.insertCell(1);
	var newText2  = document.createTextNode(body);
  newCell2.appendChild(newText2);
}

function requestClearingHistoryStorage(){
	browser.runtime.sendMessage({type: "clear_history"});
}

function clearHistoryTableHTML(){
	var old_tbody = document.getElementById('history-table').getElementsByTagName('tbody')[0];
	var new_tbody = document.createElement('tbody');
	old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
}

document.getElementById("clear-history-btn").addEventListener("click", function(){
		requestClearingHistoryStorage();
		clearHistoryTableHTML();
});

function refreshTable(){
  clearHistoryTableHTML();
  initializeStorage();
}

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

initializeStorage();

setInterval(refreshTable, 1000);
/*
let { setTimeout } = require('sdk/timers');
function openPopup () {
	console.log("test");
}
setTimeout(openPopup, 3000);*/
