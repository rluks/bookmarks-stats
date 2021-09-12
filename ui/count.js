function getCurrentBookmarkCount(data){
    let bookmarkCount = data[getMaxDate(data)];
    return bookmarkCount;
}

function getMinDate(data){
    let minKey = Object.keys(data).reduce((a, b) => a < b ? a : b);
    return minKey;
}

function getMaxDate(data){
    let maxKey = Object.keys(data).reduce((a, b) => a > b ? a : b);
    return maxKey;
}

function getMinCount(data){
    let min = Object.values(data).reduce((a, b) => a < b ? a : b);
    return min;
}

function getMaxCount(data){
    let max = Object.values(data).reduce((a, b) => a > b ? a : b);
    return max;
}

export {getCurrentBookmarkCount, getMinDate, getMaxDate, getMaxCount, getMinCount}