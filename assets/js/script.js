
var searchBtn1 = $('#search-button1');
var searchBtn2 = $('#search-button2');

var card1 = $('#card1');
var card2 = $('#card2');

var statsCont1 = $('#stats-container');
var statsCont2 = $('#stats-container2');
var gameCont1 = $('#game-container1');
var gameCont2 = $('#game-container2');

var img1 = $('#player-image');
var img2 = $('#player-image2');
var teamArr = [];

if(JSON.parse(localStorage.getItem('savedTeams')) === null){
	teamArr = [];
}else {
	teamArr = JSON.parse(localStorage.getItem('savedTeams'));
}
console.log(teamArr);



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
			$('#pos1').text(data.position);
			$('#height1').text(data.height);
			$('#player-number1').text(data.jerseyNumber);
			$('#team1').text(data.team);
			var h1El = $('<h1>');
			h1El.text(data.firstName + ' ' +data.lastName);
			statsCont1.append(h1El);
				for(i = 0; i < statsArr.length; i++){;
			
					var pEl = $('<p>');
					pEl.text(statsArr[i]);
					statsCont1.append(pEl);
				}
			var btnEl = $('<button>');
			btnEl.addClass('primary button').addClass('addBtn').attr('id', data.position).text('Add ' + data.position);
			statsCont1.append(btnEl);
			/******************** */
		//taking teamURL from team name to make it usable in up coming games API 
		var teamEl = data.team;
		console.log(teamEl);
		var n = teamEl.lastIndexOf(' ');
		var result = teamEl.substring(n + 1);
		console.log(result);
		getGameInfo(result);

		$('#card1').on('click', function(event){
			event.preventDefault();
			var element = event.target;
			var position;
			console.log(element);
			if(element.matches('button') === true){
				position = element.getAttribute('id');
				console.log(position);
				console.log(data.headShotUrl);
				if(position === 'Small Forward'){
					$('#small-forward').attr('src', data.headShotUrl);
					$('#sf-text').text('SF: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if (position === 'Point Guard'){
					$('#point-guard').attr('src', data.headShotUrl);
					$('#pg-text').text('PG: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if(position === 'Center'){
					$('#center').attr('src', data.headShotUrl);
					$('#c-text').text('C: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if(position === 'Shooting Guard'){
					$('#shooting-guard').attr('src', data.headShotUrl);
					$('#sg-text').text('SG: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if(position === 'Power Forward'){
					$('#power-forward').attr('src', data.headShotUrl);
					$('#pf-text').text('PF: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				}
			}
		})
	})
});

//searches for second player
searchBtn2.on('click', function(){
    console.log('test');

    statsCont2.html('');
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
			$('#player-number2').text(data.jerseyNumber);
			$('#pos2').text(data.position);
			$('#height2').text(data.height);
			$('#team2').text(data.team);
			var h1El = $('<h1>');
			h1El.text(data.firstName + ' ' +data.lastName);
			statsCont2.append(h1El);
				for(i = 0; i < statsArr.length; i++){;
				var pEl = $('<p>');
				pEl.text(statsArr[i]);
				statsCont2.append(pEl);
				}
				var btnEl = $('<button>');
				btnEl.addClass('primary button').addClass('addBtn').attr('id', data.position).text('Add ' + data.position);
				statsCont2.append(btnEl);
		//upcoming games to be displayed
		console.log();
		var teamEl = data.team;
		console.log(teamEl);
		var n = teamEl.lastIndexOf(' ');
		var result = teamEl.substring(n + 1);
		console.log(result);
		getGameInfo2(result);

		$('#card2').on('click', function(event){
			event.preventDefault();
			var element = event.target;
			var position;
			console.log(element);
			if(element.matches('button') === true){
				position = element.getAttribute('id');
				console.log(position);
				console.log(data.headShotUrl);
				if(position === 'Small Forward'){
					$('#small-forward').attr('src', data.headShotUrl);
					$('#sf-text').text('SF: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if (position === 'Point Guard'){
					$('#point-guard').attr('src', data.headShotUrl);
					$('#pg-text').text('PG: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if(position === 'Center'){
					$('#center').attr('src', data.headShotUrl);
					$('#c-text').text('C: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if(position === 'Shooting Guard'){
					$('#shooting-guard').attr('src', data.headShotUrl);
					$('#sg-text').text('SG: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				} else if(position === 'Power Forward'){
					$('#power-forward').attr('src', data.headShotUrl);
					$('#pf-text').text('PF: ' + data.firstName.toUpperCase() + ' ' + data.lastName.toUpperCase());
				}
			}
		})

	})

})

//gets upcoming game for first player
function getGameInfo(playerTeam){
	gameCont1.html('');
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
			/*$('#gameDay1').text(displayDate.format("MMM Do, YYYY") + ' ' 
			+ data.league.standard[nextGameNum].startTimeEastern);
			$('#hTeam1').text(localStorage.getItem(data.league.standard[nextGameNum].hTeam.teamId));
			$('#vTeam1').text(localStorage.getItem(data.league.standard[nextGameNum].vTeam.teamId));*/
			
			//var gameContainer = $('<div>');
			
			var h3El = $('<h3>');
			var h2El =$('<h5>');
			var h4Home = $('<h4>');
			var h4Vis = $('<h4>');
			gameCont1.addClass('game-container');
			//$('game-container').html('');
			h3El.text('Upcoming Game');
			h2El.text(displayDate.format("MMM Do, YYYY") + ' ' 
			+ data.league.standard[nextGameNum].startTimeEastern);
			h4Home.text(localStorage.getItem(data.league.standard[nextGameNum].hTeam.teamId) + " @ " ).append('\xa0');
			h4Vis.text(localStorage.getItem(data.league.standard[nextGameNum].vTeam.teamId));

			//card1.append(gameContainer);
			gameCont1.append(h3El);
			gameCont1.append(h2El);
			gameCont1.append(h4Home);
			gameCont1.append(h4Vis);


			/*************************** */
	})
}

//gets upcoming game for second player
function getGameInfo2(playerTeam){
	gameCont2.html('');
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
		
			
			var h3El = $('<h3>');
			var h2El =$('<h5>');
			var h4Home = $('<h4>');
			var h4Vis = $('<h4>');
			gameCont2.addClass('game-container');
			//$('game-container').html('');
			h3El.text('Upcoming Game');
			h2El.text(displayDate.format("MMM Do, YYYY") + ' ' 
			+ data.league.standard[nextGameNum].startTimeEastern);
			h4Home.text(localStorage.getItem(data.league.standard[nextGameNum].hTeam.teamId) + " @ " ).append('\xa0');
			h4Vis.text(localStorage.getItem(data.league.standard[nextGameNum].vTeam.teamId));

			//card1.append(gameContainer);
			gameCont2.append(h3El);
			gameCont2.append(h2El);
			gameCont2.append(h4Home);
			gameCont2.append(h4Vis);

			/*************************** */
	})
}

