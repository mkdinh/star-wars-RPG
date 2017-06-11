//////////////////////////////////////////////////////////////////////////////////////
// Declaring variables
//////////////////////////////////////////////////////////////////////////////////////

// Game Parameter
//////////////////////////////////////////////////////

var luke = {
    name: "luke",
    HP:10,
    SP:80,
    pic: "assets/images/luke.jpg",
    fightPic: "assets/images/lukeFight.png"
}

var vader = {
    name: "vader",
    HP:700,
    SP:100,
    pic: "assets/images/vader.jpg",
    fightPic: "assets/images/vaderFight.png"
}

var palpatine = {
    name: "palpatine",
    HP:10,
    SP:150,
    pic: "assets/images/palpatine.jpg",
    fightPic: "assets/images/palpatineFight.png"
}


var obiwan = {
    name: "obiwan",
    HP:10,
    SP:100,
    pic: "assets/images/obiwan.jpg",
    fightPic: "assets/images/obiwanFight.png"
}

var maul = {
    name: "maul",
    HP:10,
    SP:50,
    pic: "assets/images/maul.png",
    fightPic: "assets/images/maulFight.png"
}

var windu = {
    name: "windu",
    HP:10,
    SP:100,
    pic: "assets/images/windu.jpg",
    fightPic: "assets/images/winduFight.png"
}


    var allCharObj;
    var userChar;
    var enemyChar;
    var startingStatUser;
    var startingStatEnemy;
    var round ;
    var currentUserHP;
    var currentUserSP;

    var allChar;
    var totalRounds;
    var startGame;


function initializeGame(){
    userChar = [];
    enemyChar = [];
    startingStatUser = [];
    startingStatEnemy = [];
    round = 1;
    startGame = true;

     allCharObj = {
        luke: luke,
        obiwan: obiwan,
        windu: windu,
        palpatine: palpatine,
        vader: vader,
        maul: maul,
    }

    allChar = [obiwan,luke,windu,palpatine,vader,maul];
    totalRounds = allChar.length;
}

initializeGame()


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

function attackSound(audiofile,round){

    var audio = document.createElement("audio");
    audio.id = audiofile;
    audio.src = "assets/audio/"+audiofile+".mp3";
    $(".options_Stat").append(audio);
    audio.addEventListener("ended", function () {
        $('#'+audiofile).remove();
    }, false);
    audio.addEventListener("timeupdate", function(){
        t = audio.currentTime;
        if(t > .55*round){
            $("#"+audiofile).remove();// Stop the Video
        }

        })

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

function saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight){

    var saberArray = damageArray(saber,10,30);
    var damage = saberArray[Math.floor(Math.random() * saberArray.length)];

    var userInitialHP = userChar.HP;
    var userInitialSP = userChar.SP;
    
    var enemyInitialHP = enemyChar.HP;
    var enemyInitialSP = enemyChar.SP;

    if(turn === 1){
        

        if (startingStatUser[1] < userInitialSP){startingStatUser[1] += (3+.5*round)}

        startingStatEnemy[0] -= damage+ (5*round);

        $('#enemyChar_health').html("HP:   "+ startingStatEnemy[0]);
        $('#userChar_stamina').html("SP:   "+ startingStatUser[1]);         
        attackSound("clash");
        damageDisplay(damage,"enemyChar")
        damageArt("slashesD4","enemyChar") 
        return startingStatEnemy          
    }

    if(turn === 2){

        if (startingStatEnemy[1] < enemyInitialSP){startingStatEnemy[1] += 3}
        startingStatUser[0] -= damage;

        $('#userChar_health').html("HP:   "+ startingStatUser[0]);  
        $('#enemyChar_stamina').html("SP:   "+ startingStatEnemy[1]); 

        attackSound("clash");
        damageDisplay(damage,"userChar")
        damageArt("slashesD4","userChar")  
        return startingStatUser        
    }

}

// Force Throw attack when click on button
//////////////////////////////////////////////////////

