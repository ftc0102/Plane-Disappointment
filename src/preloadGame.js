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
        this.load.image('suitcase', './assets/suitcase3.png');
        this.load.image('soda', './assets/sodacan.png');
        this.load.image('gameOverScreen', './assets/gameOverTicket.png');

        // menuscreen
        this.load.image('menuscreen', './assets/menuscreen.jpg');

        //infoscreen backgrounds
        this.load.image('input_1', './assets/input_1.jpg');
        this.load.image('input_2', './assets/input_2.jpg');

        // Mouse Click Sound
        this.load.audio('mouseClick', './assets/mouseClick2.ogg');
        
        // Flight attendant texture atlas
        this.load.atlas('fa', './assets/spritesheet.png', './assets/sprites.json');

        // bgm
        this.load.audio('backgroundMusic', './assets/bgm.mp3');
        this.load.audio('playerInfoMusic', './assets/relaxingchillstuff.mp3');

        // Keyboard clicking
        this.load.audio('playerTypingNoise', './assets/keyboardClicksVersion2.mp3');

        // Airplane beep
        this.load.audio('airplaneBeep', './assets/airplaneBeep.mp3');

        //error sound
        this.load.audio('sfx_error', './assets/error.wav');
        
        //pick up sfx
        this.load.audio('sfx_pickUp', './assets/pickupsfx.mp3');
        
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
            frameRate: 8,
            repeat: -1
        });

        this.scene.start("splashScreen");
    }
}