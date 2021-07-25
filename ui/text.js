let refreshingIntervalId;
let refreshingDotCount;

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

    if(msg === "Refreshing"){   
        clearInterval(refreshingIntervalId); 
        refreshingIntervalId = setInterval(updateRefreshing, 400);
    }else{
        clearInterval(refreshingIntervalId);    
    }
}

function updateRefreshing(){
    console.log(new Date() + " adding dot"); 
    document.querySelector('#notification').textContent += ".";
}

function updateVersion(v){
    document.querySelector('#version').textContent = v;
}

export {updateBookmarkCount, updateDatapointsCount, updateNotification, updateVersion}