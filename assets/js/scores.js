var scoreEl = document.getElementById("high-scores");

var highScores = localStorage.getItem("high-scores");
if (highScores) {
    var ScoresList = highScores.split(",")
    var scoreUl = document.createElement("ul");
    scoreEl.appendChild(scoreUl);
    for (var scoreIndex = 0; scoreIndex < ScoresList.length; scoreIndex++) {
        console.log(ScoresList[scoreIndex]);
        var scoreItem = document.createElement("li")
        scoreItem.textContent = (scoreIndex + 1) + ". " + ScoresList[scoreIndex].split(":")[0] + " - " + ScoresList[scoreIndex].split(":")[1];
        scoreUl.appendChild(scoreItem);
    }
}


var backBtn = document.createElement("button");
backBtn.setAttribute("id", "go-back");
backBtn.textContent = "Go Back";

var clearBtn = document.createElement("button");
clearBtn.setAttribute("id", "clear");
clearBtn.textContent = "Clear Scores";

scoreEl.appendChild(backBtn);
scoreEl.appendChild(clearBtn);

backBtn.addEventListener("click", function() {
    window.location = "./index.html";
})

clearBtn.addEventListener("click", function() {
    localStorage.removeItem("high-scores");
    if (scoreUl) {
        scoreUl.parentNode.removeChild(scoreUl);
    }
})