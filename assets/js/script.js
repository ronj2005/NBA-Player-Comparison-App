var team1Name = $("");
var team2Name = $("");
var team1ID = $("");
var team2ID = $("");
var team1Icon = $("");
var team2Icon = $("");
var searchBtn1 = $('#search-button1');
var searchBtn2 = $('#search-button2');

function curTime (){
    var today = moment().format("MMM DD, YYYY");
    console.log(today);
}


//searches for first player
searchBtn1.on('click',function(){

	
	var playerSearched = $('#userInput').val();
	//the following adds an underscore in between first and last name as this is required for the api call
	playerSearched = playerSearched.replace(/ /g, '_');


	fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=" + playerSearched, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
			"x-rapidapi-key": "e96cae7e0emsh367bede2289dbf8p17f735jsnd4de50f05e76"
		}
	})
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		//card info to be displayed 
		console.log(data);
		console.log(data.age);
		console.log(data.firstName + ' ' +data.lastName);
		console.log(data.position);
		console.log(data.team);
		console.log(data.jerseyNumber);
		console.log(data.headShotUrl);
		//stats to be displayed
		console.log(data.careerPercentageFieldGoal);
		console.log(data.careerPercentageFreethrow);
		console.log(data.careerPoints);
		console.log(data.carrerAssists);
		console.log(data.careerBlocks);
		console.log(data.careerRebounds);

	})
}); 

//searches for second player
searchBtn2.on('click', function(){
	var playerSearched = $('#userInput2').val();
	playerSearched = playerSearched.replace(/ /g, '_');
	fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=" + playerSearched, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "nba-player-individual-stats.p.rapidapi.com",
			"x-rapidapi-key": "e96cae7e0emsh367bede2289dbf8p17f735jsnd4de50f05e76"
		}
	})
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		//card info to be displayed 
		console.log(data);
		console.log(data.age);
		console.log(data.firstName + ' ' +data.lastName);
		console.log(data.position);
		console.log(data.team);
		console.log(data.jerseyNumber);
		console.log(data.headShotUrl);
		//stats to be displayed
		console.log(data.careerPercentageFieldGoal);
		console.log(data.careerPercentageFreethrow);
		console.log(data.careerPoints);
		console.log(data.carrerAssists);
		console.log(data.careerBlocks);
		console.log(data.careerRebounds);

	})

})





