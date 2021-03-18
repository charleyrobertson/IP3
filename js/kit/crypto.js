$(document).ready(function () {
    const CHART = document.getElementById("lineChart");
    console.log(CHART);
    let lineChart = new Chart(CHART, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Bitcoin",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "rgba(75,192,192,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
    });
  });
  
  