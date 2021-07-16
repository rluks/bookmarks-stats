
/* generate a single bookmark with a number in title */
function generateTestingBookmark(number) {
    var createBookmark = browser.bookmarks.create({
        title: "bookmark" + number,
        url: "https://www.example.org"
    });
}

/* generate 3 bookmarks */
function generateTestingBookmarks() {
    if(!DEBUG)
        return;
    for (var i = 0; i < 3; i++) {
        generateTestingBookmark(i);
    }
}

function generateFakeHistory(){
    if(!DEBUG)
        return;
    for(let i = 600; i > 0; i -= 30){
        let minuteOld = new Date();
        minuteOld.setSeconds(minuteOld.getSeconds() - i);
        storeNote(minuteOld, getRandomInt(0, 100));
    }
}
