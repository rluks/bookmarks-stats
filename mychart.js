var ctx = document.getElementById("myChart").getContext('2d');

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{
            data: countArray,
            label: "Count",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Number of bookmarks'
        }
      }
  });
