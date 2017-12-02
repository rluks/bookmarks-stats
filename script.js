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
		document.querySelector("#counter").textContent = queue.length;
    });
}

function displayNote(timestamp, body) {

	/* create note display box */
	var noteDisplay = document.createElement('div');
	
	var noteTime = document.createElement('p');
	var noteBody = document.createElement('p');
	
	noteDisplay.appendChild(noteTime);
	noteDisplay.appendChild(noteBody);
	
	noteTime.textContent = timestamp;
	noteBody.textContent = body;
	
	document.body.appendChild(noteDisplay);
}

/* "Main" */
count();

initializeStorage();
storeNote(new Date(), "store test");
//displayNote(new Date(), "Tbody");
