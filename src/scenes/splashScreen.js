class splashScreen extends Phaser.Scene {
    constructor() {
        // Main Menu
        super("splashScreen");
    }

    create() {
        // menuscreen art
        // credits to Måns Grebäck from fontspace.com for use of the Aeronaves Font
        this.menuscreen = this.add.image(game.config.width/2, game.config.height/2, 'menuscreen');

        // sound for clicking
        this.mouseClick = this.sound.add('mouseClick');
        this.airplaneBeep = this.sound.add("airplaneBeep");

        //clicks to move to info scenes
        this.input.on('pointerdown', function (pointer) {
            this.airplaneBeep.play();
            this.scene.start('playerNameScreen');
        }, this);
        
    }
}