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
        this.load.spritesheet('dino', './assets/dinoSprites.png', { frameWidth: 24, frameHeight: 24});
        //temp bgm
        this.load.audio('backgroundMusic', './assets/bgm.mp3');
        
    }
    create(){
           // dino animation
           this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('dino', {start: 4, end: 9, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.scene.start("splashScreen");
    }
}