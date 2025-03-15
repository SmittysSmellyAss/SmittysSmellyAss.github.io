const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;
let gameOver = false;
let gameRunning = false;
let userScoreCounter = document.querySelector('.currentScore');
let currentScore = 0;
let playerLives = 3;
let poschMusic = new Audio('poschMusic.mp3');
poschMusic.loop = true;
poschMusic.volume = 0.1;
let poschGrunt = new Audio('grunt.mp3');
poschGrunt.volume = 1;
let poschGameOver = new Audio('gameOver.mp3');
poschGameOver.volume = .1;


const playerImage = new Image();
playerImage.src = "ballen.png";


const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    bullets: []
};

const orbiters = [];
const fallenFans = [];
const miniBoss = [];
const boss = [];
const keys = {};
const bombs = [];

const invaderImages = {
    orbiter_types: ["f_rogen_head.png", "f_rogen_head.png"],
    willie_types: ["snek_head.png", "ajones_head.png"],
    fallenFan_types: ["jlee_head.png", "piker_head.png"],
    miniBoss_types: ["t_rump_head.png", "t_rump_head2.png", "elon_head.png"],
    boss_types: ["f_rogen_head.png", "f_rogen_head.png"]
};

const powerUpImages = {
    cough_syrup: ["f_rogen_head.png", "f_rogen_head.png"],
    gamersup: ["f_rogen_head.png", "f_rogen_head.png"]

};

class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 15;
        this.speed = 3;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = "yellow";    /// Color for enemy bomb in case change later
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Invader {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 2;
        this.type = type;
        this.image = new Image();
        this.image.src = invaderImages[type][Math.floor(Math.random() * invaderImages[type].length)];
    }

    move() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -50;
            this.x = Math.random() * (canvas.width - this.width);
        }
    }

    attack() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -50;
            this.x = Math.random() * (canvas.width - this.width);
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

const invaders = [];
const invaderTypes = Object.keys(invaderImages);

function submitScore(playerName, score) {
    // Ensure name is limited to 15 characters
    if (playerName.length > 15) {
        alert("Name cannot exceed 15 characters.");
        return;
    }

    fetch("https://titanium-glittery-impala.glitch.me/leaderboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ player: playerName, score: score })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Score submitted:", data);
        displayLeaderboard(data.leaderboard);  // Display updated leaderboard
    })
    .catch(error => {
        console.error("Error submitting score:", error);
    });
}