function forceThrow(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight){

    var forceThrowArray = damageArray(forceThrow,30,50);
    var damage = forceThrowArray[Math.floor(Math.random() * forceThrowArray.length)];

    var userInitialHP = userChar.HP;
    var userInitialSP = userChar.SP;
    
    var enemyInitialHP = enemyChar.HP;
    var enemyInitialSP = enemyChar.SP;

    if(turn === 1){


        if (startingStatUser[1] < 20){
            saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);
            return startingStatEnemy;
        
        }

        startingStatUser[1] -= 20;  
        startingStatEnemy[0] -= damage+ (10*round);


        $('#enemyChar_health').html("HP:   "+ startingStatEnemy[0]);
        $('#userChar_stamina').html("SP:   "+ startingStatUser[1]);         
        attackSound("force1");
        damageDisplay(damage,"enemyChar");

    //$(".enemyChar_Pic").toggle(function(){
        $('.enemyChar_Pic').animate({right: '-300px'},100);
        $('.enemyChar_Pic').animate({right: '02px'},500);


        return startingStatEnemy
    
    }


    if(turn === 2){

        if (startingStatEnemy[1] < 13){
            saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);
        return startingStatUser}

        startingStatEnemy[1] -= 13; 
        startingStatUser[0] -= damage;


        $('#userChar_health').html("HP:   "+ startingStatUser[0]); 
        $('#enemyChar_stamina').html("SP:   "+ startingStatEnemy[1]); 
        attackSound("force1");
        damageDisplay(damage,"userChar")
        $('.userChar_Pic').animate({left: '-300px'},500);
        $('.userChar_Pic').animate({left: '-5px'},100); 
    }
        return startingStatUser
}

// brawls attack when click on button
//////////////////////////////////////////////////////

function brawls(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight){
    
    var brawlsArray = damageArray(brawls,1,30);
    var damage = brawlsArray[Math.floor(Math.random() * brawlsArray.length)];

    var userInitialHP = userChar.HP;
    var userInitialSP = userChar.SP;
    
    var enemyInitialHP = enemyChar.HP;
    var enemyInitialSP = enemyChar.SP;

    if(turn === 1){

        if (startingStatUser[1] < 3){damage = 0;damageDisplay(damage,"enemyChar");return startingStatEnemy;}
        if(startingStatUser[0] < 0 || startingStatEnemy[0] < 0){damage = 0}

        startingStatUser[1] -= 3;
        startingStatEnemy[0] -= damage + (3*round);


        $('#enemyChar_health').html("HP:   "+ startingStatEnemy[0]);
        $('#userChar_stamina').html("SP:   "+ startingStatUser[1]);         
    
        damageDisplay(damage,"enemyChar")
        damageArt("redslash","enemyChar")
        return startingStatEnemy
    }

    if(turn === 2){

        if (startingStatEnemy[1] < 3){damage = 0; damageDisplay(damage,"enemyChar");return startingStatUser;}
        if(startingStatUser[0] < 0 || startingStatEnemy[0] < 0){damage = 0}

        startingStatEnemy[1] -= 3;
        startingStatUser[0] -= damage;

        $('#userChar_health').html("HP:   "+ startingStatUser[0]); 
        $('#enemyChar_stamina').html("SP:   "+ startingStatEnemy[1]); 
        damageDisplay(damage,"userChar")
        damageArt("redslash","userChar")
        return startingStatUser
    }
}

//Random enemy attack generator
//////////////////////////////////////////////////////

function randAttacks(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight){

    var ind = Math.floor(Math.random() * 100) + 1;
    if(ind < 15){
        forceThrow(userChar,enemyChar,startingStatUser,startingStatEnemy);
     }
    if(ind >= 15 && ind <= 97){
        saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy);
    } 
    if(ind >97){

        time = 500;
        duelRound = Math.floor(Math.random() * 10) + 1;
        attackSound("Saber",duelRound);

        for(i = 0; i <=round ;i++){

        checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)
    
        setTimeout(function () {

                if(startingStatUser[0] < 0 || startingStatEnemy[0] < 0){return}
                turn = 1;
                
                brawls(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);
            
                turn = 2; 

        checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)


                if(startingStatUser[0] < 0 || startingStatEnemy[0] < 0){return}

                brawls(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)

                },time)

        checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)

                if(startingStatEnemy[0] > 0 || startingStatUser[0] > 0){time += 500}else{break}     
             
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

function checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight){
    if(startingStatUser[0] < 0){

        startGame = false;
        removeAttackOptions();
        chooseBtn = '<button type="button" id="winBtn">YOU LOSE</button>';
        $("#fightScreen").append(chooseBtn); 

        $("#winBtn").click(function(){
            lose();
        })
    }

    if(startingStatEnemy[0] < 0){
        startGame = false;
        removeAttackOptions();
        chooseBtn = '<button type="button" id="winBtn">YOU WIN!</button>';
        $("#fightScreen").append(chooseBtn); 

        var newStat = '<div id="newStatDiv"> <br>'
        +"<p>Health: +50 HP ("+(parseInt(currentUserHP)+50)+")</p><br>"
        +"<p>Stamina: +20 SP ("+(parseInt(currentUserHP)+50)+")</p><br>"
        +"<p>Saber Attack: +5 ("+ 5*round+")</p><br>"
        +"<p>Force Attack: +10 ("+ 10*round+")</p><br>"
        +"<p>Duel Attack: +3 ("+ 3*round+")</p><br>"
        +'</div>';

        $("#fightScreen").append(newStat); 
        
        $("#winBtn").click(function(){
        if(round < totalRounds-1){
            win(userChar,enemyChar,currentFight); 
        }else{
            finished()}
            
        }) // end of click function

    } // end of if enemy HP <0
} // end of checkHP function


// Lose functions if user health is zero
//////////////////////////////////////////////////////

function lose(){

    $("body").prepend('<audio controls autoplay hidden loop id="background">'
        +'<source src="assets/audio/betrayal.mp3">'
        + '</audio>'
        );

    var gameSect = $(".game");  
        gameSect.attr("id","loseScreen")
        gameSect.empty();

        loseDiv = '<div id="loseBtn">You were supposed to be the chosen one!</div>';
        $("#loseScreen").append(loseDiv); 

        restartBtn = '<button type="button" id="restartBtn">RESTART</button>';
        $("#loseScreen").append(restartBtn);

        $("#restartBtn").click(function(){
            initializeGame()
            charScreen(userChar,allCharObj);
            //start(userChar,allCharObj);

        })
}

// Defeated all opponents
//////////////////////////////////////////////////////

function finished(){
        var gameSect = $(".game");  
        gameSect.attr("id","finishedScreen")
        gameSect.empty();

        finishedDiv = '<div id="loseBtn">Congratulation! <br> You have brought the balance to the Force!</div>';
        $("#finishedScreen").append(finishedDiv); 

        fightAgainBtn = '<button type="button" id="fightAgainBtn">FIGHT AGAIN</button>';
        $("#finishedScreen").append(fightAgainBtn); 

        $("#fightAgainBtn").click(function(){
            initializeGame();
            start(userChar,allCharObj);
        })
}


//////////////////////////////////////////////////////////////////////////////////////
// Start Screen Layouts
//////////////////////////////////////////////////////////////////////////////////////

function start(allChar,allCharObj){

    var startScreen = '<div class="col-lg-12 game" id="start">'    
           +'</div>';

    $(".game").empty()

    $(".gameContainer").html(startScreen);

        var startBtn = '<button type="button" id="startBtn">Start</button>'

    $("#start").append(startBtn); 


     $("body").prepend('<audio controls autoplay hidden loop id="background">'
        +'<source src="assets/audio/theme.mp3">'
        + '</audio>');

    $("#startBtn").click(function(){
        charScreen(userChar,allCharObj);
    })
}

$( document ).ready(function(){

    start(allChar,allCharObj);

});

//////////////////////////////////////////////////////////////////////////////////////
// Character Selection Screen
//////////////////////////////////////////////////////////////////////////////////////

