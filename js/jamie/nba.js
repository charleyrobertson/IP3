// Globals
var currentPlayer = null; // Currently selected player, used for multiple functions
var currentSeason = null; // Currently selected season, filterd to not include the default
var ctx = null; // Used for chart
var chart = null; // Used for chart

$(document).ready(function () {
    // Search on click on button
    $("#playerSearchButton").click(function () {
        var search = $("#playerSearch").val();
        playerSearch(search);
    });
    // Search on enter
    $("#playerSearch").on("change", function () {
        var value = this.value;
        $("#playerSearchButton").click();
    });

    // Clear button for player search
    // TODO

    // Display season header
    $("#seasonList").change(function () {
        var season = $("#seasonList option:selected").text();
        var h1 = document.createElement("h1");
        h1.innerHTML = season + " SEASON AVERAGES";
        var div = document.getElementById("seasonHeader");
        if (season !== "Select a season...") {
            $("#seasonHeader").empty();
            div.append(h1);
            getSeasonAverages(currentPlayer);
        }
        // Get data and call charting function
    });
});

function playerSearch(search) {
    // Replace spaces with "_"
    search = search.replace(/ /g, "_");
    console.log(search);
    $.ajax("https://www.balldontlie.io/api/v1/players?search=" + search).done(
        function (data) {
            if (data.data.length > 1) {
                var list = document.getElementById("playerSearchOptions");
                for (i = 0; i < data.data.length; i++) {
                    var option = document.createElement("option");
                    option.value =
                        data.data[i].first_name + " " + data.data[i].last_name;
                    list.appendChild(option);
                }
            } else {
                currentPlayer = data;
                console.log("currentPlayer:", currentPlayer);
                getFirstSeason(data);
            }
        }
    );
}

// Getting the first season a player played in
// It turns out that a players first season is not always the first season in the players stat page
// TODO; FIX
function getFirstSeason(data) {
    var id = data.data[0].id;
    $.ajax("https://www.balldontlie.io/api/v1/stats?player_ids[]=" + id).done(
        function (data) {
            var firstSeason = parseInt(data.data[0].game.season, 10);
            console.log("The players first season: ", firstSeason);
            fillSeasonSelect(firstSeason);
        }
    );
}

function fillSeasonSelect(firstSeason) {
    removeSeasonSelect();
    var seasonList = document.getElementById("seasonList");
    seasonList.options[0] = new Option("Select a season...");
    var count = 0;
    for (i = firstSeason; i < 2021; i++) {
        seasonList.options[count + 1] = new Option(i + "-" + (i + 1), i);
        count++;
    }
}

function removeSeasonSelect() {
    var seasonList = document.getElementById("seasonList");
    $("#seasonList").empty();
}

function getSeasonAverages(currentPlayer) {
    var season = $("#seasonList option:selected").text();
    var id = currentPlayer.data[0].id;
    console.log(season, id);
    if (season !== "Select a season...") {
        season = season.substring(0, 4);
        $.ajax(
            "https://www.balldontlie.io/api/v1/season_averages?season=" +
                season +
                "&player_ids[]=" +
                id
        ).done(function (data) {
            console.log("Players season averages: ", data);
            mapStatsToChart(data);
        });
    }
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
                        "rgba(255, 99, 132, 0.8)",
                        "rgba(54, 162, 235, 0.8)",
                        "rgba(255, 206, 86, 0.8)",
                        "rgba(75, 192, 192, 0.8)",
                        "rgba(153, 102, 255, 0.8)",
                        "rgba(255, 159, 64, 0.8)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 4,
                },
            ],
        },
        options: {
            animation: {
                onProgress: function (animation) {
                    ProgressEvent.value =
                        animation.animationObject.currentStep /
                        animation.animationObject.numSteps;
                },
            },
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
