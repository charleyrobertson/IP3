const settings = {
  async: true,
  crossDomain: true,
  url: "https://api-nba-v1.p.rapidapi.com/teams/players/teamId/",
  method: "GET",
  headers: {
    "x-rapidapi-key": "",
    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
  },
};

// function is required to automatically fire the JavaScript on page load
$(document).ready(function () {
  // Filling first two dropdown lists with static data
  // fullName: teamId:
  var list = document.getElementById("teamList");

  list.options[0] = new Option("Atlanta Hawks", "1");
  list.options[1] = new Option("Boston Celtics", "2");
  list.options[2] = new Option("Brooklyn Nets", "4");
  list.options[3] = new Option("Charlotte Hornets", "5");
  list.options[4] = new Option("Chicago Bulls", "6");
  list.options[5] = new Option("Cleveland Cavaliers", "7");
  list.options[6] = new Option("Dallas Mavericks", "8");
  list.options[7] = new Option("Denver Nuggets", "9");
  list.options[8] = new Option("Detroit Pistons", "10");
  list.options[9] = new Option("Golden State Warriors", "11");
  list.options[10] = new Option("Houston Rockets", "14");
  list.options[11] = new Option("Indiana Pacers", "15");
  list.options[12] = new Option("LA Clippers", "16");
  list.options[13] = new Option("Los Angeles Lakers", "17");
  list.options[14] = new Option("Memphis Grizzlies", "19");
  list.options[15] = new Option("Miami Heat", "20");
  list.options[16] = new Option("Milwaukee Bucks", "21");
  list.options[17] = new Option("Minnesota Timberwolves", "22");
  list.options[18] = new Option("New Orleans Pelicans", "23");
  list.options[19] = new Option("New York Knicks", "24");
  list.options[20] = new Option("Oklahoma City Thunder", "25");
  list.options[21] = new Option("Orlando Magic", "26");
  list.options[22] = new Option("Philadelphia 76ers", "27");
  list.options[23] = new Option("Phoenix Suns", "28");
  list.options[24] = new Option("Portland Trail Blazers", "29");
  list.options[25] = new Option("Sacramento Kings", "30");
  list.options[26] = new Option("San Antonia Spurs", "31");
  list.options[27] = new Option("Toronto Raptors", "38");
  list.options[28] = new Option("Utah Jazz", "40");
  list.options[29] = new Option("Washington Wizards", "41");

  // Seasons on rapid api are from 2015 onwards
  var seasonList = document.getElementById("seasonList");
  seasonList.options[0] = new Option("2015-16", "");
  seasonList.options[1] = new Option("2016-17", "");
  seasonList.options[2] = new Option("2017-18", "");
  seasonList.options[3] = new Option("2018-19", "");
  seasonList.options[4] = new Option("2019-20", "");
  seasonList.options[5] = new Option("2020-21", "");

  getPlayers();
});

function getPlayers() {
  // Populate player search on select action
  $("#teamList").change(function () {
    // Get team id from select and append to API url
    var teamID = $("#teamList option:selected").val();
    settings.url = "https://api-nba-v1.p.rapidapi.com/players/teamId/" + teamID;

    $.ajax(settings).done(function (data) {
      var playerList = document.getElementById("playerList");
      console.log(data);

      // Uses players first + last names as text, and playerId as value for select list
      for (i = 0; i < data.api.players.length; i++) {
        playerList.options[i] = new Option(
          data.api.players[i].firstName + " " + data.api.players[i].lastName,
          data.api.players[i].playerId
        );
      }
    });
  });

  settings.url =
    "https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/92";
  $.ajax(settings).done(function (data) {
    console.log(data);
  });
}