function displayLeaderboard(leaderboard) {
    const leaderboardElement = document.querySelector('.leaderboard');
    leaderboardElement.innerHTML = "";  // Clear current leaderboard

    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.player} - ${entry.score}`;
        leaderboardElement.appendChild(listItem);
    });
}

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

function restartAudio(audio) {
    audio.currentTime = 0;
    audio.play();

}

function newInvaderWave() {
    for (let i = 0; i < 5; i++) {
        const randomType = invaderTypes[Math.floor(Math.random() * invaderTypes.length)];
        invaders.push(new Invader(Math.random() * (canvas.width - 50), Math.random() * -300, randomType));
    }
}

// Key listeners IMPORTANT
window.addEventListener("keydown", (e) => keys[e.code] = true);
window.addEventListener("keyup", (e) => keys[e.code] = false);

function checkCollision(bullet, invader) {
    return bullet.x < invader.x + invader.width &&
        bullet.x + bullet.width > invader.x &&
        bullet.y < invader.y + invader.height &&
        bullet.y + bullet.height > invader.y;
}

function update() {
    if (!gameRunning) return;

    if (invaders.length === 0) {
        newInvaderWave();
    }
    
    // Player movement
    if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
    if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;

    // Bullet movement
    player.bullets.forEach((bullet, index) => {
        bullet.y -= 7;
        if (bullet.y < 0) player.bullets.splice(index, 1);
    });

    // Invader movement logic
    invaders.forEach((invader, invIndex) => {
        invader.move();

        if (Math.random() < 0.005) { // Adjust for bomb drop rate INVADERS
            bombs.push(new Bomb(invader.x + invader.width / 2, invader.y + invader.height));
        }

        player.bullets.forEach((bullet, bIndex) => {
            if (checkCollision(bullet, invader)) {
                player.bullets.splice(bIndex, 1);
                invaders.splice(invIndex, 1);
                currentScore++;
                userScoreCounter.innerHTML = currentScore;
            }
        })
    })
    bombs.forEach((bomb, bIndex) => {
        bomb.move();
    
        // Remove bomb if bottom
        if (bomb.y > canvas.height) {
            bombs.splice(bIndex, 1);
        }
    
        // Check for collision with player
        if (
            bomb.x < player.x + player.width &&
            bomb.x + bomb.width > player.x &&
            bomb.y < player.y + player.height &&
            bomb.y + bomb.height > player.y
        ) {
            playerLives--; // Reduce lives on collision
            bombs.splice(bIndex, 1); // Remove the bomb
            if (playerLives <= 0) {

                stopAudio(poschMusic);
                restartAudio(poschGameOver);
                gameOver = true; // End the game
                gameRunning = false; // End the game


                const playerName = prompt("Enter your name (15 character limit):");
                submitScore(playerName, currentScore);  

                
            } else {
                // Reset the player position if still alive
                player.x = canvas.width / 2 - 25;
                player.y = canvas.height - 60;
            }
        }
    })};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameRunning && gameOver) {




        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2 - 60);
        ctx.fillStyle = "red";
        ctx.font = "25px Arial";
        ctx.fillText("You Suck!", canvas.width / 2 - 100, canvas.height / 2 -40);
        ctx.fillText("Press Enter to Restart", canvas.width / 2 - 140, canvas.height / 2 + 30);
        return;
    }


    if (!gameRunning && !gameOver) {
        
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Posch Invaders", canvas.width / 2 - 100, canvas.height / 2 - 40);
        ctx.fillText("Press Enter to Start", canvas.width / 2 - 140, canvas.height / 2 + 20);
        return;
    }


    
    // Draw player using image
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    
    // Draw bullets
    ctx.fillStyle = "red";
    player.bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    //Draw invaders
    invaders.forEach(invader => invader.draw());
    // Draw bombs for invaders
    bombs.forEach(bomb => bomb.draw());
    //Lives
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Lives: " + playerLives, 10, 30);

}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Shoot bullets
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && gameRunning) {
        poschGrunt.play();
        player.bullets.push({ x: player.x + player.width / 2 - 5, y: player.y, width: 5, height: 10 });
    }
});

// Start game and restart game
window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !gameRunning) {
        stopAudio(poschGameOver);
        
        restartAudio(poschMusic);

        // Reset lives and score
        playerLives = 3;
        currentScore = 0;
        userScoreCounter.innerHTML = currentScore;
        
        // Reset game state
        invaders.length = 0; // Clear invaders
        bombs.length = 0; // Clear bombs
        
        // Reinitialize game
        for (let i = 0; i < 5; i++) {
            const randomType = invaderTypes[Math.floor(Math.random() * invaderTypes.length)];
            invaders.push(new Invader(Math.random() * (canvas.width - 50), Math.random() * -300, randomType));
        }

        gameRunning = true;
    } else

    if (e.code === "Enter" && gameOver && !gameRunning) {
        stopAudio(poschGameOver);
        gameOver = false;
        restartAudio(poschMusic);
        

        // Reset lives and score
        playerLives = 3;
        currentScore = 0;
        userScoreCounter.innerHTML = currentScore;
        
        // Reset game state
        invaders.length = 0; // Clear invaders
        bombs.length = 0; // Clear bombs
        
        // Reinitialize game
        for (let i = 0; i < 5; i++) {
            const randomType = invaderTypes[Math.floor(Math.random() * invaderTypes.length)];
            invaders.push(new Invader(Math.random() * (canvas.width - 50), Math.random() * -300, randomType));
        }

        gameRunning = true;
    }
});
gameLoop();
