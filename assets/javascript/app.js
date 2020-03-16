//initial values
var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;


$("#start").click(function() {
    $("#start").remove();
    $("#time").html(counter);
    loadQuestion();
});

//display choices and questions on browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000)

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    $("#time").html("Timer: " + counter);
    $("#game").html("
    '<h4>' + question + '</h4>' + loadChoices(choices) + loadRemainingQuestion()"
}

function loadChoices(choices) {
    var result = "";

    for (var i = 0; i < choices.length; i++) {
        result += "<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>";
    }

    return result;
}


//start a timer
function timeUp() {
    clearInterval(timer);

    lost++;
    preloadImage("loss");
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $("#time").html("Timer: " + counter);

    if (counter === 0) {
        timeUp();
    }
}

//if the timer is over go to next question
function nextQuestion() {
    var isGameOver = (quizQuestions.length - 1) === currentQuestion;
    if (isGameOver) {
        //todo
        console.log("gameover");
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

//check answers for right or wrong
$(document).on("click", ".choice", function () {
    clearInterval(timer);
    var selectedAnswer = $(this).attr("data-answer");
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        preloadImage("win");
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log("loser");
        preloadImage("loss");
        setTimeout(nextQuestion, 3 * 1000);
    }
});;


function displayResult() {
    var result = ""
    <p>you got ${score} question(s) right! </p>
    <p>you got ${lost} question(s) wrong! </p>
    <p>Total questions ${quizQuestions.length} </p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    

    $("#game").html(result);
}

$(document).on("click", "#reset", function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});

function loadRemainingQuestion() {
    var remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    var totalQuestion = quizQuestions.length;

    return "Remaining Question: ${remainingQuestion}/${totalQuestion}"
};

function randomImage(images) {
    var random = Math.floor(Math.random() * images.length);
    var randomImage = images[random];
    return randomImage;
}

function preloadImage(status) {
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === "win") {
        $("#game").html(
        <p class="preload-image">That is correct! The answer was <b>${correctAnswer}</b></p>
        <img src="${randomImage(winGifs)}"/>
        )
    } else {
        $("#game").html(
        <p class="preload-image">WRONG! The correct answer was <b>${correctAnswer}</b></p>
        <img src="${randomImage(loseGifs)}"/>
        )
    }
}




//make questions
var quizQuestions = [
    {
        question:"?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "?",
    },
    {
        question:"?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "?",
    },
    {
        question:"?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "?",
    },
    {
        question:"?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "?",
    },
    {
        question:"?",
        choices: ["1", "2", "3", "4"],
        correctAnswer: "?",
    },
];

var winGifs = [ 
    "image",
    "image",
    "image",
    "image",
];

var loseGifs = [
    "image",
    "image",
    "image",
    "image",
];