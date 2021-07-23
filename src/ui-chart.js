import {getMinDate, getMaxDate} from '/ui-count.js';

function createCanvas() {
    var canvasDiv = document.getElementById('chart');
    while(canvasDiv.firstChild){
        canvasDiv.removeChild(canvasDiv.firstChild);
    }

    var width = canvasDiv.offsetWidth;
    var canvas = document.createElement('canvas');
    canvas.id = "CursorLayer";
    canvas.width = width;
    canvas.height = 450;
    canvasDiv.appendChild(canvas);
    return canvas;
}

let myLineChart;

function createChart(statsHistory) {

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
                        round: 'minutes',
                        tooltipFormat: 'YYYY-MM-DD HH:mm',
                        displayFormats: {
                            second: 'YYYY-MM-DD HH:mm'
                        }
                    },
                    ticks: {
                        min: getMinDate(statsHistory),
                        max: getMaxDate(statsHistory)
                    }
                }],
            yAxes: [{
                    ticks: {
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
    myLineChart.destroy();
    createChart(data);
}

export {createChart, updateChart}
