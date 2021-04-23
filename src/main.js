let config = {
    type: Phaser.CANVAS,
    // We can fiddle with the width and height
    width: 720,
    height: 480,
    scene: [splashScreen, gameScene],
}

let game = new Phaser.Game(config);


// These are duck and jump, respectively
let keyDOWN, keyUP;