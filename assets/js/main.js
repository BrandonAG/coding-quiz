var timeLeft;
var score = 0;
var quizComplete;

var count = document.getElementById("count");
var questions = document.getElementById("questions");

var initiateQuizH1 = document.createElement("h1");
initiateQuizH1.textContent = "Coding Quiz";

var initiateQuizP = document.createElement("p");
initiateQuizP.textContent = "Click the start button below to begin a timed coding quiz. Get a question wrong and you will receive a time penalty. Good luck.";

var startFlex = document.createElement("div");
startFlex.setAttribute("class", "start-flex");
var initiateQuizBtn = document.createElement("button");
initiateQuizBtn.setAttribute("id", "start");
initiateQuizBtn.textContent = "Start Quiz";

questions.appendChild(initiateQuizH1);
questions.appendChild(initiateQuizP);
questions.appendChild(startFlex);
startFlex.appendChild(initiateQuizBtn);

var start = document.getElementById("start");

var questions_list = [
    {
        q: "What symbol denotes an ID in CSS?",
        a: "#",
        choices: [".", "#", "$", "@"]
    },
    {
        q: "What allows for a webpage to be dynamic?",
        a: "JavaScript",
        choices: ["HTML", "CSS", "JavaScript", "PHP"]
    },
    {
        q: "What data type is stored inside quotations(\"\")?",
        a: "string",
        choices: ["string", "integer", "booleans", "undefined"]
    },
    {
        q: "What is the outer-most element of a css box?",
        a: "margin",
        choices: ["content", "margin", "padding", "border"]
    },
    {
        q: "What keyword is used to declare a function in Javascript?",
        a: "function",
        choices: ["def", "fn", "sub", "function"]
    }
];

function countdown() {
    timeLeft = 20;
    count.textContent = timeLeft;

    var timeInterval = setInterval(function() {
        timeLeft = count.textContent;
        if (timeLeft > 0 && !quizComplete) {
            timeLeft = count.textContent;
            count.textContent = timeLeft - 1;
        }
        else {
            clearInterval(timeInterval);
            scoreEntry();
        }
    }, 1000);
    runQuiz();
}

function runQuiz() {
    var questionNum = 0;
    createQuesion(questionNum);
};

function createQuesion(questionNum) {
    if (questionNum >= questions_list.length || count.textContent < 1) {
        quizComplete = true;
        return;
    }
    console.log("Q# " + questionNum)
    questions.textContent = "";
    console.log(questionNum)
    var questionTxt = document.createElement("h1");
    questionTxt.textContent = questions_list[questionNum].q;
    questions.appendChild(questionTxt);
    var choicesTxt = document.createElement("div");
    choicesTxt.setAttribute("class", "flex-container");
    questions.appendChild(choicesTxt);
    for (var choiceNum = 0; choiceNum < questions_list[questionNum].choices.length; choiceNum++) {
        createChoice(questionNum, choiceNum);
    }
    waitInput(questionNum,questions_list[questionNum].choices.length);
}

function createChoice(questionNum, choiceNum) {
    choiceBtn = document.createElement("button");
    choiceBtn.textContent = questions_list[questionNum].choices[choiceNum];
    choiceBtn.setAttribute("id", "choice" + choiceNum);
    document.querySelector(".flex-container").appendChild(choiceBtn);
}

function waitInput (questionNum, totalChoices) {
    for (var choiceNum = 0; choiceNum < totalChoices; choiceNum++) {
        var x = checkSelection(questionNum, choiceNum);
    };
};

function checkSelection(questionNum, choiceNum) {
    return document.getElementById("choice" + choiceNum).addEventListener("click", function() {
        var value = document.getElementById("choice" + choiceNum).textContent;
        var answer = questions_list[questionNum].a;
        if (count.textContent > 1) {
            score = score + (10 * (value === answer));
        }
        if (value !== answer) {
            timeLeft = count.textContent;
            if (timeLeft < 10) {
                count.textContent = 0;
            }
            else {
                count.textContent = timeLeft - 10;
            }
        }
        console.log("SCORE: " + score)
        var maxDuration = 10;
        var duration = maxDuration;
        var resultTimer = setInterval(function() {
            if (duration > 0) {
                if (duration == maxDuration) {
                    var resultEl = document.createElement("div");
                
                    if (value === answer) {
                        resultEl.setAttribute("id", "correct");
                        resultEl.setAttribute("class", "result");
                        resultEl.textContent = "Correct.";
                    }
                    else {
                        resultEl.setAttribute("id", "incorrect");
                        resultEl.setAttribute("class", "result");
                        resultEl.textContent = "Incorrect";
                    }
                    questions.appendChild(resultEl);
                }
                duration--;
            }
            else if (duration == 0){
                clearInterval(resultTimer)
                resultEl = document.querySelector(".result");
                if (resultEl) {
                    resultEl.parentNode.removeChild(resultEl);
                }
            }
        }, 100)
        createQuesion(questionNum + 1)
    });
};

function scoreEntry() {
    questions.textContent = "";
    var scoreTitle = document.createElement("h1");
    scoreTitle.textContent = "All Done";
    var scoreDisplay = document.createElement("p");
    scoreDisplay.textContent = "Your final score is " + score;
    var inputBox = document.createElement("div");
    inputBox.setAttribute("class", "input-box")
    var userLabel = document.createElement("label");
    userLabel.setAttribute("for", "initials");
    userLabel.textContent = "Enter initials";
    var userEntry = document.createElement("input");
    userEntry.setAttribute("name", "initials");
    userEntry.setAttribute("id", "initials");
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submit-score");
    submitBtn.textContent = "Submit";

    questions.appendChild(scoreTitle);
    questions.appendChild(scoreDisplay);
    questions.appendChild(inputBox);
    inputBox.appendChild(userLabel);
    inputBox.appendChild(userEntry);
    inputBox.appendChild(submitBtn);

    document.getElementById("submit-score").addEventListener("click", function() {
        console.log(document.getElementById("initials").value);
        // localStorage.setItem('high-scores', [{i: document.getElementById("initials").value, s: score}]);
        var scoresData = localStorage.getItem("high-scores");
        if (!scoresData) {
            localStorage.setItem('high-scores', (document.getElementById("initials").value + ":" + score));
        }
        else {
            var scoresList = scoresData.split(",");
            var prevMax = 0;
            var shiftIndex = undefined;
            var shiftScore = 0;
            for (var scoreIndex = 0; scoreIndex < scoresList.length; scoreIndex++) {
                var prevScore = scoresList[scoreIndex].split(":")[1];
                if (prevScore < score) {
                    console.log("TEST: " + prevScore + " " + shiftScore);
                    if (prevScore >= shiftScore) {
                        console.log("TEST2");
                        shiftScore = score;
                        shiftIndex = scoreIndex;
                    }
                }
                if (prevScore > prevMax) {
                    prevMax = prevScore;
                }
            }
            console.log("shiftIndex: " + shiftIndex)
            if (score > prevMax) {
                scoresList.unshift(document.getElementById("initials").value + ":" + score);
            }
            else if (shiftIndex !== undefined) {
                scoresList.splice(shiftIndex, 0, document.getElementById("initials").value + ":" + score);
            }
            else if (scoresList.length < 10) {
                scoresList.push(document.getElementById("initials").value + ":" + score);
            }
            if (scoresList > 10) {
                scoresList.pop();
            }
            localStorage.setItem('high-scores', scoresList.join(","));
        }
        window.location = "./high-scores.html";
    })
}

start.addEventListener("click", function() {
    countdown();
    // runQuiz();
}
);