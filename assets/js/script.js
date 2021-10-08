var team1Name = $("");
var team2Name = $("");
var team1ID = $("");
var team2ID = $("");
var team1Icon = $("");
var team2Icon = $("");


function curTime (){
    var today = moment().format("MMM DD, YYYY");
    console.log(today);
}


function showCurGames () {

    var 
}

//Variables for gathering name of player that user inputed
var playerSearched1 = 'lebron james'//$('#userInput').val();
var searchBtn1 = $('#search-button1');
var searchBtn2 = $('#search-button2');
var playerSearched2 = 'trae young'//$('#userInput2').val();

/*This replace the space ' ' when user searches for a player with an underscore '_'. 
This is being done because the api call requires an underscore between the first and last name */
playerSearched1 = playerSearched1.replace(/ /g, '_');
playerSearched2 = playerSearched2.replace(/ /g, '_');

/*
var test = 'lebron james';
console.log(test);
test = test.replace(/ /g, '_');
console.log(test);
*/

//api call for first player
fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=" + playerSearched1, {
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
		console.log(data);

	})
//api call for second player
    fetch("https://nba-player-individual-stats.p.rapidapi.com/players/fullname?name=" + playerSearched2, {
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
		console.log(data);
	})