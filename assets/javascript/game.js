//////////////////////////////////////////////////////////////////////////////////////
// Declaring variables
//////////////////////////////////////////////////////////////////////////////////////

// Game Parameter
//////////////////////////////////////////////////////

var userChar = "";
var enemyChar = "";

var luke = {
	name: "luke",
	HP:50,
	SP:80,
	pic: "assets/images/luke.jpg",
	fightPic: "assets/images/lukeFight.png"
}

var vader = {
	name: "vader",
	HP:100,
	SP:100,
	pic: "assets/images/vader.jpg",
	fightPic: "assets/images/vaderFight.png"
}

var palpatine = {
	name: "palpatine",
	HP:450,
	SP:130,
	pic: "assets/images/palpatine.jpg",
	fightPic: "assets/images/palpatineFight.png"
}


var obiwan = {
	name: "obiwan",
	HP:700,
	SP:100,
	pic: "assets/images/obiwan.jpg",
	fightPic: "assets/images/obiwanFight.png"
}

var maul = {
	name: "maul",
	HP:500,
	SP:100,
	pic: "assets/images/maul.png",
	fightPic: "assets/images/maulFight.png"
}

var windu = {
	name: "windu",
	HP:700,
	SP:100,
	pic: "assets/images/windu.jpg",
	fightPic: "assets/images/winduFight.png"
}


var allCharObj = {
	luke: luke,
	obiwan: obiwan,
	windu: windu,
	palpatine: palpatine,
	vader: vader,
	maul: maul,
}
var allChar = [obiwan,luke,windu,palpatine,vader,maul];


//////////////////////////////////////////////////////////////////////////////////////
// Stylizing Functions
//////////////////////////////////////////////////////////////////////////////////////


// Display damage dealt
//////////////////////////////////////////////////////

var damage;

function damageDisplay(damage,userChar){
	var div = $("<div>")
	div.addClass("damageDisplay");
	div.text(damage);
	targetProfile = '.'+userChar+'_Pic';
	$(targetProfile).append(div);
	$(".damageDisplay").fadeOut("slow",function() { $(this).remove(); })
	
}

// Display attack arts
//////////////////////////////////////////////////////

var imgName;

function damageArt(imgName,userChar){
      var img = document.createElement("img");
      img.className = imgName;
      img.src = "assets/images/"+imgName+".png";
      targetProfile = '.'+userChar+'_Pic';
      $(targetProfile).append(img);
      $("."+imgName).fadeOut("slow",function() { $(this).remove(); })
}

// Play attack sounds
//////////////////////////////////////////////////////

var audiofile;

function attackSound(audiofile){
    var audio = document.createElement("audio");
    audio.id = audiofile;
    audio.src = "assets/audio/"+audiofile+".mp3";
    audio.addEventListener("ended", function () {
        $('#'+audiofile).remove();
    }, false);
    audio.play();   
    
}

// Set fading animation
//////////////////////////////////////////////////////

function fadeOutEffect(target) {
    var fadeTarget = document.getElementById(target);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity){
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity < 0.1) {
            clearInterval(fadeEffect);
        } else {
            fadeTarget.style.opacity -= 0.1;
        }
    }, 100);
    fadeTarget.style.opacity = '';
}


// Give a pause between each functions
//////////////////////////////////////////////////////

$.fn.timedDisable = function(time) {
    if (time == null) { time = 3000; }
    return $(this).each(function() {
        $(this).attr('disabled', 'disabled');
        var disabledElem = $(this);
        setTimeout(function() {
            disabledElem.removeAttr('disabled');
        }, time);
    });
};

// 
//////////////////////////////////////////////////////

// 
//////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////
// Attacks Functions
//////////////////////////////////////////////////////////////////////////////////////

// Saber attack when click on button
//////////////////////////////////////////////////////

function saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy){

	var saberArray = damageArray(saber,20,60);
	var damage = saberArray[Math.floor(Math.random() * saberArray.length)];

	var userInitialHP = userChar.HP;
	var userInitialSP = userChar.SP;
	
	var enemyInitialHP = enemyChar.HP;
	var enemyInitialSP = enemyChar.SP;

	if(turn === 1){

		if (startingStatUser[1] < userInitialSP){startingStatUser[1] += 3}

		startingStatEnemy[0] -= damage;

		$('#enemyChar_health').html("HP:   "+ startingStatEnemy[0]);// console.log(+startingStatEnemy[0] +" "+currentEnemy + " " + damage)
		$('#userChar_stamina').html("SP:   "+ startingStatUser[1]); 		
		attackSound("clash");
		damageDisplay(damage,"enemyChar")
            damageArt("slashesD4","enemyChar")           
	}

	if(turn === 2){

		if (startingStatEnemy[1] < userInitialSP){startingStatEnemy[0] += 3}
		startingStatUser[0] -= damage;

		$('#userChar_health').html("HP:   "+ startingStatUser[0]); 
		$('#enemyChar_stamina').html("SP:   "+ startingStatEnemy[1]); 
		attackSound("clash");
		damageDisplay(damage,"userChar")
            damageArt("slashesD4","userChar")           		
	}

	checkHP(startingStatUser,startingStatEnemy)

}

// Force Throw attack when click on button
//////////////////////////////////////////////////////

function forceThrow(userChar,enemyChar,startingStatUser,startingStatEnemy){

	var forceThrowArray = damageArray(forceThrow,100,200);
	var damage = forceThrowArray[Math.floor(Math.random() * forceThrowArray.length)];

	var userInitialHP = userChar.HP;
	var userInitialSP = userChar.SP;
	
	var enemyInitialHP = enemyChar.HP;
	var enemyInitialSP = enemyChar.SP;

	if(turn === 1){

		if (startingStatUser[1] < 13){
			saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy);
			alert("Not Enough SP")
 			return;
 		}

 		startingStatUser[1] -= 13;	
		startingStatEnemy[0] -= damage;

		$('#enemyChar_health').html("HP:   "+ startingStatEnemy[0]);// console.log(+startingStatEnemy[0] +" "+currentEnemy + " " + damage)
		$('#userChar_stamina').html("SP:   "+ startingStatUser[1]); 		
		attackSound("force1");
		damageDisplay(damage,"enemyChar")
            console.log('#'+enemyChar.name);
            $('.enemyChar_Pic').effect('shake');
	}

	if(turn === 2){

		if (startingStatEnemy[1] < 13){
			saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy);
 			return;
 		}

 		startingStatEnemy[1] -= 13;	
		startingStatUser[0] -= damage;

		$('#userChar_health').html("HP:   "+ startingStatUser[0]); 
		$('#enemyChar_stamina').html("SP:   "+ startingStatEnemy[1]); 
		attackSound("force1");
		damageDisplay(damage,"userChar")
            $('.userChar_Pic').effect('shake');	
	}

	checkHP(startingStatUser,startingStatEnemy)

}

// brawls attack when click on button
//////////////////////////////////////////////////////

function brawls(userChar,enemyChar,startingStatUser,startingStatEnemy){
	
	var brawlsArray = damageArray(brawls,1,30);
	var damage = brawlsArray[Math.floor(Math.random() * brawlsArray.length)];

	var userInitialHP = userChar.HP;
	var userInitialSP = userChar.SP;
	
	var enemyInitialHP = enemyChar.HP;
	var enemyInitialSP = enemyChar.SP;

	if(turn === 1){

		if (startingStatUser[1] < 3){damage = 0;damageDisplay(damage,"enemyChar");return;}
		startingStatUser[1] -= 3;
		startingStatEnemy[0] -= damage;

		$('#enemyChar_health').html("HP:   "+ startingStatEnemy[0]);// console.log(+startingStatEnemy[0] +" "+currentEnemy + " " + damage)
		$('#userChar_stamina').html("SP:   "+ startingStatUser[1]); 		
	
		damageDisplay(damage,"enemyChar")
        damageArt("redslash","enemyChar")

	}

	if(turn === 2){

		if (startingStatEnemy[1] < 3){damage = 0}

		startingStatEnemy[1] -= 3;
		startingStatUser[0] -= damage;

		$('#userChar_health').html("HP:   "+ startingStatUser[0]); 
		$('#enemyChar_stamina').html("SP:   "+ startingStatEnemy[1]); 
	      damageDisplay(damage,"enemyChar")
            damageArt("redslash","userChar")
	}

	checkHP(startingStatUser,startingStatEnemy)

}

