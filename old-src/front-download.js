"use strict";

function download(filename, data) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function DownloadStatsHistory(data) {
    var filename = "bookmark_stats.json";
    download(filename, JSON.stringify(data));
}
