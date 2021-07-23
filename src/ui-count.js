function getCurrentBookmarkCount(data){
    let maxKey = Object.keys(data).reduce((a, b) => a > b ? a : b);
    let bookmarkCount = data[maxKey];
    return bookmarkCount;
}

export {getCurrentBookmarkCount}