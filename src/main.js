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
<<<<<<< Updated upstream
=======


// These are duck and jump, respectively
// I forgot how to do the shortcut that Adam showed in lecture, so if you do you can replace this code.
// let keyDOWN, keyUP;
>>>>>>> Stashed changes
