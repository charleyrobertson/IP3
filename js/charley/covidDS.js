$(document).ready(function () {

  //Each time a new country is selected, reset the data being pulled.
  $("#countryList").change(function () {
    clearData();
    var country = $("#countryList option:selected").val();
    console.log(country);

    //Get searchURL for API.
    var searchURL =
      "https://covid-api.mmediagroup.fr/v1/cases?country=" + country;

    //Use getJSON() to pull data from JSON..
    $.getJSON(searchURL, function (results) {
      console.log(results);
  
      //Put data into its own constant.
      const data = {
        confirmed: results.All.confirmed,
        recovered: results.All.recovered,
        deaths: results.All.deaths,
        updated: results.All.updated,
        country: results.All.country
      };
      console.log(data.country);
      makeChart(data);
      displayData(data);
    });
  });
});

function makeChart(stats) {
  var ctx = document.getElementById("doughnut-chart").getContext("2d");
  var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "Coronavirus Statistics",
          data: [stats.confirmed, stats.recovered, stats.deaths],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Confirmed", "Recovered", "Deaths"],
    },
    options: {
      cutoutPercentage: 40,
    },
  });
}

function displayData(data) {
  if (data.recovered != 0) {
    document.getElementById("ConfirmedCases").innerHTML +=
      "<p>" + data.confirmed + "</p>";
    document.getElementById("RecoveryCases").innerHTML +=
      "<p>" + data.recovered + "</p>";
    document.getElementById("Deaths").innerHTML += "<p>" + data.deaths + "</p>";
    document.getElementById("lastUpdated").innerHTML +=
      "<p>" + data.updated + "</p>";
  } else {
    document.getElementById("ConfirmedCases").innerHTML +=
      "<p>" + data.confirmed + "</p>";
    document.getElementById("RecoveryCases").innerHTML +=
      "<p>" + "Recovery Data Not Available" + "</p>";
    document.getElementById("Deaths").innerHTML += "<p>" + data.deaths + "</p>";
    document.getElementById("lastUpdated").innerHTML +=
      "<p>" + data.updated + "</p>";
  }
}

function clearData() {
  //Clearing chart
  var doughnutContent = document.getElementById("doughnut-chart");
  doughnutContent.innerHTML = "&nbsp;";

  //Clearing <p> data
  var confirmedContent = document.getElementById("ConfirmedCases");
  confirmedContent.innerHTML = "Confirmed Cases";
  var recContent = document.getElementById("RecoveryCases");
  recContent.innerHTML = "Recovery Cases";
  var deathContent = document.getElementById("Deaths");
  deathContent.innerHTML = "Deaths";
  var updatedContent = document.getElementById("lastUpdated");
  updatedContent.innerHTML = "Last Updated";
}