//Random enemy attack generator
//////////////////////////////////////////////////////

function randAttacks(userChar,enemyChar,startingStatUser,startingStatEnemy){

	var ind = Math.floor(Math.random() * 100) + 1;
	if(ind < 15){
	 	forceThrow(userChar,enemyChar,startingStatUser,startingStatEnemy);
	 }
	if(ind >= 17 && ind <= 97){
		saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy);
	} 
	if(ind >97){

		time = 500;
		attackSound("Saber sequence");

		for(i = 0; i <=10 ;i++){
			setTimeout(function () {

				turn = 1;
				brawls(userChar,enemyChar,startingStatUser,startingStatEnemy);

				turn = 2; 
				brawls(userChar,enemyChar,startingStatUser,startingStatEnemy)
				},time);

			time +=500;
		}
	}	
}


//////////////////////////////////////////////////////////////////////////////////////
// Game Mechanics Functions
//////////////////////////////////////////////////////////////////////////////////////


// Generating damage array
//////////////////////////////////////////////////////

function damageArray(list,lowEnd,highEnd){
	var list =[];
	for (var i = lowEnd; i <= highEnd; i++) {
	    list.push(i);
	}
	return list;
}


// Pick random index and splice it from array
//////////////////////////////////////////////////////

function rand(myArray){
	var ind = Math.floor(Math.random() * myArray.length);
	var element = myArray[ind];
	myArray.splice(ind,1); // remove element from array so it doesnt show up twice
	return element;
}

// Checking HP of characters
//////////////////////////////////////////////////////

function checkHP(startingStatUser,startingStatEnemy){
	if(startingStatUser[0] < 0){lose(); return}
	if(startingStatEnemy[0] < 0){win(); return }
}

// Win functions if enemy health is zero
//////////////////////////////////////////////////////

function win(){
	alert("won!")
}

// Lose functions if user health is zero
//////////////////////////////////////////////////////

function lose(){
	alert("lose!")
}

// Defeated all opponents
//////////////////////////////////////////////////////

function finished(){

}


//////////////////////////////////////////////////////////////////////////////////////
// Start Screen Layouts
//////////////////////////////////////////////////////////////////////////////////////

function start(allChar,allCharObj){
	var startScreen = '<div class="col-lg-12 game" id="start">'    
		   +'<button type="button" id="startBtn">Start</button>'
		   +'</div>';

	$(".gameContainer").html(startScreen);
}

$( document ).ready(function(){

	start();
	$("#startBtn").click(function(){
		CharScreen();
	})

});

//////////////////////////////////////////////////////////////////////////////////////
// Character Selection Screen
//////////////////////////////////////////////////////////////////////////////////////

