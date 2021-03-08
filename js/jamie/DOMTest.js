// this function is required to automatically fire the JavaScript on page load
$(document).ready(function () {
  var seasonList = document.getElementById("seasonList");
  seasonList.options[0] = new Option("Select a season...", "0");
  seasonList.options[1] = new Option("2015-16", "");
  seasonList.options[2] = new Option("2016-17", "");
  seasonList.options[3] = new Option("2017-18", "");
  seasonList.options[4] = new Option("2018-19", "");
  seasonList.options[5] = new Option("2019-20", "");
  seasonList.options[6] = new Option("2020-21", "");

  var playerList = document.getElementById("playerList");
  playerList.options[0] = new Option("Select Player", "0");
  playerList.options[1] = new Option("Lebron James", "237");
  playerList.options[2] = new Option("James Harden", "192");

  populateTeamList();
  displaySeasonHeader();
  displayPlayerInfo();
  createPlayerTable();
  $.ajax("https://www.balldontlie.io/api/v1/players?team_ids[]=5").done(
    function (data) {
      console.log(data);
    }
  );
});

function populateTeamList() {
  $.ajax("https://www.balldontlie.io/api/v1/teams").done(function (data) {
    var teamList = document.getElementById("teamList");
    teamList.options[0] = new Option("Select a team...", "0");
    for (i = 0; i < data.data.length; i++) {
      teamList.options[i + 1] = new Option(
        data.data[i].full_name,
        data.data[i].id
      );
    }
  });
}

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

function displayPlayerInfo() {
  // Make and populate a table on player select
  $("#playerList").change(function () {
    var player = $("#playerList option:selected").text();
    if ($("#playerList option:selected").val() == 0) {
    } else {
      var div = document.createElement("div");
      var playerTitle = document.createElement("h1");
      playerTitle.innerHTML = player;
      $("#playerStats").append(playerTitle);

      // Create a table and add data from a returned json which containes season averages
    }
  });
}

function createPlayerTable() {
  // Create a table and add data from season averages json
  $.ajax(
    "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=237"
  ).done(function (data) {
    console.log(data);
  });
}

