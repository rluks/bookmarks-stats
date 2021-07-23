/* find minimum and maximum in array */
function arrMin(array) { return Math.min.apply(Math, array); }
function arrMax(array) { return Math.max.apply(Math, array); }

/* rounding */
function toInt(n) { return Math.round(Number(n)); }

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

let myLineChart;

function minimumDatetime(statsHistory){
    return statsHistory[Object.keys(statsHistory)[0]]; //first record
}

function minimumCount(statsHistory){
    return arrMin(Object.values(statsHistory));
}

function chartMin(){
    let chartMin = minimumCount() - (10 * minimumCount() / 100); //10%
    chartMin = (chartMin < 0) ? 0 : chartMin;
    chartMin = toInt(chartMin);
    return chartMin;
}

function maximumCount(statsHistory){
    return arrMax(Object.values(statsHistory));
}

function chartMax(){
    let chartMax = maximumCount() + (10 * maximumCount() / 100); //10%
    chartMax = toInt(chartMax);
    return chartMax;
}


function createChart(statsHistory) {
    console.log("createChart");

    var sketchCanvas = createCanvas();
    var ctx = sketchCanvas.getContext('2d');  
    var options = {
        title: {
            display: false,
            text: 'Number of bookmarks'
        },
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        unitStepSize: 0.5,
                        round: 'minutes',
                        tooltipFormat: 'YYYY-MM-DD HH:mm',
                        displayFormats: {
                            second: 'YYYY-MM-DD HH:mm'
                        }
                    },
                    ticks: {
                        min: minimumDatetime(statsHistory),
                        max: new Date()
                    }
                }],
            yAxes: [{
                    ticks: {
                        //suggestedMin: chartMin(),
                        //suggestedMax: chartMax(),
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

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(statsHistory),
            datasets: [{
                    data: Object.values(statsHistory),
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

function updateChart(data){
    console.log(new Date().toISOString() + " updateChart");

    myLineChart.data.labels = Object.keys(data);
    myLineChart.data.datasets.data = Object.values(data);
    /*myLineChart.options.scales.xAxes.ticks = {
        min: minimumDatetime(data),
        max: new Date()
    };*/

    myLineChart.update();
}

export {createChart, updateChart}
