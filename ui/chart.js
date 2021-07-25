import {getMinDate, getMaxDate, getMinCount, getMaxCount} from '/ui/count.js';

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
    let elColor = '#eee';
    let minCount = getMinCount(statsHistory) - 1;
    if(minCount < 0){
        minCount = 0;
    }

    var options = {
        title: {
            display: false,
            text: 'Number of bookmarks'
        },
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        tooltipFormat: 'YYYY-MM-DD HH:mm',
                        displayFormats: {
                            second: 'YYYY-MM-DD HH:mm'
                        }
                    },
                    ticks: {
                        min: getMinDate(statsHistory),
                        max: getMaxDate(statsHistory),
                        fontColor: elColor
                    },
                    
                    gridLines:{
                        color: elColor
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
                        fontColor: elColor,
                        max: getMaxCount(statsHistory)+1,
                        min: minCount
                    },

                    gridLines:{
                        color: elColor
                    }
                }] 
        },
        legend: {
            labels: {
                fontColor: elColor
            }
        }
    };
    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(statsHistory),
            datasets: [{
                    data: Object.values(statsHistory),
                    label: 'Bookmark count over time',
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
