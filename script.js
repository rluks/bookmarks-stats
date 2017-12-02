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
	console.log("hello");

	var tableRef = document.getElementById('history-table').getElementsByTagName('tbody')[0];
	var newRow = tableRef.insertRow(tableRef.rows.length);

	var newCell  = newRow.insertCell(0);
	var newText  = document.createTextNode(timestamp);
  newCell.appendChild(newText);

	var newCell2  = newRow.insertCell(1);
	var newText2  = document.createTextNode(body);
  newCell2.appendChild(newText2);
}

/* "Main" */
//count();
//displayCount();

initializeStorage();
//clearStorage();
