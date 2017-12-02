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

function displayNote(timestamp, body) {
	var tableRef = document.getElementById('history-table').getElementsByTagName('tbody')[0];
	var newRow = tableRef.insertRow(tableRef.rows.length);

	var newCell  = newRow.insertCell(0);
	var newText  = document.createTextNode(timestamp);
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

/* -------------------------------------------------------- */

/*                        MAIN                              */

/* -------------------------------------------------------- */

/*document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('clear-history-btn');
    btn.addEventListener('click', clearHistory());
});*/

document.getElementById("clear-history-btn").addEventListener("click", function(){
    console.log("say hi");
		//requestClearingHistoryStorage();
		clearHistoryTableHTML();
});

initializeStorage();

/*
let { setTimeout } = require('sdk/timers');
function openPopup () {
	console.log("test");
}
setTimeout(openPopup, 3000);*/
