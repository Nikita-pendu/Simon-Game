let gameSeq = [];
let userSeq = [];

let btns = ["gray","yellow","pink","green"];

let started = false;
let level = 0;

//STEP 1 : when we press any key then the game will started. keypress + gamestart.
let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
    if(started == false){
        console.log("button is clicked");
        started = true;
        levelUp();
    }
})

//STEP 2 : level up + flash the button + update the level 
//when it will automaticallly generates a flash -->then this function will display WHITE color 
function gameflash(btn) {
    btn.classList.add("gameflash");
    setTimeout (function() {
        btn.classList.remove("gameflash");
    },200);
}

//when user will click --> this function will occur with GREEN color
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout (function() {
        btn.classList.remove("userflash");
    },200);
}

//this function will levelup in h2 .
function levelUp() {
    userSeq =[];
    level++;
   
    h2.innerText = `level ${level}`;
    //random btn choose.
    let randIdx = Math.floor(Math.random() * 4);             //for chosing random btn
    let randColor = btns[randIdx];                          //for choosing random color from index of btns.
    let randBtn = document.querySelector(`.${randColor}`); //we will access the class of randcolor and store in randbtn.
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    //It will flash in a button by game automatically.
    gameflash(randBtn);
}

//STEP 4 : Matching sequence
function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerHTML = `Game Over! <b>Your score is ${level}</b><br>Press any key to Start. `;
        //For flashing and unflashing the RED light in background when the game is Over.
        document.querySelector("body").style.backgroundColor= "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }  
}
// STEP 3: coloring different color to userflash and gameflash
function btnPress() {
    btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);    //pushing the colors in sequence like arrays.

    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

//STEP 5 : For Reseting the whole Game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
