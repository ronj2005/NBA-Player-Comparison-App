var team1Name = $("");
var team2Name = $("");
var team1ID = $("");
var team2ID = $("");
var team1Icon = $("");
var team2Icon = $("");
var searchBtn1 = $('#search-button1');
var searchBtn2 = $('#search-button2');

var card1 = $('#card1');
var card2 = $('#card2');

var statsCont1 = $('#stats-container');
var statsCont2 = $('#stats-container2');
var img1 = $('#player-image');
var img2 = $('#player-image2');

function curTime (){
    var today = moment().format("MMM DD, YYYY");
    console.log(today);
}

//save team id as key name and team tri code as value
fetch('https://data.nba.net/10s/prod/v2/2021/teams.json')
.then(function(response){
	return response.json();
})
.then(function(data){
	console.log(data);
	for(i = 0; i < 34; i++){
		localStorage.setItem(data.league.standard[i].teamId, data.league.standard[i].tricode);
	}
})

//searches for first player
searchBtn1.on('click',function(){
	statsCont1.html('');
	
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
		var statsArr = ['Field Goal ' + data.careerPercentageFieldGoal + '%', 'Freethrow ' + data.careerPercentageFreethrow + '%', 
		'Points ' + data.careerPoints, 'Assists ' + data.carrerAssists, 'Blocks ' + data.careerBlocks, 'Rebounds ' + data.careerRebounds];
		
		console.log(data.careerPercentageFieldGoal);
		console.log(data.careerPercentageFreethrow);
		console.log(data.careerPoints);
		console.log(data.carrerAssists);
		console.log(data.careerBlocks);
		console.log(data.careerRebounds);
			//************* */
			img1.attr('src', data.headShotUrl);
			var h1El = $('<h1>');
			h1El.text(data.firstName + ' ' +data.lastName);
			statsCont1.append(h1El);
				for(i = 0; i < statsArr.length; i++){;
			
					var pEl = $('<p>');
					pEl.text(statsArr[i]);
					statsCont1.append(pEl);
				}
			var btnEl = $('<button>');
			btnEl.addClass('primary align-center button').attr('type' , 'button').text('Add ' + data.position);
			statsCont1.append(btnEl);
			/******************** */
		//taking teamURL from team name to make it usable in up coming games API 
		var teamEl = data.team;
		console.log(teamEl);
		var n = teamEl.lastIndexOf(' ');
		var result = teamEl.substring(n + 1);
		console.log(result);
		getGameInfo(result);

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

		var statsArr = ['Field Goal ' + data.careerPercentageFieldGoal + '%', 'Freethrow ' + data.careerPercentageFreethrow + '%', 
		'Points ' + data.careerPoints, 'Assists ' + data.carrerAssists, 'Blocks ' + data.careerBlocks, 'Rebounds ' + data.careerRebounds];
		
		console.log(data.careerPercentageFieldGoal);
		console.log(data.careerPercentageFreethrow);
		console.log(data.careerPoints);
		console.log(data.carrerAssists);
		console.log(data.careerBlocks);
		console.log(data.careerRebounds);
			//************* */
			img2.attr('src', data.headShotUrl);
			var h1El = $('<h1>');
			h1El.text(data.firstName + ' ' +data.lastName);
			statsCont2.append(h1El);
				for(i = 0; i < statsArr.length; i++){;
				var pEl = $('<p>');
				pEl.text(statsArr[i]);
				statsCont2.append(pEl);
				}
				var btnEl = $('<button>');
				btnEl.addClass('primary align-center button').attr('type' , 'button').text('Add ' + data.position);
				statsCont2.append(btnEl);
		//upcoming games to be displayed
		console.log();
		var teamEl = data.team;
		console.log(teamEl);
		var n = teamEl.lastIndexOf(' ');
		var result = teamEl.substring(n + 1);
		console.log(result);
		getGameInfo2(result);

	})

})

//gets upcoming game for first player
function getGameInfo(playerTeam){

	fetch('http://data.nba.net/10s/prod/v1/2021/teams/' + playerTeam.toLowerCase() +'/schedule.json')
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		var nextGameNum;
		console.log(data);
		for(i = 0; i < 9; i++){
			console.log(data.league.standard[i].hTeam.score);
			if(data.league.standard[i].hTeam.score === ''){
				nextGameNum = i;
				//console.log(nextGameNum);
				//console.log(i);
				//console.log(data.league.standard[i].hTeam.score);
				break;
			}
		}
		//upcoming games info to be displayed
		console.log(data);
		console.log(data.league.standard[nextGameNum].hTeam.teamId);
		console.log(localStorage.getItem(data.league.standard[nextGameNum].hTeam.teamId));
		console.log(data.league.standard[nextGameNum].vTeam.teamId);
		console.log(localStorage.getItem(data.league.standard[nextGameNum].vTeam.teamId));
		console.log(data.league.standard[nextGameNum].startTimeEastern);
		console.log(data.league.standard[nextGameNum].startDateEastern);

			/******************** */
			//displaying card info
			var displayDate = moment(data.league.standard[nextGameNum].startDateEastern);
			$('#gameDay1').text(displayDate.format("MMM Do, YYYY") + ' ' 
			+ data.league.standard[nextGameNum].startTimeEastern);
			$('#hTeam1').text(localStorage.getItem(data.league.standard[nextGameNum].hTeam.teamId));
			$('#vTeam1').text(localStorage.getItem(data.league.standard[nextGameNum].vTeam.teamId));


			/*************************** */
	})
}

//gets upcoming game for second player
function getGameInfo2(playerTeam){
	
	fetch('http://data.nba.net/10s/prod/v1/2021/teams/' + playerTeam.toLowerCase() +'/schedule.json')
	.then(function(response){
		return response.json();
	})
	.then(function(data){
		var nextGameNum;
		console.log(data);
		for(i = 0; i < 9; i++){
			console.log(data.league.standard[i].hTeam.score);
			if(data.league.standard[i].hTeam.score === ''){
				nextGameNum = i;
				//console.log(nextGameNum);
				//console.log(i);
				//console.log(data.league.standard[i].hTeam.score);
				break;
			}
		}
		//upcoming games info to be displayed
		console.log(data);
		console.log(data.league.standard[nextGameNum].hTeam.teamId);
		console.log(localStorage.getItem(data.league.standard[nextGameNum].hTeam.teamId));
		console.log(data.league.standard[nextGameNum].vTeam.teamId);
		console.log(localStorage.getItem(data.league.standard[nextGameNum].vTeam.teamId));
		console.log(data.league.standard[nextGameNum].startTimeEastern);
		console.log(data.league.standard[nextGameNum].startDateEastern);
	})
}



//var today = moment('20211013');
//$('#gameDay1').text(today.format("MMM Do, YYYY"));

//var responseDate = moment(formatDate).format('MM/DD/YYYY');

//var test = moment().format('mmm');
//console.log(test);




