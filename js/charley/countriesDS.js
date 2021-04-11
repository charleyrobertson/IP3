$(document).ready(function () {
    //API URL
    var URL = "https://raw.githubusercontent.com/M-Media-Group/country-json/master/src/countries-master.json";
  
    //Gets the JSON from the URL
    $.getJSON(URL, function (results) {
        
        console.log(results);

        //Loops for each value in results
        for(i=0; i<results.length; i++)
        {
            var countryTemp = results[i].country;

            console.log(countryTemp);
            displayCountries(countryTemp);
        }
     
     });
  });
  
  //Function displays each country as an option within a drop down list.
  function displayCountries(country) {
    document.getElementById("countryList").innerHTML +=
      "<option>" + country + "</option>";
  }
  