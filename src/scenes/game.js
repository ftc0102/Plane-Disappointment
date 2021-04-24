class Game extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    preload() {
        // All our game assets go here
        // Like character art, sprites, etc
    }

    create() {

        // Mouse click to jump
        this.input.on('pointerdown', function (pointer) {
            // this.INSERTPLAYERCONTROLLERCLASSHERE.x = pointer.x
        }, this);

        // Keyboard Inputs
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);


        // Temporary Enemy
        this.add.rectangle(
            game.config.width / 2,
            game.config.height / 2,
            48,
            48,
            0xff0000,
        )

    }

    update() {
        // Here's my proposal on how we do the world generation:
        // We create prefab scenes that we then generate through code to appear in the game scene
        // We can make like a set of obstacles, save it as a prefab, and have the game cycle through a set of them
        // It'll definitely be the most difficult part of our project, and I'm not sure if I have the skills to tackle it
    }


}