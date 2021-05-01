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
        this.load.image('suitcase', './assets/suitcase.png');

        // Mouse Click Sound
        this.load.audio('mouseClick', './assets/mouseClick2.ogg');
        
        // Flight attendant texture atlas
        this.load.atlas('fa', './assets/spritesheet.png', './assets/sprites.json');

        //temp bgm
        this.load.audio('backgroundMusic', './assets/bgm.mp3');
        
    }
    create(){
        this.anims.create({
            key: 'farun',
            frames: this.anims.generateFrameNames('fa', { 
                start: 1,
                end: 6, 
                prefix: 'flight_attendant_run_',
                zeroPad: 4    
            }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.start("splashScreen");
    }
}