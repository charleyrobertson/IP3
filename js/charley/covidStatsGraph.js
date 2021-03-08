$(document).ready(function () {
  var ctx = document.getElementById("myDoughnutChart").getContext("2d");
  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data = {
        datasets: [{
            data: [10, 20, 30]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    },
    options: {
        cutoutPercentage: 40, 
    }
  });

});