function charScreen(userChar,allCharObj){
 
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


    var enemyChar =[];
    var time = 500;

// Generating characters profile
//////////////////////////////////////////////////////

    function charactersProfile(userChar,allCharObj){
        for(i = 0; i < allChar.length; i++){
            var  profContainer = $('<div>');
            profContainer.addClass("profContainer");
            var  profile = $('<img>');
            var char = allChar[i];
            var img = char.pic;
            profile.attr("src",img);
            profile.attr("id",allChar[i].name);
            profile.addClass("profile");
            profContainer.append(profile);
            gameSect.append(profContainer);
        }

        if(round === 1){
            chooseBtn = '<button type="button" id="chooseBtn">Click on Your Fighter!</button>';
            $("#charScreen").append(chooseBtn); 
        }else{
            $("#chooseBtn").remove();
            chooseBtn = '<button type="button" id="chooseBtn">Choose Your Next Opponent!</button>';
            $("#charScreen").append(chooseBtn);
        }
    }
    
    charactersProfile(userChar,allCharObj);

// Characters selection
//////////////////////////////////////////////////////////////////////////////
    
        click = 1;

        $(".profile").click(function(){
            attackSound("saberOn");
// 1st Click select user character
//////////////////////////////////////////////////////
            if(round === 1){   
                if(userChar.length === 0){
                    $(this).parent().css('box-shadow', '0px 0px 30px white');
                    $(this).parent().css('border', '2px solid green');
                    $(this).css('opacity', '1');        
                    $(this).attr('role','userChar');

                    userChar.push(allCharObj[this.id]);
                    userChar = userChar[0];

                    $("#chooseBtn").remove();
                    chooseBtn = '<button type="button" id="chooseBtn">Click on Your Opponent!</button>';
                    $("#charScreen").append(chooseBtn);
                }
        
// 2nd click select opponent character
//////////////////////////////////////////////////////

            else { 
                if(click > 2){return};
                $(this).parent().css('box-shadow', '0px 0px 30px white');
                $(this).parent().css('border', '2px solid red');
                $(this).css('opacity', '1');    
                $(this).attr('role','enemyChar');
                enemyChar.push(allCharObj[this.id]);
                enemyChar = enemyChar[0];

                $("#chooseBtn").remove();
                fightBtn = '<button type="button" id="fightBtn">Fight</button>';
                $("#charScreen").append(fightBtn); 
            }
        }

        if(round > 1){
            if(click > 1){return};

            $(this).parent().css('box-shadow', '0px 0px 30px white');
            $(this).parent().css('border', '2px solid red');
            $(this).css('opacity', '1');    
            $(this).attr('role','enemyChar');
    
            enemyChar.push(allCharObj[this.id]);
            enemyChar = enemyChar[0]

                $("#chooseBtn").remove();
            fightBtn = '<button type="button" id="fightBtn">Fight</button>';
            $("#charScreen").append(fightBtn); 
        }   

// Ready to go to fight screen
//////////////////////////////////////////////////////

        if(click <= 2){click++}
        else{click =1};         

        $("#fightBtn").click(function(){
            fightScreen(userChar,enemyChar)
        })
    
    })
}

///////////////////////////////////////////////////////////////////////
// Initializing Fight Screen
///////////////////////////////////////////////////////////////////////

// Initializing screen
//////////////////////////////////////////////////////

