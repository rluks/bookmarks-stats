function updateBookmarkCount(bookmarksCount) {
    document.querySelector('#counter').textContent = bookmarksCount;
}

function updateDatapointsCount(count) {
    if(count === 0){
        document.querySelector('#datapointscount').textContent = "No records. Make some changes to your bookmarks.";
    }else{
        document.querySelector('#datapointscount').textContent = "" + count + " records";
    }
}

function getNowTimeStr(){
    let nowTime = new Date().toTimeString().split(' ')[0];
    return nowTime;
}

function updateNotification(msg){
    document.querySelector('#notification').textContent = "[" + getNowTimeStr() + "] " + msg;
}

function updateVersion(v){
    document.querySelector('#version').textContent = v;
}

export {updateBookmarkCount, updateDatapointsCount, updateNotification, updateVersion}