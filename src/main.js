//
//
// Names: Dany, Emily, Fion, Gillian
// Game Title: Plane Disappointment
// Date Completed:
// Creative Tilt:
//
//
//
//

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
            debug: true,
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

let floorHorizontal = game.config.width/2;
let floorVertical = game.config.height * .90;
//debug - press D to get game over
let keyD;

let info = {
    highestScore: 0,
    name: 'Bob',
    arrivingLocation: 'New York'
}

// font config for info screens
let answerConfig = {
    fill: '#4F3421',
    fontFamily: 'pixelFont',
    fontSize: '120px',
    align: 'left',
    padding: {
        top: 5,
        bottom: 5,
        right: 400
    }
    //fixedWidth: 1280
}