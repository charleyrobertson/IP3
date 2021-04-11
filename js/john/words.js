$(document).ready(function () {
    //When the submit button is clicked the function runs.
    $('#submitButton').click(function (){
        //initializes the primary word, setting it as the value from the "significantWord" field.
        var primaryWord;
        primaryWord = document.getElementById("significantWord").value;

        //Checks if it's empty.
        if (primaryWord != null)
        {
            //Displays the word entered in the "apiReturn" field within a message.
            document.getElementById("apiReturn").innerHTML = "For reference, you chose: '" +primaryWord + "'";
            
            //Sets the URL to get the API data as the word entered by the user.
            var url = "https://wordsapiv1.p.rapidapi.com/words/"+primaryWord;
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "a654b2db95msh1c6ca0fca5ebd64p1752c3jsn452f27def07d",
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
                }
            };

            //Gets the data in response from the URL/API query
            $.ajax(settings).done(function (response) {
                console.log(response);
                
                var responseData, i, x="";
                responseData = response

                //Removes below attributes from the response.
                delete responseData.frequency;
                delete responseData.pronunciation;
                delete responseData.syllables;
                delete responseData.__proto__;

                //Gets the amount (length) of results within the response/query. 
                var responseDataAmount = responseData.results.length;

                for(i=0; i<responseDataAmount; i++){
                    const iterationDef = {
                        definition: responseData.results[i].definition
                    }

                    var definition = iterationDef.definition.toString();

                    const div = document.createElement('div');
                    div.className = 'row';
                    div.innerHTML = '<h6><b>Definition No.'+[i]+':</b></h6><br><p>"'+definition+'"</p>';
                    document.getElementById('apiDef').appendChild(div);

                    const iterationSyn = {
                        synonyms: responseData.results[i].synonyms
                    }

                    var synCheck = iterationSyn.synonyms;
                    if (synCheck !== undefined){

                        var defSynonymLength = responseData.results[i].synonyms.length;
                        for(p=0; p<defSynonymLength; p++){
                            const specificSyn = {
                                synonyms: responseData.results[i].synonyms[p]
                            }

                            var specSynonym = specificSyn.synonyms.toString();
                            const div = document.createElement('div');
                            div.className = 'row';
                            div.innerHTML = '<p>- <i>'+specSynonym+'</i></p>';
                            document.getElementById('apiDef').appendChild(div);
                        }
                    }
                }
            });
        }
    })
});
