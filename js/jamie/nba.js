$(document).ready(function () {
  var seasonList = document.getElementById("seasonList");
  seasonList.options[0] = new Option("Select a season...", "0");
  seasonList.options[1] = new Option("2015-16", "");
  seasonList.options[2] = new Option("2016-17", "");
  seasonList.options[3] = new Option("2017-18", "");
  seasonList.options[4] = new Option("2018-19", "");
  seasonList.options[5] = new Option("2019-20", "");
  seasonList.options[6] = new Option("2020-21", "");

  displaySeasonHeader();
  getLebronJames();
  playerSearch();
});

// TODO:
// Search for a player and append results to the datalist
// when value is selected, data will be sent to charting functions
// when value is selected, the datalist should clear all the options and values
function playerSearch() {
  $("#playerSearch").keypress(function () {
    if ($(this).val().length > 4) {
      console.log("Success!");
      var q = $("#playerSearch").val();
      q = q.replace(/ /g, "_");
      console.log(q);
      $.ajax("https://www.balldontlie.io/api/v1/players?search=" + q).done(
        function (data) {
          console.log(data);
          var list = document.getElementById("playerSearchOptions");
          for (i = 0; i < data.data.length; i++) {
            console.log(data.data[i].first_name);
            var option = document.createElement("option");
            option.value =
              data.data[i].first_name + " " + data.data[i].last_name;
            list.appendChild(option);
          }
          console.log(list);
        }
      );
    }
  });
}

// Will display a header on season selection
function displaySeasonHeader() {
  // Display Header based on season selection
  $("#seasonList").change(function () {
    var season = $("#seasonList option:selected").text();
    var h1 = document.createElement("h1");
    h1.innerHTML = season + " SEASON AVERAGES";
    var div = document.getElementById("seasonHeader");
    if (season !== "Select a season...") {
      $("#seasonHeader").empty();
      div.append(h1);
    }
  });
}

// A hardcoded function for testing
// Will be used for multiple players and charts/tables
function getLebronJames() {
  // Getting the goats stats for selected season
  // Only get stats if default isnt selected
  $("#seasonList").change(function () {
    var season = $("#seasonList option:selected").text();
    if (season !== "Select a season...") {
      season = season.substring(0, 4);
      // console.log(season);
      $.ajax(
        "https://www.balldontlie.io/api/v1/season_averages?season=" +
          season +
          "&player_ids[]=237"
      ).done(function (data) {
        console.log("Lebron James's season averages: ", data);
        mapStatsToChart(data);
        getFirstSeason();
      });
    }
  });
}

// Getting the first season a player played in
function getFirstSeason() {
  $.ajax("https://www.balldontlie.io/api/v1/stats?player_ids[]=237").done(
    function (data) {
      var firstSeason = parseInt(data.data[0].game.season, 10);
      console.log("The players first season: ", firstSeason);
      calcCareerAverage(firstSeason);
    }
  );
}

// Calculating a players career averages in chosen metrics
async function calcCareerAverage(firstSeason) {
  var careerStats = {
    points: 0.0,
    assists: 0.0,
    rebounds: 0.0,
    blocks: 0.0,
    steals: 0.0,
    turnOver: 0.0,
  };
  var counter = 0;

  for (i = firstSeason; i < 2020; i++) {
    $.ajax({
      url:
        "https://www.balldontlie.io/api/v1/season_averages?season=" +
        i +
        "&player_ids[]=237",
      // async: false,
    }).done(function (data) {
      careerStats.points += data.data[0].pts;
      careerStats.assists += data.data[0].ast;
      careerStats.rebounds += data.data[0].reb;
      careerStats.blocks += data.data[0].blk;
      careerStats.steals += data.data[0].stl;
      careerStats.turnOver += data.data[0].turnover;
      console.log(careerStats.points);
    });

    counter++;
    console.log(counter);
  }
}

function consoleLogActuallyRuinedMyEvening(careerStats) {
  console.log(careerStats);
}

var ctx = null;
var chart = null;

function mapStatsToChart(data) {
  const labels = [];
  const seasonStats = {
    points: data.data[0].pts,
    assits: data.data[0].ast,
    rebounds: data.data[0].reb,
    blocks: data.data[0].blk,
    steals: data.data[0].stl,
    turnOver: data.data[0].turnover,
  };
  console.log("Lebrons chosen season stats: ", seasonStats);

  var ctx = document.getElementById("seasonAverages").getContext("2d");

  // Destroy previous chart
  if (chart != null) {
    chart.destroy();
    chart = null;
  }

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "Points",
        "Assists",
        "Rebounds",
        "Blocks",
        "Steals",
        "Turn Overs",
      ],
      datasets: [
        {
          label: "Season Averages",
          data: [
            seasonStats.points,
            seasonStats.assits,
            seasonStats.rebounds,
            seasonStats.blocks,
            seasonStats.steals,
            seasonStats.turnOver,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
        {
          label: "Career Averages",
          data: [],
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
