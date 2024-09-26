// game.js
let currentTask = '';
let tasks = [
    { bodyPart: 'あたま', label: '<ruby>頭<rt>あたま</rt></ruby>' },
    { bodyPart: 'みぎみみ', label: '<ruby>右耳<rt>みぎみみ</rt></ruby>' },
    { bodyPart: 'ひだりみみ', label: '<ruby>左耳<rt>ひだりみみ</rt></ruby>' },
    { bodyPart: 'みぎかた', label: '<ruby>右肩<rt>みぎかた</rt></ruby>' },
    { bodyPart: 'ひだりかた', label: '<ruby>左肩<rt>ひだりかた</rt></ruby>' },
    { bodyPart: 'みぎうで', label: '<ruby>右腕<rt>みぎうで</rt></ruby>' },
    { bodyPart: 'ひだりうで', label: '<ruby>左腕<rt>ひだりうで</rt></ruby>' },
    { bodyPart: 'みぎて', label: '<ruby>右手<rt>みぎて</rt></ruby>' },
    { bodyPart: 'ひだりて', label: '<ruby>左手<rt>ひだりて</rt></ruby>' },
    { bodyPart: 'みぎおやゆび', label: '<ruby>右親指<rt>みぎおやゆび</rt></ruby>' },
    { bodyPart: 'ひだりおやゆび', label: '<ruby>左親指<rt>ひだりおやゆび</rt></ruby>' },
    { bodyPart: 'くび', label: '<ruby>首<rt>くび</rt></ruby>' },
    { bodyPart: 'どう', label: '<ruby>胴<rt>どう</rt></ruby>' },
    { bodyPart: 'こし', label: '<ruby>腰<rt>こし</rt></ruby>' },
    { bodyPart: 'あし', label: '<ruby>足<rt>あし</rt></ruby>' },
    { bodyPart: 'みぎあし', label: '<ruby>右足<rt>みぎあし</rt></ruby>' },
    { bodyPart: 'ひだりあし', label: '<ruby>左足<rt>ひだりあし</rt></ruby>' },
    { bodyPart: 'くち', label: '<ruby>口<rt>くち</rt></ruby>' },
    { bodyPart: 'みぎめ', label: '<ruby>右目<rt>みぎめ</rt></ruby>' },
    { bodyPart: 'ひだりめ', label: '<ruby>左目<rt>ひだりめ</rt></ruby>' },
    { bodyPart: 'ほお', label: '<ruby>頬<rt>ほお</rt></ruby>' },
    { bodyPart: 'はな', label: '<ruby>鼻<rt>はな</rt></ruby>' },
    { bodyPart: 'みぎまゆ', label: '<ruby>右眉<rt>みぎまゆ</rt></ruby>' },
    { bodyPart: 'ひだりまゆ', label: '<ruby>左眉<rt>ひだりまゆ</rt></ruby>' },
    { bodyPart: 'しっぽ', label: '<ruby>尻尾<rt>しっぽ</rt></ruby>' },
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

function swapLeftRight(bodyPart) {
    if (bodyPart.includes('ひだり')) {
        return bodyPart.replace('ひだり', 'みぎ');
    } else if (bodyPart.includes('みぎ')) {
        return bodyPart.replace('みぎ', 'ひだり');
    } else {
        return bodyPart; // No left/right, return as is
    }
}

function swapLeftRightLabel(label) {
    return label
        .replace(/ひだり/g, 'TEMP_HIDARI')
        .replace(/みぎ/g, 'ひだり')
        .replace(/TEMP_HIDARI/g, 'みぎ')
        .replace(/左/g, 'TEMP_SA')
        .replace(/右/g, '左')
        .replace(/TEMP_SA/g, '右');
}

function getMirroredTask(task) {
    const mirroredBodyPart = swapLeftRight(task.bodyPart);
    const mirroredLabel = swapLeftRightLabel(task.label);
    return { bodyPart: mirroredBodyPart, label: mirroredLabel };
}

// Function to generate a random task
function generateTask() {
    let randomIndex = Math.floor(Math.random() * tasks.length);
    let task = tasks[randomIndex];
    currentTask = mirrorMode ? getMirroredTask(task) : task;
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

        // Adjust for Mirror Mode
    if (mirrorMode) {
        clickedPart = swapLeftRight(clickedPart);
    }

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

function initializeSVGEventListeners() {
    const svgElements = document.querySelectorAll('[data-body-part]');
    svgElements.forEach(element => {
        element.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior
            const bodyPart = this.getAttribute('data-body-part');
            checkAnswer(bodyPart);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSVGEventListeners();
    // Other initialization code
});

let mirrorMode = false;

function toggleMirrorMode(isMirrored) {
    mirrorMode = isMirrored;
    const svgElement = document.querySelector('#svg-container svg');
    if (mirrorMode) {
        svgElement.classList.add('mirrored');
    } else {
        svgElement.classList.remove('mirrored');
    }
    // Regenerate the task to update the label
    generateTask();
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
