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
    scene: [preloadGame, splashScreen, Game],
}

let game = new Phaser.Game(config);
let bgMusic;

// Added keyR for restart game
let keyR;

//debug - press D to get game over
let keyD;