$('#save-roster-button').on('click', function(){
    console.log('sdfasdf');
    var rosterObj = {
        pg: $('#pg-text').text(),
		sg: $('#sg-text').text(),
		pf: $('#pf-text').text(),
		sf: $('#sf-text').text(),
		c:  $('#c-text').text(),
        pgImg:$('#point-guard').attr('src'),
        sgImg:$('#shooting-guard').attr('src'),
        pfImg:$('#power-forward').attr('src'),
        sfImg:$('#small-forward').attr('src'),
        cImg: $('#center').attr('src'),
    };
    console.log(rosterObj.pg);
    localStorage.setItem($('#user-roster-input').val(),JSON.stringify(rosterObj));

	
	teamArr.push($('#user-roster-input').val());
	console.log(teamArr);
	localStorage.setItem('savedTeams', JSON.stringify(teamArr));
	generateDiv($('#user-roster-input').val());
	
	

})


function generateDiv(savedTeamName){
	var obj = JSON.parse(localStorage.getItem(savedTeamName));
	console.log(obj);
	console.log(obj.pg);

	var teamRoster = Object.values(obj);
	console.log(teamRoster);
	console.log(teamRoster[1]);
	//var imgIdArr = ['pg1', 'sg1', 'pf1', 'sf1', 'c1'];
	//var pIdArr = ['pgT1', 'sgT1', 'pfT1', 'sfT1', 'cT1'];	

	var divContainer = $('<div>');
	divContainer.attr('id', 'player-map-container');
	divContainer.insertAfter('#player-map-container');
	var h3El = $('<h3>');
	h3El.attr('style', 'width:100%').text(savedTeamName);
	divContainer.append(h3El);
	for(i = 0; i < 5; i++){
		var divPlayerCard = $('<div>');
		divPlayerCard.addClass('player-card');
		divContainer.append(divPlayerCard);
			
			var imgEl = $('<img>');
			var divText = $('<div>');
			imgEl.attr('src', teamRoster[i + 5]);
			
			divPlayerCard.append(imgEl);
			divPlayerCard.append(divText);
				
				var pEl = $('<p>');
				pEl.text(teamRoster[i])
				divText.append(pEl);
}
}

function displaySavedTeams(){
	
	var recallArr = JSON.parse(localStorage.getItem('savedTeams'));
	
	if(recallArr === null){
		return;
	}else{
	for(j = 0; j < recallArr.length; j++){
		console.log(j);
		generateDiv(recallArr[j]);
		console.log(j);
	}}
	
}

displaySavedTeams();

var emailSubmit = document.querySelector("#btnInsert");
var userEmail = document.querySelector("#user-email");
emailSubmit.addEventListener('click', function() {
    var email = userEmail.value;
    console.log(email);
    if (email) {
        localStorage.setItem('email', email);
    }
    // console.log(localStorage.getItem('email'));
});

var startDraft = document.querySelector(".start-button");
startDraft.addEventListener("click", draftTimer);


function draftTimer() {
    var timer = 60 * 5, minutes, seconds;
    console.log("Is clicked")
    var buzz = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.querySelector('#time').textContent = minutes + ":" + seconds;
        if(--timer === 0){
			clearInterval(buzz);
			$('#time').text("00:00");
		}
    }, 1000);

}





