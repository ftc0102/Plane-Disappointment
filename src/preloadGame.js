class preloadGame extends Phaser.Scene{
    constructor(){
        super("preloadGame");
    }
    preload(){
        // Temp art for parallax background
        // Credit to MarwaMJ on Itch.io for assets
        // Credit to Ourcade on Youtube for tutorial https://www.youtube.com/watch?v=Y3C5HliTDwM
        this.load.image('sky', './assets/sky.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('plateau', './assets/plateau.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('plant', './assets/plant.png');

        // Mouse Click Sound
        this.load.audio('mouseClick', './assets/mouseClick2.ogg');
        // Player temp art
        this.load.atlas('tempArt', './assets/dinoSprites.png', { frameWidth: 24, frameHeight: 1});

    }
    create(){
        this.scene.start("splashScreen");
    }
}