function CharScreen(){

// Replacing background music
//////////////////////////////////////////////////////

	$("#background").remove();
	$("body").prepend('<audio controls autoplay hidden loop id="background">'
		+'<source src="assets/audio/attack.mp3">'
		+ '</audio>');


// Empty out game section
//////////////////////////////////////////////////////

	var gameSect = $(".game");	
		gameSect.attr("id","charScreen")
		gameSect.empty();

// Setting charaters selection variable
//////////////////////////////////////////////////////

	var userChar =[];
	var enemyChar =[];
	var time = 500;

// Generating characters profile
//////////////////////////////////////////////////////

	function charactersProfile(){
		for(i = 0; i < allChar.length; i++){
			var  profContainer = $('<div>');
			profContainer.addClass("profContainer");
			var  profile = $('<img>');
			var	char = allChar[i];
			var img = char.pic;
			profile.attr("src",img);
			profile.attr("id",allChar[i].name);
			profile.addClass("profile");
			profContainer.append(profile);
			gameSect.append(profContainer);
		}

	  	chooseBtn = '<button type="button" id="chooseBtn">Choose Your Fighter!</button>';
		$("#charScreen").append(chooseBtn); 
	}

	charactersProfile();

// Characters selection
//////////////////////////////////////////////////////////////////////////////

	click = 1;

	$(".profile").click(function(){

// 1st Click select user character
//////////////////////////////////////////////////////

		if(click <= 2){
			if(userChar.length + enemyChar.length === 0){
	  			$(this).parent().css('box-shadow', '0px 0px 30px white');
	  			$(this).parent().css('border', '2px solid green');
	  			$(this).css('opacity', '1');   		
	   			$(this).attr('role','userChar');

	  			userChar.push(allCharObj[this.id]);

	  			$("#chooseBtn").remove();
	  			chooseBtn = '<button type="button" id="chooseBtn">Choose Your Opponent!</button>';
				$("#charScreen").append(chooseBtn); 
			}

// 2nd click select opponent character
//////////////////////////////////////////////////////

			else {
				if(userChar.length + enemyChar.length === 2){return};
				$(this).parent().css('box-shadow', '0px 0px 30px white');
	  			$(this).parent().css('border', '2px solid red');
	  			$(this).css('opacity', '1');   	
	  			$(this).attr('role','enemyChar');

	  			enemyChar.push(allCharObj[this.id]);

  				$("#chooseBtn").remove();
				fightBtn = '<button type="button" id="fightBtn">Fight</button>';
				$("#charScreen").append(fightBtn); 
			}
		}

// Ready to go to fight screen
//////////////////////////////////////////////////////

		// if(click >= 3){
		// 	console.log(userChar[0].name + " " + this.id)
		// 	if(userChar[0].name === this.id || enemyChar[0].name === this.id){
		// 		var target= '#'+this.id;
		// 		$(this.id).removeAttr('style');
		// 		//$(this).parent().css('background', 'rgba(0,0,0,0.5)');
		// 	}
		// }

		if(click <= 2){click++}
		else{click =1};			

		$("#fightBtn").click(function(){
			fight(userChar,enemyChar)
		})
	
	})
}

//////////////////////////////////////////////////////////////////////////////////////
// Initializing Fight Screen
//////////////////////////////////////////////////////////////////////////////////////

// Initializing screen
//////////////////////////////////////////////////////

