function getCurrentBookmarkCount(data){
    let bookmarkCount = data[getMaxDate(data)];
    return bookmarkCount;
}

function getMinDate(data){
    let minKey = Object.keys(data).reduce((a, b) => a < b ? a : b);
    console.log("minkey " + minKey);
    return minKey;
}

function getMaxDate(data){
    let maxKey = Object.keys(data).reduce((a, b) => a > b ? a : b);
    return maxKey;
}

export {getCurrentBookmarkCount, getMinDate, getMaxDate}