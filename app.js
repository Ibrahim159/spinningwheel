// Function to start the conffeti in 500 ms
const start = () => {
    setTimeout(function () {
        confetti.start();
    }, 100);
}

// Function to stop the conffeti in 5s
const stop = () => {
    setTimeout(function () {
        confetti.stop();
    }, 17000);
}

// Initialize spin button
let btn = document.getElementById("spin-btn");
let audio = new Audio('winner.mp3');

// Function to load data from CSV
async function loadData(file) {
    const response = await fetch(file);
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    const items = rows.map(row => row.split(',')[0]);
    return items;
}

// Function to spin the wheel
async function spinWheel() {
    const items = await loadData('data.csv');
    const spinnerContent = document.getElementById('spinner-content');
    let i = 0;
    const intervalId = setInterval(() => {
        spinnerContent.innerHTML = items[i];
        i = (i + 1) % items.length;
    }, 50);

    setTimeout(() => {
        clearInterval(intervalId);
        const randomIndex = Math.floor(Math.random() * items.length);
        spinnerContent.innerHTML = items[randomIndex];

        // Initialize the confetti
        start();
        audio.play();
        
        // Stop the confetti
        stop();
    }, 2000);
    
}

// Initialize wheel
btn.addEventListener('click', spinWheel);