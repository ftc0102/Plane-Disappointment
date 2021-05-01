class preloadGame extends Phaser.Scene{
    constructor(){
        super("preloadGame");
    }
    preload(){
        // Temp art for parallax background
        // Credit to MarwaMJ on Itch.io for assets
        // Credit to Ourcade on Youtube for tutorial https://www.youtube.com/watch?v=Y3C5HliTDwM
        //this.load.image('sky', './assets/sky.png');
        this.load.image('sky', './assets/background_0_5.png');
        this.load.image('cloud', './assets/background_1.png');
        this.load.image('witch', './assets/background_1_5.png');
        this.load.image('ground', './assets/background_2.png');
        this.load.image('interior', './assets/background_3.png');
        this.load.image('foreground', './assets/background_4.png');

        // temp atlas
        this.load.atlas('chefsprite', './assets/spritesheet.png', './assets/sprites.json');


        // Mouse Click Sound
        this.load.audio('mouseClick', './assets/mouseClick2.ogg');
        // Player temp art
        // this.load.spritesheet('dino', './assets/dinoSprites.png', { frameWidth: 24, frameHeight: 24});
        //temp bgm
        this.load.audio('backgroundMusic', './assets/bgm.mp3');
        
    }
    create(){
           // dino animation
        //    this.anims.create({
        //     key: 'run',
        //     frames: this.anims.generateFrameNumbers('dino', {start: 4, end: 9, first: 0}),
        //     frameRate: 10,
        //     repeat: -1
        // });

        this.anims.create({
            key: 'chef',
            frames: this.anims.generateFrameNames('chefsprite', { 
                end: 40, 
                prefix: 'ChefWalk-right-',
                zeroPad: 2,
                
            }),
            frameRate: 30,
            repeat: -1
        });
        this.scene.start("splashScreen");
    }
}