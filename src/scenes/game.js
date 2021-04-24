class Game extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    preload() {
        // All our game assets go here
        // Like background art, sprites, bgm, etc

        // Temp art for parallax background
        // Credit to MarwaMJ on Itch.io
        this.load.image('sky', './assets/sky.png')
        this.load.image('mountains', './assets/mountains.png')
        this.load.image('plateau', './assets/plateau.png')
        this.load.image('plants', './assets/plants.png')
        this.load.image('ground', './assets/ground.png')
    }

    create() {

        // Mouse click to jump
        this.input.on('pointerdown', function (pointer) {
            // this.INSERTPLAYERCONTROLLERCLASSHERE.x = pointer.x
        }, this);

        // Keyboard Inputs
        // I forgot how to do the shortcut that Adam showed in lecture, so if you do you can replace this code.
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

        // For the eventual scrolling backgrond
        const width = this.scale.width
        const height = this.scale.height





    }

    update() {
        // Here's my proposal on how we do the world generation:
        // We create prefab scenes that we then generate through code to appear in the game scene
        // We can make like a set of obstacles, save it as a prefab, and have the game cycle through a set of them
        // It'll definitely be the most difficult part of our project, and I'm not sure if I have the skills to tackle it
    }


}