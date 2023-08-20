const solution = document.querySelector(".solution")
const inputEl = document.querySelector("#answer")
const submitBtn = document.querySelector("#submitAnswer")
const form = document.querySelector("form")
const winEl = document.querySelector(".win")
const loseEl = document.querySelector(".lose")

const timerEl = document.querySelector(".timer")
let timer = 10

let status = JSON.parse(localStorage.getItem("myStatus")) || {
    win: 0,
    lose: 0
}

let correctAnswer

if (solution) {
    newSolution()
}

addStatus()

const intervalID = setInterval(() => {
    timer--
    if(timer==0){
        backColor("red")
    }
    if (timer === -1) {
        status.lose++
        addStatus()
        newSolution()
        timer = 10
    }
    timerEl.textContent = timer
}, 1000)



form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const userAnswer = Number.parseInt(inputEl.value);
    inputEl.value = "";
    console.log("User answer:", userAnswer);

    let isCorrectAnswer = userAnswer === correctAnswer;
    if (isCorrectAnswer) {
        backColor("green")
      status.win++;
    } else {
    backColor("red")
      status.lose++;
    }
    addStatus();
    timer = 10;
    newSolution();
  });
function backColor(color){
    let body = document.querySelector("body");
    body.style.backgroundColor = color;

    setTimeout(() => {
        body.style.backgroundColor = ""; // Reset the background color
      }, 100);
}
  
function newSolution() {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const action = Math.floor(Math.random() * 2) + 1

    if (action === 1) {
        correctAnswer = num1 + num2
    } else {
        correctAnswer = num1 * num2
    }

    console.log(correctAnswer)
    console.log(action)

    let sol = `What is ${num1} ${action === 1 ? "+" : "X"} ${num2} ?`
    console.log(sol)

    if (solution) {
        solution.textContent = sol
    }
}

function addStatus() {
    winEl.textContent = `Win: ${status.win}`
    loseEl.textContent = `Lose: ${status.lose}`

    localStorage.setItem("myStatus", JSON.stringify(status));
  }
