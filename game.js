// game.js
let currentTask = '';
let tasks = [
    { bodyPart: 'あたま', label: '<ruby>頭<rt>あたま</rt></ruby>' },
    { bodyPart: 'ひだりうで', label: '<ruby>左腕<rt>ひだりうで</rt></ruby>' },
    { bodyPart: 'みぎうで', label: '<ruby>右腕<rt>みぎうで</rt></ruby>' },
    { bodyPart: 'せなか', label: '<ruby>背中<rt>せなか</rt></ruby>' },
    { bodyPart: 'しっぽ', label: '<ruby>尻尾<rt>しっぽ</rt></ruby>' },
    { bodyPart: 'ひだりあし', label: '<ruby>左足<rt>ひだりあし</rt></ruby>' },
    { bodyPart: 'みぎあし', label: '<ruby>右足<rt>みぎあし</rt></ruby>' },
    { bodyPart: 'おなか', label: '<ruby>お腹<rt>おなか</rt></ruby>' },
    { bodyPart: 'こし', label: '<ruby>腰<rt>こし</rt></ruby>' },
    { bodyPart: 'むね', label: '<ruby>胸<rt>むね</rt></ruby>' },
    { bodyPart: 'また', label: '<ruby>股<rt>また</rt></ruby>' },
    { bodyPart: 'ひだりひざ', label: '<ruby>左<rt>ひだり</rt></ruby>ひざ' },
    { bodyPart: 'みぎひざ', label: '<ruby>右<rt>みぎ</rt></ruby>ひざ' },
    { bodyPart: 'ひだりて', label: '<ruby>左手<rt>ひだりて</rt></ruby>' },
    { bodyPart: 'ひだりひじ', label: '<ruby>左<rt>ひだり</rt></ruby>ひじ' },
    { bodyPart: 'ひだりめ', label: '<ruby>左目<rt>ひだりめ</rt></ruby>' },
    { bodyPart: 'みぎめ', label: '<ruby>右目<rt>みぎめ</rt></ruby>' },
    { bodyPart: 'はな', label: '<ruby>鼻<rt>はな</rt></ruby>' },
    { bodyPart: 'くち', label: '<ruby>口<rt>くち</rt></ruby>' },
    { bodyPart: 'ひだりみみ', label: '<ruby>左耳<rt>ひだりみみ</rt></ruby>' },
    { bodyPart: 'みぎみみ', label: '<ruby>右耳<rt>みぎみみ</rt></ruby>' },
    { bodyPart: 'ひだりほお', label: '<ruby>左<rt>ひだり</rt></ruby>ほお' },
    { bodyPart: 'みぎほお', label: '<ruby>右<rt>みぎ</rt></ruby>ほお' },
    { bodyPart: 'ひだりまゆ', label: '<ruby>左眉<rt>ひだりまゆ</rt></ruby>' },
    { bodyPart: 'みぎまゆ', label: '<ruby>右眉<rt>みぎまゆ</rt></ruby>' },
    { bodyPart: 'ひだりかた', label: '<ruby>左肩<rt>ひだりかた</rt></ruby>' },
    { bodyPart: 'みぎかた', label: '<ruby>右肩<rt>みぎかた</rt></ruby>' },
    { bodyPart: 'くび', label: 'くび' },
];

// Variables for scoring
let correctCount = 0;
let incorrectCount = 0;
let streakCount = 0;
let maxStreak = 0;

let gameStarted = false;

// Function to start the game
function startGame() {
    gameStarted = true;
    document.getElementById('start-button').disabled = true;
    generateTask();
}

// Function to generate a random task
function generateTask() {
    let randomIndex = Math.floor(Math.random() * tasks.length);
    currentTask = tasks[randomIndex];
    document.getElementById('task-message').innerHTML = `Click on: ${currentTask.label}`;
}


// Function to check if the player clicked the correct area
function checkAnswer(bodyPart) {
    if (!gameStarted) return;
    if (!currentTask || !currentTask.bodyPart) {
        console.error('No current task is set.');
        return;
    }

    // Normalize and trim the strings
    const clickedPart = bodyPart.trim().normalize();
    const taskPart = currentTask.bodyPart.trim().normalize();

    // Debugging statements
    console.log('Clicked bodyPart:', clickedPart);
    console.log('Current task bodyPart:', taskPart);

    let resultMessage = document.getElementById('result-message');
    if (clickedPart === taskPart) {
        resultMessage.textContent = 'Correct!';
        resultMessage.classList.remove('incorrect');
        resultMessage.classList.add('correct');
        correctCount++;
        streakCount++;
        maxStreak = Math.max(maxStreak, streakCount);
    } else {
        resultMessage.textContent = 'Try again!';
        resultMessage.classList.remove('correct');
        resultMessage.classList.add('incorrect');
        incorrectCount++;
        streakCount = 0;  // Reset streak on wrong answer
    }
    updateScoreDisplay();
    generateTask();
}

// Function to update the score display
function updateScoreDisplay() {
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('incorrect-count').textContent = incorrectCount;
    document.getElementById('streak-count').textContent = streakCount;
}

// Call this function after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    imageMapResize();
});

function initializeEventListeners() {
    const areas = document.querySelectorAll('area');
    areas.forEach(area => {
        area.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action
            const bodyPart = this.getAttribute('data-body-part');
            checkAnswer(bodyPart);
        });
    });
}

// Function to reset the score
function resetScore() {
    correctCount = 0;
    incorrectCount = 0;
    streakCount = 0;
    gameStarted = false;
    document.getElementById('start-button').disabled = false; // Re-enable the start button
    document.getElementById('task-message').textContent = ''; // Clear the task message
    document.getElementById('result-message').textContent = '';  // Clear the result message
    updateScoreDisplay();
}
