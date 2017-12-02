var bookmarksCount = 0;

function count(){
	const ignoredScheme = /^(place|about|javascript|data)\:/i;

    browser.bookmarks.search({}).then(bookmarks => {
        let queue = [];
        for (const bookmark of bookmarks) {
            const url = bookmark.url;
            if (!url || ignoredScheme.test(url)) {
                continue;
            }

            queue.push([url, bookmark]);
        }
		bookmarksCount = queue.length;
		displayCount();
		storeCount();
    });
}

function displayCount(){
	document.querySelector("#counter").textContent = bookmarksCount;
	browser.browserAction.setBadgeText({text: bookmarksCount.toString()});
}

function storeCount(){
	storeNote(new Date(), bookmarksCount);
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

/* "Main" */
count();

//clearStorage();
initializeStorage();
