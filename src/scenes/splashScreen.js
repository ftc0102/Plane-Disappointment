class splashScreen extends Phaser.Scene {
    constructor() {
        // Main Menu
        super("splashScreen");
    }

    preload() {
        // Load main menu assets here
        // It can be cute art and music
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Temp Text
        this.add.text(game.config.width/2, game.config.height/2, 'PLANE DISAPPOINTMENT', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 'LEFT CLICK TO PLAY', menuConfig).setOrigin(0.5);

        // sound for clicking
        this.mouseClick = this.sound.add('mouseClick');
        
    }

    update() {
        // Basic input controls go here
        // Click or Spacebar to start game
        this.input.on('pointerdown', function (pointer) {
            this.mouseClick.play();
            this.scene.start('gameScene');
        }, this);
    }
}