function fight(userChar,enemyChar){
	$("#background").remove();
	var gameSect = $(".game");	
	gameSect.attr("id","fightScreen")
	gameSect.empty();
	options=[];
	attackSound("saberOn");
	setTimeout(function () {
			attackSound("saberOn")
		},750)	

// setting roles variables
//////////////////////////////////////////////////////

	var currentFight =[userChar[0],options,enemyChar[0]];
	var role = ["userChar","options","enemyChar"];

// Appending character profile
//////////////////////////////////////////////////////
	
	function fightProfile(){

		var row = $('<div>');
		row.addClass("row1");
		for(var j = 0; j < currentFight.length; j++){
			var charContainer = $('<div>');
			charContainer.addClass('col-lg-3');
			charContainer.addClass(role[j]+"_Pic");

			if(j==1){
				fightProfile = $("<div>");
				fightProfile.addClass("options");
				fightProfile.append();
				charContainer.append(fightProfile);
				row.append(charContainer);
				gameSect.append(row);
			}else{
				var  fightProfile = $('<img>');
				var fighter = currentFight[j];
				//fighter = fighter.substring(1, fighter.length-1);
				//var ind = allChar[allChar.indexOf(fighter)];
				fightProfile.addClass("fightProfile")
				fightProfile.attr("src",fighter.fightPic);
				fightProfile.attr('id',role[j]+"_pic");
				charContainer.append(fightProfile)
				row.append(charContainer);
				gameSect.append(row);

			}
		}
	}

// Appending attack options
//////////////////////////////////////////////////////

	function AttackOptions(){
	var optionsContainer = $(".options_Pic");
	var button1 = $("<button>");
		var button2 = $("<button>");
	var button3 = $("<button>");

	//button = button.attr("button");
	button1.addClass("optionBtn");
	button2.addClass("optionBtn");
	button3.addClass("optionBtn");

	saberBtn = button1.text("Light Saber Strike");
	forceBtn = button2.text("Use the Force");
	defendBtn = button3.text('Duel!');

	saberBtn = button1.attr('id',"saber");
	forceBtn = button2.attr('id',"forceThrow");
	defendBtn = button3.attr('id',"defend");

	optionsContainer.append(saberBtn);
	optionsContainer.append(forceBtn);
	optionsContainer.append(defendBtn);
}

// Appending characters' stat
//////////////////////////////////////////////////////

	function statProfile(){

		row = $("<div>");
		row.addClass("row2");

		for(var j = 0; j < currentFight.length; j++){
				
			var fighter = currentFight[j];

			var charContainer = $('<div>');
			charContainer.addClass('col-lg-3');
			charContainer.addClass(role[j]+"_Stat");

			if(j === 1){
				fightProfile = $("<div>");
				fightProfile.addClass("options");

				charContainer.append(fightProfile);
				row.append(charContainer);
				gameSect.append(row);
				continue; 
			}

			var healthContainer = $("<div>");
			var health = "HP:   "+ fighter.HP;
			healthContainer.append(health);
			healthContainer.attr('id',role[j] +"_health")
			charContainer.append(healthContainer);
			row.append(charContainer);
			gameSect.append(row);

			var staminaContainer = $("<div>");
			var stamina = "SP:   "+ fighter.SP;
			staminaContainer.append(stamina);
			staminaContainer.attr('id',role[j]+"_stamina")
			charContainer.append(staminaContainer)
			row.append(charContainer);
			gameSect.append(row);			
		}
	}

// Functions recalls
//////////////////////////////////////////////////////

	fightProfile();
	AttackOptions();
	statProfile();	
	fighting(userChar,enemyChar)


//////////////////////////////////////////////////////////////////////////////////////
// Fight Screen Mechanics
//////////////////////////////////////////////////////////////////////////////////////

function fighting(userChar,enemyChar){

	var startingStatUser = [];
	startingStatUser.push(userChar[0].HP);
	startingStatUser.push(userChar[0].SP);

	var startingStatEnemy = [];
	startingStatEnemy.push(enemyChar[0].HP);
	startingStatEnemy.push(enemyChar[0].SP);

	$("#saber").click(function(){
		selectedSaber();
	})

	$("#forceThrow").click(function(){
		selectedForceThrow();
	})

	$("#defend").click(function(){
		selectedBrawls();
	})

// Selected Saber Attacks
//////////////////////////////////////////////////////

	function selectedSaber(){
		$(".optionBtn").timedDisable();
		turn = 1;
		saberAttack(userChar[0],enemyChar[0],startingStatUser,startingStatEnemy);		
		turn = 2;
		setTimeout(function () {
		randAttacks(userChar[0],enemyChar[0],startingStatUser,startingStatEnemy);
		},2000)
	}

// Selected Force Throw Attacks
//////////////////////////////////////////////////////

	function selectedForceThrow(){
		$(".optionBtn").timedDisable();
		turn = 1;
		forceThrow(userChar[0],enemyChar[0],startingStatUser,startingStatEnemy);
		turn = 2;
		setTimeout(function () {
			randAttacks(userChar[0],enemyChar[0],startingStatUser,startingStatEnemy)
		},2000)	
	}

// Selected Duels Attack
//////////////////////////////////////////////////////

	function selectedBrawls(){
		$(".optionBtn").timedDisable();
		var round = prompt("How many round? (max 10)");
		if(round >10){
			alert("Too many rounds!");
			round = 5;
		}
		attackSound("Saber sequence")
		var time = 500;

		for(i = 0; i <=round;i++){
			setTimeout(function () {
				turn = 1;
				brawls(userChar[0],enemyChar[0],startingStatUser,startingStatEnemy);

				turn = 2; 

				brawls(userChar[0],enemyChar[0],startingStatUser,startingStatEnemy)
				},time);
			time +=500;
		}
		
	} // select brawl function ended
} // fighting function end


}	




