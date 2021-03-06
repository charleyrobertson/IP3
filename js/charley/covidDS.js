$(document).ready(function () {
    $("#countryList").change(function () {
      var country = $("#countryList option:selected").val();
      console.log(country);
  
      var searchURL = "https://covid-api.mmediagroup.fr/v1/cases?country=" + country;
  
      $.getJSON(searchURL, function(results) {
        console.log(results);
  
        const data = {
          confirmed: results.All.confirmed,
          recovered: results.All.recovered,
          deaths: results.All.deaths,
          updated: results.All.updated
        }
  
        document.getElementById('ConfirmedCases').innerHTML += '<p>' + data.confirmed + '</p>';
        document.getElementById('RecoveryCases').innerHTML += '<p>' + data.recovered + '</p>';
        document.getElementById('Deaths').innerHTML += '<p>' + data.deaths + '</p>';
        document.getElementById('lastUpdated').innerHTML += '<p>' + data.updated + '</p>';
      })
  
    })
  
  })
  
  