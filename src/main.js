//
//
// Plane Disappointment
// A game by:
// Dany -  Audio, SFX, Programming
// Emily - Programming
// Fion - Background Art, Character Animations, UX
// Gillian - Menu Art, Sprite Art, UI
// Game Title: Plane Disappointment
// Date Completed: 3 May 2021
// Creative Tilt: 
//
// Emily is quite happy with her randomization implementation for the suitcases and soda
// 
// Our game has very defined aesthetics, with the setpiece of an airplane tying our game 
// Due to having a very art-leaning team, we tried to maximize the aesthetic aspects of our game

let config = {
    type: Phaser.CANVAS,
    // We can fiddle with the width and height later
    width: 1280,
    height: 720,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [preloadGame, splashScreen, getName, getLocation, Game],
}

let game = new Phaser.Game(config);
let bgMusic;
let infoMusic;
let typingSound;

// Added keyR for restart game
let keyR;
//some global vars
let floorHorizontal = game.config.width/2;
let floorVertical = game.config.height * .90;
let suitcaseTimer = 0;
let sodaTimer = 0;
let suitcaseRNG, sodaRNG, sodaPattern; 
let suitStart = 2
let suitEnd = 4;
//debug - press D to get game over
let keyD;

let playerInput;
let playerInputLocation;

let info = {
    highestScore: 0,
    name: 'Bob',
    arrivingLocation: 'New York'
}

// font config for info screens
let answerConfig = {
    fill: '#4F3421',
    fontFamily: 'pixelFont',
    fontSize: '110px',
    align: 'left',
    padding: {
        top: 5,
        bottom: 5,
        right: 400
    }
    //fixedWidth: 1280
}