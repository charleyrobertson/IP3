$(document).ready(function () {
    //API URL
    var URL = "https://restcountries.eu/rest/v2/"
  
    //Gets the JSON from the URL
    $.getJSON(URL, function (results) {
      
      //Test - console.log(results);
     
      //Puts the results into a const called allCountries
      const allCountries = results;

      //Loops for each value in allCountries
      for(i=0; i<allCountries.length; i++)
      {
          //Makes a variable of each country
        const country = {
            name: allCountries[i].name
        }

        if(country.name == "United States of America")
        {
          //Change country.name to "US"
          country.name = "US";

          displayCountries(country);

        }
        else 
        {
          displayCountries(country);
        }
          
     

      }


    });
    
  });
  
//Function displays each country as an option within a drop down list.
function displayCountries(country)
{
document.getElementById('countryList').innerHTML += '<option>' + country.name 
                                                     +    '</option>';

}

