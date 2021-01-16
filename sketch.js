/*

The Game Project 7 - Make it Awesome

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var clouds;
var mountains;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;

var hasFallen;
var hasWon;

var jumpSound;
var collectSound;

var platforms;
var enemies;

function preload() {
    soundFormats('mp3', 'wav');

    //jump sound
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);

    //collect sound
    collectSound = loadSound('assets/sfx_point.wav');
    collectSound.setVolume(0.1);
}

function setup() {

    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    lives = 3;
    startGame();
}

function startGame() {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;

    // Variable to control the background scrolling.
    scrollPos = 0;

    // Variable to store the real position of the gameChar in the game
    // world. Needed for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;

    // Boolean variables to control the movement of the game character.
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    // Boolean variables to check whether game is won or lost.
    hasWon = false;
    hasFallen = false;

    // Initialise arrays of scenery objects.
    trees_x = [-250, -150, -50, 650, 1250, 1350,
                1750, 2250, 2500, 2750, 3240, 3340,
                3700, 4200, 4700, 4900, 5300];

    clouds = [
        {
            xPos: 50,
            yPos: 12,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 500,
            yPos: 3,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 1000,
            yPos: 12,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 1500,
            yPos: 3,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 2000,
            yPos: 12,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 2500,
            yPos: 3,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 3000,
            yPos: 12,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 3500,
            yPos: 3,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 4000,
            yPos: 12,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 4500,
            yPos: 3,
            xSize: 100,
            ySize: 130
        },
        {
            xPos: 5000,
            yPos: 12,
            xSize: 100,
            ySize: 130
        }
    ];

    mountains = [
        {
            xPos: -725,
            yPos: 20
        },
        {
            xPos: 110,
            yPos: 20
        },
        {
            xPos: 510,
            yPos: 20
        },
        {
            xPos: 1100,
            yPos: 20
        },
        {
            xPos: 1260,
            yPos: 20
        },
        {
            xPos: 2100,
            yPos: 20
        },
        {
            xPos: 3000,
            yPos: 20
        },
        {
            xPos: 3120,
            yPos: 20
        },
        {
            xPos: 3400,
            yPos: 20
        },
        {
            xPos: 4200,
            yPos: 20
        },
        {
            xPos: 4500,
            yPos: 20
        },
    ];

    collectables = [
        {
            xPos: 60,
            yPos: floorPos_y - 100,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 250,
            yPos: floorPos_y,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 650,
            yPos: floorPos_y - 135,
            xSize: 40,
            ySize: 50,
            isFound: false
        },
        {
            xPos: 1050,
            yPos: floorPos_y - 135,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 1550,
            yPos: floorPos_y - 20,
            xSize: 20,
            ySize: 30,
            isFound: false
        },
        {
            xPos: 2050,
            yPos: floorPos_y - 145,
            xSize: 50,
            ySize: 80,
            isFound: false
        },
        {
            xPos: 2550,
            yPos: floorPos_y - 130,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 3050,
            yPos: floorPos_y,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 3300,
            yPos: floorPos_y,
            xSize: 20,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 3550,
            yPos: floorPos_y - 130,
            xSize: 30,
            ySize: 60,
            isFound: false
        },
        {
            xPos: 4050,
            yPos: floorPos_y - 100,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 4550,
            yPos: floorPos_y - 120,
            xSize: 30,
            ySize: 40,
            isFound: false
        },
        {
            xPos: 5350,
            yPos: floorPos_y,
            xSize: 30,
            ySize: 40,
            isFound: false
        }
    ];

    canyons = [
        {
            xPos: 85,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 1085,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 1585,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 2085,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 3085,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 3485,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 4085,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
        {
            xPos: 5085,
            yPos: 432,
            xSize: 145,
            ySize: 500
        },
    ];

    game_score = 0;

    flagpole = {
        xPos: 5500,
        isReached: false
    };

    platforms = [];

    platforms.push(createPlatform(100, floorPos_y - 100, 250));
    platforms.push(createPlatform(650, floorPos_y - 130, 250));
    platforms.push(createPlatform(1250, floorPos_y - 100, 250));
    platforms.push(createPlatform(1850, floorPos_y - 120, 250));
    platforms.push(createPlatform(2300, floorPos_y - 100, 250));
    platforms.push(createPlatform(2900, floorPos_y - 130, 250));
    platforms.push(createPlatform(3800, floorPos_y - 120, 250));

    enemies = [];
    enemies.push(new Enemy(0, floorPos_y, 80));
    enemies.push(new Enemy(300, floorPos_y, 780));
    enemies.push(new Enemy(1300, floorPos_y, 500));
    enemies.push(new Enemy(2700, floorPos_y, 600));
    enemies.push(new Enemy(4400, this.x, 810));
    enemies.push(new Enemy(4200, this.x, 900));

}


function draw() {

    background(19, 24, 98); // fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height / 4); // draw some green ground

    push();
    translate(scrollPos, 0);

    drawClouds();

    drawMountains();

    drawTrees();

    for (var i = 0; i < collectables.length; i++) {
        if (collectables[i].isFound != true) {
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }

    for (var i = 0; i < canyons.length; i++) {
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

    if (isPlummeting == true) {
        gameChar_y += 10;
        isRight = false;
        isLeft = false;
    }

    // Ending the level
    renderFlagPole();

    // drawing platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    //drawing enemies
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i].isContact(gameChar_world_x, gameChar_y)) {
            PlayerhasFallen();
            break;
        }
    }

    pop();

    // Draw game character.
    drawGameChar();

    // Draw screen text
    fill(255, 255, 255);
    noStroke();
    textSize(15);
    text("score: " + game_score, 20, 20);

    // Check if player dies
    checkPlayerDeath()

    // Draw life tokens
    for (var i = 0; i < lives; i++) {
        stroke(251, 244, 147);
        strokeWeight(5);
        fill(238, 206, 16);
        ellipse(32 * i + 900, 20, 22, 26);
    }

    // Game over text
    if (hasFallen) {
        noStroke();
        fill(255, 255, 255);
        textSize(30);
        text("Game over!!! Press Space to Continue", 270, height / 2);
        return;
    }

    // Level complete text
    if (hasWon) {
        noStroke();
        fill(255, 255, 255);
        textSize(30);
        text("Level Complete! Press space to continue", 270, height / 2);
        return;
    }

    // Logic to make the game character move or the background scroll.
    if (isLeft) {
        if (gameChar_x > width * 0.2) {
            gameChar_x -= 5;
        } else {
            scrollPos += 5;
        }
    }

    if (isRight) {
        if (gameChar_x < width * 0.8) {
            gameChar_x += 5;
        } else {
            scrollPos -= 5; // negative for moving against the background
        }
    }

    // Logic to make the game character rise and fall.
    if (gameChar_y < floorPos_y) {

        var isContact = false;

        for (var i = 0; i < platforms.length; i++) {
            if (
                platforms[i].checkContact(gameChar_world_x, gameChar_y) == true
            ) {
                isContact = true;
                break;
            }
        }

        if (isContact == false) {
            gameChar_y += 2;
            isFalling = true;
        } else {
            isFalling = false;
        }

    } else {
        isFalling = false;
    }

    // Logic to check end of game is reached
    if (flagpole.isReached != true) {
        checkFlagpole();
    } else {
        isRight = false;
        isLeft = false;
        gameChar_y = floorPos_y;
    }

    // Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - scrollPos;
}

function keyPressed() {

    //	console.log("keyPressed: " + key);
    //	console.log("keyPressed: " + keyCode);

    if (flagpole.isReached && keyCode == 32) {
        nextLevel();
        return
    } else if (lives == 0 && keyCode == 32) {
        returnToStart();
        return
    }

    if (keyCode == 39) {
        isRight = true;
    }

    if (keyCode == 37) {
        isLeft = true;
    }

    if (keyCode == 32) {
        if (gameChar_y == floorPos_y) {
            gameChar_y -= 130;
            jumpSound.play();
        }
    }
}

function keyReleased() {

    if (keyCode == 39) {
        isRight = false;
    }

    if (keyCode == 37) {
        isLeft = false;
    }
}

// Function to draw the game character.

function drawGameChar() {

    if (isLeft && isFalling) {
        // jumping-left code

        fill(0, 100, 0);
        rect(gameChar_x - 12, gameChar_y - 40, 24, 38, 4);
        fill(0, 0, 0);
        rect(gameChar_x - 12, gameChar_y - 20, 24, 14);
        fill(0, 100, 0);
        ellipse(gameChar_x, gameChar_y - 32, 28, 45);
        fill(255, 228, 196);
        ellipse(gameChar_x, gameChar_y - 57, 30, 35);
        fill(255, 228, 196);
        ellipse(gameChar_x - 15, gameChar_y - 36, 12, 11);
        fill(255, 255, 255);
        ellipse(gameChar_x - 13, gameChar_y - 58, 5, 12);
        fill(0, 0, 0);
        ellipse(gameChar_x - 15, gameChar_y - 58, 2, 2);
        fill(0, 0, 0);
        ellipse(gameChar_x - 10, gameChar_y - 48, 6, 7);
    } else if (isRight && isFalling) {
        // jumping-right code

        fill(0, 100, 0);
        rect(gameChar_x - 12, gameChar_y - 40, 24, 38, 4);
        fill(0, 0, 0);
        rect(gameChar_x - 12, gameChar_y - 20, 24, 14);
        fill(0, 100, 0);
        ellipse(gameChar_x, gameChar_y - 32, 28, 45);
        fill(255, 228, 196);
        ellipse(gameChar_x, gameChar_y - 57, 30, 35);
        fill(255, 228, 196);
        ellipse(gameChar_x + 14, gameChar_y - 36, 12, 11);
        fill(255, 255, 255);
        ellipse(gameChar_x + 13, gameChar_y - 58, 5, 12);
        fill(0, 0, 0);
        ellipse(gameChar_x + 15, gameChar_y - 58, 2, 2);
        fill(0, 0, 0);
        ellipse(gameChar_x + 10, gameChar_y - 48, 6, 7);
    } else if (isLeft) {
        // walking left code

        fill(0, 100, 0);
        rect(gameChar_x - 12, gameChar_y - 40, 24, 38, 4);
        fill(0, 0, 0);
        rect(gameChar_x - 12, gameChar_y - 20, 24, 14);
        fill(0, 100, 0);
        ellipse(gameChar_x, gameChar_y - 32, 28, 45);
        fill(255, 228, 196);
        ellipse(gameChar_x, gameChar_y - 57, 30, 35);
        fill(255, 228, 196);
        ellipse(gameChar_x - 15, gameChar_y - 28, 12, 11);
        fill(255, 255, 255);
        ellipse(gameChar_x - 13, gameChar_y - 58, 5, 12);
        fill(0, 0, 0);
        ellipse(gameChar_x - 15, gameChar_y - 58, 2, 2);
        fill(0, 0, 0);
        ellipse(gameChar_x - 10, gameChar_y - 48, 6, 7);
    } else if (isRight) {
        // walking right code

        fill(0, 100, 0);
        rect(gameChar_x - 12, gameChar_y - 40, 24, 38, 4);
        fill(0, 0, 0);
        rect(gameChar_x - 12, gameChar_y - 20, 24, 14);
        fill(0, 100, 0);
        ellipse(gameChar_x, gameChar_y - 32, 28, 45);
        fill(255, 228, 196);
        ellipse(gameChar_x, gameChar_y - 57, 30, 35);
        fill(255, 228, 196);
        ellipse(gameChar_x + 15, gameChar_y - 28, 12, 11);
        fill(255, 255, 255);
        ellipse(gameChar_x + 13, gameChar_y - 58, 5, 12);
        fill(0, 0, 0);
        ellipse(gameChar_x + 15, gameChar_y - 58, 2, 2);
        fill(0, 0, 0);
        ellipse(gameChar_x + 10, gameChar_y - 48, 6, 7);
    } else if (isFalling || isFalling) {
        // jumping facing forwards code

        fill(0, 100, 0);
        rect(gameChar_x - 12, gameChar_y - 40, 24, 38, 4);
        fill(0, 0, 0);
        rect(gameChar_x - 12, gameChar_y - 20, 24, 14);
        fill(0, 100, 0);
        ellipse(gameChar_x, gameChar_y - 32, 32, 45);
        fill(255, 228, 196);
        ellipse(gameChar_x, gameChar_y - 57, 40, 35);
        fill(255, 228, 196);
        ellipse(gameChar_x - 15, gameChar_y - 36, 12, 11);
        ellipse(gameChar_x + 15, gameChar_y - 36, 12, 11);
        fill(255, 255, 255);
        ellipse(gameChar_x - 8, gameChar_y - 58, 13, 15);
        ellipse(gameChar_x + 8, gameChar_y - 58, 13, 15);
        fill(0, 0, 0);
        ellipse(gameChar_x - 8, gameChar_y - 58, 5, 5);
        ellipse(gameChar_x + 8, gameChar_y - 58, 5, 5);
        fill(0, 0, 0);
        ellipse(gameChar_x, gameChar_y - 46, 9, 5);
    } else {
        // standing front facing code

        fill(0, 100, 0);
        rect(gameChar_x - 12, gameChar_y - 40, 24, 38, 4);
        fill(0, 0, 0);
        rect(gameChar_x - 12, gameChar_y - 20, 24, 14);
        fill(0, 100, 0);
        ellipse(gameChar_x, gameChar_y - 32, 32, 45);
        fill(255, 228, 196);
        ellipse(gameChar_x, gameChar_y - 57, 40, 35);
        fill(255, 228, 196);
        ellipse(gameChar_x - 15, gameChar_y - 28, 12, 11);
        ellipse(gameChar_x + 15, gameChar_y - 28, 12, 11);
        fill(255, 255, 255);
        ellipse(gameChar_x - 8, gameChar_y - 58, 13, 15);
        ellipse(gameChar_x + 8, gameChar_y - 58, 13, 15);
        fill(0, 0, 0);
        ellipse(gameChar_x - 8, gameChar_y - 58, 5, 5);
        ellipse(gameChar_x + 8, gameChar_y - 58, 5, 5);
        fill(0, 0, 0);
        ellipse(gameChar_x, gameChar_y - 46, 9, 5);
    }
}

// Function to draw cloud objects.
function drawClouds() {

    for (var i = 0; i < clouds.length; i++) {
        fill(255, 255, 255);
        arc(clouds[i].xPos + 142, clouds[i].yPos + 108, clouds[i].xSize, clouds[i].ySize, PI + TWO_PI, TWO_PI);
        arc(clouds[i].xPos + 102, clouds[i].yPos + 108, clouds[i].xSize, clouds[i].ySize - 55, PI + TWO_PI, TWO_PI);
        arc(clouds[i].xPos + 212, clouds[i].yPos + 108, clouds[i].xSize, clouds[i].ySize - 65, PI + TWO_PI, TWO_PI);
        arc(clouds[i].xPos + 182, clouds[i].yPos + 108, clouds[i].xSize, clouds[i].ySize - 30, PI + TWO_PI, TWO_PI);
    }
}

// Function to draw mountains objects.
function drawMountains() {

    for (var i = 0; i < mountains.length; i++) {
        fill(97, 139, 15);
        strokeWeight(0);
        triangle(mountains[i].xPos + 180, mountains[i].yPos + 412, mountains[i].xPos + 550, mountains[i].yPos + 412, mountains[i].xPos + 380, mountains[i].yPos + 160);

        fill(97, 139, 15);
        strokeWeight(0);
        triangle(mountains[i].xPos + mountains[i], mountains[i].yPos + 412, mountains[i].xPos + 750, mountains[i].yPos + 412, mountains[i].xPos + 580, mountains[i].yPos + 160);

        fill(168, 198, 43);
        strokeWeight(0);
        triangle(mountains[i].xPos + 280, mountains[i].yPos + 412, mountains[i].xPos + 650, mountains[i].yPos + 412, mountains[i].xPos + 480, mountains[i].yPos + 180);
    }
}

// Function to draw trees objects.
function drawTrees() {

    for (var i = 0; i < trees_x.length; i++) {
        strokeWeight(1);
        stroke(0);
        fill(165, 42, 42);
        rect(75 + trees_x[i], -200 / 2 + floorPos_y, 50, 200 / 2);

        fill(112, 155, 17);
        stroke(0);
        triangle(trees_x[i], -200 / 4 + floorPos_y, trees_x[i] + 100, -200 * 3 / 4 + floorPos_y, trees_x[i] + 200, -200 / 4 + floorPos_y);

        fill(112, 155, 17);
        triangle(trees_x[i] + 25, -200 / 2 + floorPos_y, trees_x[i] + 100, -200 + floorPos_y, trees_x[i] + 175, -200 / 2 + floorPos_y);
        noStroke();
    }
}

// Function to draw canyon objects.
function drawCanyon(t_canyon) {

    noStroke();
    fill(0, 0, 0);
    arc(t_canyon.xPos + t_canyon.xSize / 2, t_canyon.yPos, t_canyon.xSize, t_canyon.ySize, TWO_PI, PI + TWO_PI);
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon) {

    if ((gameChar_world_x < (t_canyon.xPos + t_canyon.xSize / 2) + 55) &&
        (gameChar_world_x > (t_canyon.xPos - t_canyon.xSize / 2) + 85) &&
        (gameChar_y >= floorPos_y)) {
        isPlummeting = true;
    }
}

// Function to draw collectable objects.
function drawCollectable(t_collectable) {

    stroke(251, 244, 147);
    strokeWeight(8);
    fill(238, 206, 16);
    ellipse(t_collectable.xPos + 30, t_collectable.yPos - 28, t_collectable.xSize, t_collectable.ySize);
    noStroke();
}

// Function to check character has collected an item.
function checkCollectable(t_collectable) {

    var d = dist(gameChar_world_x, gameChar_y, t_collectable.xPos + 30, t_collectable.yPos - 28);

    if (d > 2 && d < 57 && gameChar_y) {
        t_collectable.isFound = true;
        collectSound.play();
        game_score += t_collectable.xSize;
    }
}

function renderFlagPole() {

    push();
    stroke(150);
    strokeWeight(5);
    line(flagpole.xPos, floorPos_y, flagpole.xPos, floorPos_y - 200);

    if (flagpole.isReached) {
        noStroke();
        fill(0, 0, 255);
        rect(flagpole.xPos, floorPos_y - 200, 50, 50);
    } else {
        noStroke();
        fill(0, 0, 255);
        rect(flagpole.xPos, floorPos_y - 50, 50, 50);
    }

    pop();
}

function checkFlagpole() {

    var d = abs(gameChar_world_x - flagpole.xPos);

    if (d < 50) {
        flagpole.isReached = true;
        hasWon = true;
    }
}

function createPlatform(x, y, length) {
    var p = {
        x: x,
        y: y,
        length: length,
        draw: function () {
            fill(128, 0, 0);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function (gc_x, gc_y) {
            //checks whether game char is in contact with the platform
            if (gc_x > this.x && gc_x < this.x + this.length) {

                var d = this.y - gc_y;

                if (d >= 0 && d < 5) {
                    return true;
                }
            }
        }
    }
    return p;
}

function PlayerhasFallen() {

    lives -= 1;

    if (lives > 0) {
        startGame();
    } else {
        hasFallen = true;
        lives = 0;
    }
}

function checkPlayerDeath() {

    if (gameChar_y > height) {
        PlayerhasFallen();
    }
}

function Enemy(x, y, range) {
    this.x = x
    this.y = y
    this.range = range
    this.current_x = x
    this.increment = 1;

    this.draw = function () {
        fill(255, 0, 0);
        ellipse(this.current_x, this.y - 25, 50);
        fill(255);
        ellipse(this.current_x - 5, this.y - 25, 5);
        ellipse(this.current_x + 5, this.y - 25, 5);
        strokeWeight(1);
        stroke(0);
        line(
            this.current_x - 15,
            this.y - 35,
            this.current_x - 5,
            this.y - 30
        );
        line(
            this.current_x + 15,
            this.y - 35,
            this.current_x + 5,
            this.y - 30
        )
        noStroke();
    }


    this.update = function () {
        this.current_x += this.increment;

        if (this.current_x < this.x) {
            this.increment = 1;
        } else if (this.current_x > this.x + this.range) {
            this.increment = -5;
        }
    }

    this.isContact = function (gc_x, gc_y) {
        /*returns true if contact is made*/
        var d = dist(gc_x, gc_y, this.current_x, this.y);

        if (d < 25) {
            return true;
        }
        return false;
    }
}

function returnToStart() {
    console.log('Restarted');
}

function nextLevel() {
    console.log('Next Level');
}