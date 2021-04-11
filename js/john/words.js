$(document).ready(function () {
	//When the submit button is clicked the function runs.
	$("#submitButton").click(function () {
		//initializes the primary word, setting it as the value from the "significantWord" field.
		var primaryWord;
		primaryWord = document.getElementById("significantWord").value;

		//Checks if it's empty.
		if (primaryWord != null) {
			//Displays the word entered in the "apiReturn" field within a message.
			document.getElementById("apiReturn").innerHTML =
				"For reference, you chose: '" + primaryWord + "'";

			//Sets the URL to get the API data as the word entered by the user.
			var url = "https://wordsapiv1.p.rapidapi.com/words/" + primaryWord;
			const settings = {
				async: true,
				crossDomain: true,
				url: url,
				method: "GET",
				headers: {
					"x-rapidapi-key":
						"a654b2db95msh1c6ca0fca5ebd64p1752c3jsn452f27def07d",
					"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
				},
			};

			//Gets the data in response from the URL/API query
			$.ajax(settings).done(function (response) {
				console.log(response);

				var responseData,
					i,
					x = "";
				responseData = response;

				//Removes below attributes from the response.
				delete responseData.frequency;
				delete responseData.pronunciation;
				delete responseData.syllables;
				delete responseData.__proto__;

				//Gets the amount (length) of results within the response/query.
				var responseDataAmount = responseData.results.length;
				var defArray = new Array();
				var synLengthArray = new Array();

				//Runs the code an equal amount of times to the amount of definitions within the response.
				for (i = 0; i < responseDataAmount; i++) {
					const iterationDef = {
						definition: responseData.results[i].definition,
					};
					//Gets the current definition and turns it into a string variable.
					var definition = iterationDef.definition.toString();

					/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
					var defArray = defArray.concat(definition);

					//Dynamically creates an element on the HTML page that displays the definition alongside it's exact iteration number.
					const div = document.createElement("div");
					div.className = "row";
					div.innerHTML =
						"<h6><b>Definition No." +
						[i] +
						':</b></h6><br><p>"' +
						definition +
						'"</p>';
					document.getElementById("apiDef").appendChild(div);

					//Gets the synonyms associated with the current definition.
					const iterationSyn = {
						synonyms: responseData.results[i].synonyms,
					};

					//Sets the synCheck variable the current synonyms.
					//Then checks to see if there are any synonyms associated with this definition.
					var synCheck = iterationSyn.synonyms;
					if (synCheck !== undefined) {
						//Finds how many synonyms are associated with the definition.
						var defSynonymLength =
							responseData.results[i].synonyms.length;

						/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
						var synLengthInt = parseInt(defSynonymLength);
						var synLengthArray = synLengthArray.concat(
							synLengthInt
						);

						//Runs the following code for however many synonyms are associated with the definition.
						for (p = 0; p < defSynonymLength; p++) {
							//Gets the current/specific synonym in question.
							const specificSyn = {
								synonyms: responseData.results[i].synonyms[p],
							};

							//Dynamically creates an element on the HTML page that displays the specific synonym as a string alongside it's exact iteration number.
							var specSynonym = specificSyn.synonyms.toString();
							const div = document.createElement("div");
							div.className = "row";
							div.innerHTML =
								"<p>- <i>" + specSynonym + "</i></p>";
							document.getElementById("apiDef").appendChild(div);
						}
					} else {
						var synLengthArray = synLengthArray.concat(
							synLengthInt
						);
					}
					console.log(defArray);
					console.log(synLengthArray);
				}

				// function drawChart(socCode) {
				// 	var wfURL =
				// 		"http://api.lmiforall.org.uk/api/v1/wf/predict?soc=";
				// 	$.getJSON(wfURL + socCode, function (data) {
				// 		var chartData = {
				// 			labels: [],
				// 			datasets: [
				// 				{
				// 					label: "Predicted Employment",
				// 					data: [],
				// 				},
				// 			],
				// 		};

				// 		data.predictedEmployment.forEach(function (yearData) {
				// 			chartData.labels.push(yearData.year);
				// 			chartData.datasets[0].data.push(
				// 				yearData.employment
				// 			);
				// 		});

				// 		if (chart != null) {
				// 			chart.destroy();
				// 			chart = null;
				// 		}
				// 		chart = new Chart(ctx).Line(chartData);
				// 	});
				// }

				var chartData = {
					labels: [],
					datasets: [
						{
							label: "Some words",
							data: [],
						},
					],
				};

                // for(i=0; i<synLengthArray.length; i++) {
                //     chartData.datasets[i].data.push(synLengthArray[i]);
                //     console.log(chartData.datasets);
                // }
				synLengthArray.forEach(function (data) {
					chartData.datasets[0].data.push(data);
					console.log(chartData.datasets);
				});

				var data = {
					datasets: [
						{
							data: [24, 9],
							backgroundColor: [
								"#000000",
								"#3B5998",
								"#a6b1b7",
								"#1da1f2",
								"#bd081c",
							],
							// label: "Words & Synonyms:",
						},
					],
					labels: [defArray],
				};
				var ctx = $("#wordDefSynChart");
				new Chart(ctx, {
					data: data,
					type: "polarArea",
					options: {
						legend: {
							display: true,
						},
						scale: {
							display: true,
							y: {
								suggestedMin: 1,
								suggestedMax: 15,
							},
						},
					},
				});
			});
		}
	});
});
