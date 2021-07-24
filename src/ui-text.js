function updateBookmarkCount(bookmarksCount) {
    document.querySelector('#counter').textContent = bookmarksCount;
}

function updateDatapointsCount(count) {
    if(count === 0){
        document.querySelector('#datapointscount').textContent = "No bookmark history. Continue using your bookmarks as usual and check back later.";
    }else{
        document.querySelector('#datapointscount').textContent = "Bookmarks history: " + count + " changes recorded.";
    }
}

function updateNotification(msg){
    document.querySelector('#notification').textContent = msg;
    console.log(msg);
}

export {updateBookmarkCount, updateDatapointsCount, updateNotification}