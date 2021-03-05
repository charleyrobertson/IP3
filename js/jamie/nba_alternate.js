$(document).ready(function () {
  $("#playerSearch").keypress(function () {
    if ($(this).val().length > 4) {
      console.log("success");
      playerSearch();
      addValueToListGroup();
    }
  });
});

function playerSearch() {
  // Get the search value and replacing whitespace with '_'
  var search = $("#playerSearch").val();
  search = search.replace(/ /g, "_");
  console.log(search);

  $.ajax("https://www.balldontlie.io/api/v1/players?search=" + search).done(
    function (data) {
      addValueToListGroup(data);
    }
  );
}

function addValueToListGroup(data) {
  console.log(data);
  // Get last child of ul element
  var list = document.getElementById("list-settings-list").lastChild;
  
  for (i = 0; i > data.data.length; i++) {
    console.log(data.data[i].first_name);
  }
}
