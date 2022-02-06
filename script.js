//getting elements from DOM
const select = document.querySelector("#difficulty"),
    timeSpan = document.querySelector(".time"),
    scoreSpan = document.querySelector(".score"),
    word = document.querySelector(".word"),
    input = document.querySelector(".input"),
    gameOver = document.querySelector(".gameover"),
    words = ["hellow", "how", "programmer", "computer", "begin", "is",
            "noun", "verb", "world", "artifitial", "data", "bag",
        "counter", "inner", "text", "devolop", "skills", "on", "average", "level",
        "man", "for", "loop", "while", "affiliate"]
//initializing global variables
let difficultyLevel = localStorage.getItem("difficulty") != null ? localStorage.getItem("difficulty") : "medium";
select.value = difficultyLevel;
let score = 0,
    time = 10
//updating DOM
updateDOM()
//docus on input
input.focus();

//upadteTime
setInterval(()=>{
    if(time != 0){
        time--;
        timeSpan.textContent = time;
    }else{
        gameover();
    }
},1000)
//defining updateScore
function updateScore(){
    score++;
    scoreSpan.textContent = score;
}
//defining match word
function matchWord(e){
    let inputWord = e.target.value;
    if(inputWord === word.textContent){
        updateScore();
        e.target.value = "";
        updateDOM();
        if(difficultyLevel == "easy"){
            time += 5;
        }else if(difficultyLevel == "medium"){
            time += 3;
        }else{
            time += 2;
        }
    }
}
//get random word from words list
function getRandomWords(){
    return words[Math.floor(Math.random()*(words.length-1))];
}
//defining gameover function
function gameover(){
    gameOver.style.display = "flex";
    document.querySelector(".final-score").textContent = score;
}
//put random word to DOM
function updateDOM(){
    let randomWord = getRandomWords();
    word.textContent = randomWord;
}
//adding eventListners to input
input.addEventListener("keydown", matchWord);
//adding eventLiistners to select
select.addEventListener("change", ()=>{
    difficultyLevel = select.value != null ? select.value : "medium";
    localStorage.setItem("difficulty", difficultyLevel);
    window.location.reload();
})
document.querySelector(".config-button").addEventListener("click", ()=>{
    document.querySelector(".header").classList.toggle("visible")
})
