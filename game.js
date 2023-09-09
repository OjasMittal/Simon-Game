var guessList=[];
var userList=[];
var colours=["red","blue","green","yellow"];
var level=0;
var pressed=false;

$(".btn").click(function(){
    var userColour=$(this).attr("id");
    userList.push(userColour);
    sound(userColour);
    animate(userColour);
    check(userList.length-1);
})

$(document).keypress(function(){
    if(!pressed){
        $("#level-title").text("Level "+level);
        pressed=true;
        RandNumber();
    }
})

function check(currentLevel) {
    if (userList[currentLevel] === guessList[currentLevel]) {
      console.log("success");
      if (userList.length === guessList.length){
        setTimeout(function () {
          RandNumber();
        }, 1000);
      }

    } else {
      console.log("wrong");
      $("body").addClass("game-over");
      sound("wrong");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over! Press any key to restart");
      Restart();
    }

}

function RandNumber(){
    userList=[];
    level++;
    $("#level-title").text("Level "+level);
    var RandNumberChosen= Math.floor(Math.random()*4);
    var colourChosen=colours[RandNumberChosen];
    guessList.push(colourChosen);
    $("#"+colourChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(colourChosen);
    animate(colourChosen);
}

function sound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animate(name){
    $("#"+name).addClass("pressed");
    setTimeout(function(){
        $("#"+name).removeClass("pressed");},100);
}

function Restart(){
    level=0;
    pressed=false;
    guessList=[];
    userList=[];
}