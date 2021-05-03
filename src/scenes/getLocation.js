class getLocation extends Phaser.Scene {
    constructor() {
        super("locationScreen");
    }

    create () {

        if (!infoMusic) {
            infoMusic = this.sound.add('playerInfoMusic', { volume: 0.3 });
            infoMusic.play({
              loop: true,
            });
        }

        if (typingSound) {
            typingSound.stop();
        }

        typingSound = this.sound.add('playerTypingNoise');
        this.airplaneBeep = this.sound.add("airplaneBeep");
        this.mouseClick = this.sound.add('mouseClick');
        this.inputBG_2 = this.add.image(0, 0, 'input_2').setOrigin(0,0);
    
        var playerInputLocation = this.add.text(game.config.width/4, game.config.height/1.75, '', answerConfig);
    
        this.input.keyboard.on('keydown', function (event) { //keyboard input code credits from: https://phaser.io/examples/v3/view/input/keyboard/text-entry

            //A document that explains each unique keycode: https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js 
            
            if (event.keyCode === 8 && playerInputLocation.text.length > 0) {   //this is the backspace key; to delete the typed text from playerInput.text string
                playerInputLocation.text = playerInputLocation.text.substr(0, playerInputLocation.text.length - 1); //delete input
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {   // this is to add space and all upper and lower captial letters to the input string
                typingSound.play();
                playerInputLocation.text += event.key; 
                info.arrivingLocation = playerInputLocation.text;
                console.log(info.name + ' is going to ' + info.arrivingLocation); //debug

            }

        });
        
        // for debug purposes, when you mouse click, it brings you to the game scene
        this.input.on('pointerdown', function (pointer) {
            this.airplaneBeep.play();
            this.scene.start('gameScene');
        }, this);

    }
    
}