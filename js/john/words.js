$(document).ready(function () {
    $('#submitButton').click(function (){
        var primaryWord;
        primaryWord = document.getElementById("significantWord").value;
        if (primaryWord != null )
        {
            document.getElementById("apiReturn").innerHTML = "For reference, you chose: '" +primaryWord + "'";
            
            var url = "https://wordsapiv1.p.rapidapi.com/words/"+primaryWord;
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": url,
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "???",
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
                }
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                
                var responseData, i, x="";
                responseData = response

                delete responseData.frequency;
                delete responseData.pronunciation;
                delete responseData.syllables;
                delete responseData.__proto__;

                var responseDataAmount = responseData.results.length;
                for(i=0; i<responseDataAmount; i++)
                {
                    const iterationDef = {
                        definition: responseData.results[i].definition
                    }
                    //console.log(iterationDef);

                    var definition = iterationDef.toString();
                    const div = document.createElement('div');
                    div.className = 'row';
                    div.innerHTML = '<h6>Definition:</h6><br><p>'+definition+'</p>';
                    document.getElementById('apiDef').appendChild(div);

                    const iterationSyn = {
                        synonyms: responseData.results[i].synonyms
                    }
                    var defSynonymLength = responseData.results[i].synonyms.length;
                    for(p=0; p<defSynonymLength; p++){
                        const specificSyn = {
                            synonyms: responseData.results[i].synonyms[p]
                        }
                        //console.log(specificSyn);
                    }
                    //console.log("-----------");

                    
                }
            });
        }
    })
});
