
// Element variables
const startbtn = document.getElementById("startbtn");
const quiz = document.getElementById("quiz");
const questions = document.getElementById("questions");
const choices = document.getElementById("choices");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const submit = document.getElementById("submit");
const highscore_div = document.getElementById("highscore_div");
const olelement = document.getElementById("highscore_reset");
const highscore_list = document.getElementById("highscore_list");


const gamertag = document.getElementById("gamertag");







btn1.addEventListener("click", checkanswer);
btn2.addEventListener("click", checkanswer);
btn3.addEventListener("click", checkanswer);
btn4.addEventListener("click", checkanswer);

var timerInterval;
const timerelement = document.getElementById("timerEl");
const answerelement = document.getElementById("answerEl");
const questionsDB = [
    {
        question: "Which of the following is not a valid HTML tag?",
        choice1: "<",
        choice2: ">",
        choice3: ">/",
        choice4: "<!--",
        answer: 3
    },
    {
        question: "Which of the following is not a valid CSS selector?",
        choice1: "#",
        choice2: ".",
        choice3: ":nth-child()",
        choice4: "?",
        answer: 4
    },
    {
        question: "Which of the following is not a valid JavaScript function?",
        choice1: "function",
        choice2: "var",
        choice3: "let",
        choice4: "const",
        answer: 1
    }
]

let currentQuestion = 0;
let score = 0;
// let gamername = [];
let finalscore = 0;
let secondsLeft = 90;

startbtn.addEventListener("click", startQuiz);

//hides start buttons and shows quiz
function startQuiz() {
    startbtn.classList.add("hide");
    quiz.classList.remove("hide");
    revealQuestion();
    setTime();
}

//the quiz in question
function revealQuestion() {

    questions.textContent = "Q" + (currentQuestion + 1) + ": " + questionsDB[currentQuestion].question;
    btn1.textContent = questionsDB[currentQuestion].choice1;
    btn2.textContent = questionsDB[currentQuestion].choice2;
    btn3.textContent = questionsDB[currentQuestion].choice3;
    btn4.textContent = questionsDB[currentQuestion].choice4;

}

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerelement.textContent = secondsLeft + " seconds left";

        if (secondsLeft <= 0) {
           endQuiz();
        } else {
            secondsLeft--
        }

    }, 1000);
}

function checkanswer() {
    //checks to see if answer is correct
    var userchoice = this.getAttribute("id").split("-")[1]
    console.log(userchoice)
    if (userchoice == questionsDB[currentQuestion].answer) {
        score += 10;
        answerelement.textContent = "Correct!";
    } else {
        answerelement.textContent = "Wrong!";
        secondsLeft -= 10;
    }
    if (currentQuestion < questionsDB.length - 1) {
        currentQuestion++;
        revealQuestion();
    } else {
        // localStorage.setItem("Subscore", JSON.stringify(secondsLeft));
        endQuiz();
    }
}



function endQuiz() {
    quiz.classList.add("hide");
    clearInterval(timerInterval);
    finalscore = secondsLeft;
    console.log("finalscore", finalscore);

    gamertag.value = "";
    
    submit.addEventListener("click", () => {
    
        olelement.removechild(li);
        
    });

    submit.addEventListener("click", () => {
    //    console.log("removed", highscore_list.remove());
    //    highscore_list.removeChild(li);
        //Sets gamertag and score to local storage
    localStorage.setItem(gamertag.value, JSON.stringify(finalscore));
        //spreads local storage into an object
        const items = { ...localStorage };
        console.log("items", items)
        const itemsarray = Object.entries(items)
        // for each item in the object, create a list item and append it to the highscore list
        itemsarray.forEach(completeditem => {
            console.log(completeditem);
            const li = document.createElement("li");
            li.innerHTML = JSON.stringify(completeditem);
            olelement.appendChild(li);
            
            
        });
        
        
        const li = document.createElement("li");
        li.innerHTML = JSON.stringify(completeditem);
        highscore_list.appendChild(li);
         return;
    });

    console.log("gamertag.value", gamertag.value);

    highscore_div.classList.remove("hide");
    var Subscore = localStorage.getItem("Subscore");
    console.log(Subscore);

    


    
}