"use strict";

function createCanvas() {
    var canvasDiv = document.getElementById('chart');
    var width = canvasDiv.offsetWidth;
    var canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    canvas.width = width;
    canvas.height = 450;
    canvasDiv.appendChild(canvas);
    return canvas;
}

function createChart() {
    var sketchCanvas = createCanvas();
    var ctx = sketchCanvas.getContext('2d');
    let minimumDatetime = bookmarksCountData[Object.keys(bookmarksCountData)[0]]; //first record
    let minimumCount = arrMin(Object.values(bookmarksCountData));
    let chartMin = minimumCount - (10 * minimumCount / 100); //10%
    chartMin = (chartMin < 0) ? 0 : chartMin;
    chartMin = toInt(chartMin);
    let maximumCount = arrMax(Object.values(bookmarksCountData));
    let chartMax = maximumCount + (10 * maximumCount / 100); //10%
    chartMax = toInt(chartMax);
    var options = {
        title: {
            display: false,
            text: 'Number of bookmarks'
        },
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        //unitStepSize: 0.5,
                        round: 'minutes',
                        tooltipFormat: 'YYYY-MM-DD HH:mm',
                        displayFormats: {
                            second: 'YYYY-MM-DD HH:mm'
                        }
                    },
                    ticks: {
                        min: minimumDatetime,
                        max: new Date()
                    }
                }],
            yAxes: [{
                    ticks: {
                        //suggestedMin: chartMin,
                        //suggestedMax: chartMax,
                        userCallback: function (label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
                        },
                    }
                }]
        }
    };
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(bookmarksCountData),
            datasets: [{
                    data: Object.values(bookmarksCountData),
                    label: 'Count',
                    lineTension: 0.05,
                    borderColor: '#3e95cd',
                    fill: false,
                    radius: 1,
                    hitRadius: 3
                }
            ]
        },
        options: options
    });
}