function fightScreen(userChar,enemyChar){
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
    if (round === 1){
        var currentFight =[userChar,options,enemyChar];
    }else{
        var currentFight =[userChar,options,enemyChar]; 
    }
        var role = ["userChar","options","enemyChar"];

// Appending character profile
//////////////////////////////////////////////////////
    
    function fightProfile(userChar,enemyChar){

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

                fightProfile.addClass("fightProfile")
                fightProfile.attr("src",fighter.fightPic);
                fightProfile.attr('id',role[j]+"_pic");
                charContainer.append(fightProfile)
                row.append(charContainer);
                gameSect.append(row);
            }
        }

        $("#userChar_pic").animate({left: '50px'},1000);
        $("#enemyChar_pic").animate({right: '40px'},1000);
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

    function statProfile(userChar,enemyChar){

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

             if(round > 1 && j === 0){
                var healthContainer = $("<div>");
            var health = "HP:   "+ currentUserHP;
            healthContainer.append(health);
            healthContainer.attr('id',role[j] +"_health")
            charContainer.append(healthContainer);
            row.append(charContainer);
            gameSect.append(row);


            var staminaContainer = $("<div>");
            var stamina = "SP:   "+ currentUserSP;
            staminaContainer.append(stamina);
            staminaContainer.attr('id',role[j]+"_stamina")
            charContainer.append(staminaContainer)
            row.append(charContainer);
            gameSect.append(row); 
            }else{

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
    }

// Functions recalls
//////////////////////////////////////////////////////

    fightProfile(userChar,enemyChar);
    AttackOptions();
    statProfile(userChar,enemyChar);    
    fighting(userChar,enemyChar)


///////////////////////////////////////////////////////////////////////
// Fight Screen Mechanics
///////////////////////////////////////////////////////////////////////

function fighting(userChar,enemyChar){

    if(round ==1){
        currentUserHP = userChar.HP;
        currentUserSP = userChar.SP;
    }
        startingStatUser =[];
        startingStatUser.push(currentUserHP);
        startingStatUser.push(currentUserSP);
        console.log(userChar)
        console.log(startingStatUser)

        startingStatEnemy.push(enemyChar.HP);
        startingStatEnemy.push(enemyChar.SP);

    if(startGame === true){
        $("#saber").click(function(){
            selectedSaber(userChar,enemyChar);
        })

        $("#forceThrow").click(function(){
            selectedForceThrow(userChar,enemyChar);
        })

        $("#defend").click(function(){
            selectedBrawls(userChar,enemyChar);
            checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)
        })
    }
// Selected Saber Attacks
//////////////////////////////////////////////////////

    function selectedSaber(userChar,enemyChar){
        $(".optionBtn").timedDisable();

        turn = 1;

        saberAttack(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);

        checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)

        if(startingStatEnemy[0] < 0 || startingStatUser[0] < 0 ){return}

        turn = 2;

        setTimeout(function () {
            randAttacks(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);
            checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)
        },2000)

    }

// Selected Force Throw Attacks
//////////////////////////////////////////////////////

    function selectedForceThrow(userChar,enemyChar){
        $(".optionBtn").timedDisable();

        turn = 1;

        forceThrow(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);

        checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)

        if(startingStatEnemy[0] < 0 || startingStatUser[0] < 0 ){return}

        turn = 2;

        setTimeout(function () {
            randAttacks(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)
            checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)
        },2000) 


    }

// Selected Duels Attack
//////////////////////////////////////////////////////

    function selectedBrawls(userChar,enemyChar){

        $(".optionBtn").timedDisable();
        var duelRound = prompt("How many round? (max 10)");

        if(duelRound >10){
            alert("Too many rounds!");
            duelRound = Math.floor(Math.random() * 10) + 1;
        }

        attackSound("Saber",duelRound)

        var time = 500;

        for(i = 1; i <= duelRound; i++){


            setTimeout(function () {

                if(startingStatEnemy[0] < 0 || startingStatUser[0] < 0){return}     

                turn = 1;

                brawls(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight);

                turn = 2; 

                brawls(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)

                checkHP(userChar,enemyChar,startingStatUser,startingStatEnemy,currentFight)
            },time);
        
        time +=500;
    }


    } // select brawl function ended
} // fighting function end


}

//////////////////////////////////////////////////////////////////////////////////////
// Win Screen  if enemy health is zero
//////////////////////////////////////////////////////////////////////////////////////  

function removeAttackOptions(){
    $(".optionBtn").remove();
    //$(".row2").remove()
}
// Initializing Layout
//////////////////////////////////////////////////////


function win(userChar,enemyChar,currentFight){

    enemyCharInd = allChar.indexOf(enemyChar);

    allChar.splice(enemyCharInd,1);

    if(round === 1){
        userCharInd = allChar.indexOf(userChar);
        allChar.splice(userCharInd,1);
    }
    delete allCharObj[enemyChar.name];

    enemyChar = [];
    startingStatEnemy = [];

    userChar = currentFight[0];
    currentUserHP += 50;
    currentUserSP += 20;

    startGame = true;
    round++;
    console.log("This round is " + round )
    charScreen(userChar, allCharObj)
    // var gameSect = $(".game");   
    //  gameSect.attr("id","charScreen")

} // end win function


