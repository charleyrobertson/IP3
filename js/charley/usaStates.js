//Not using this yet.
//========================

function displayDropDown()
{
  //== Extra Feature - IF USA is selected, allow them to view data BY state.
  var sURL = "https://gist.githubusercontent.com/mshafrir/2646763/raw/8b0dbb93521f5d6889502305335104218454c2bf/states_titlecase.json";
  $.getJSON(sURL, function (results) {
      
    //Test - console.log(results);
   
    //Puts the results into a const called allStates
    const allStates = results;

    //Loops for each value in allCountries
    for(i=0; i<allStates.length; i++)
    {
        //Makes a variable of each country
      const state = {
          name: allStates[i].name
      }   

      displayStates(state.name);
    }
  });
             

}
   //Function displays each country as an option within a drop down list.
   function displayStates(stateName)
   {
    document.getElementById('stateList').innerHTML += '<option>' + stateName
                                                +    '</option>';   
   }