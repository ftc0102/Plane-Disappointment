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
    scene: [preloadGame, splashScreen, getPlayerInfo, getLocation, Game],
}

let game = new Phaser.Game(config);
let bgMusic;

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