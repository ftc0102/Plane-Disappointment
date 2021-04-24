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
    width: 720,
    height: 480,
    scene: [splashScreen, Game],
}

let game = new Phaser.Game(config);


// These are duck and jump, respectively
let keyDOWN, keyUP;