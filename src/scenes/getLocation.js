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

        //pointer created to confirm player input is in or not
        this.mouse2 = this.input.activePointer;

        typingSound = this.sound.add('playerTypingNoise');
        this.airplaneBeep = this.sound.add("airplaneBeep");
        this.mouseClick = this.sound.add('mouseClick');
        this.inputBG_2 = this.add.image(0, 0, 'input_2').setOrigin(0,0);
    
        playerInputLocation = this.add.text(200, 389, '', answerConfig);
    
        this.input.keyboard.on('keydown', function (event) { //keyboard input code credits from: https://phaser.io/examples/v3/view/input/keyboard/text-entry

            //A document that explains each unique keycode: https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js 
            
            if (event.keyCode === 8 && playerInputLocation.text.length > 0) { //this is the backspace key; to delete the typed text from playerInput.text string
                typingSound.play();
                playerInputLocation.text = playerInputLocation.text.substr(0, playerInputLocation.text.length - 1);
            } else if (playerInputLocation.text.length >= 20) { //if it's too long, it won't insert more input
                console.log('too long');
            } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) { // this is to add space and all upper and lower captial letters to the playerInput.text string
                typingSound.play();
                playerInputLocation.text += event.key; 
                info.name = playerInputLocation.text;
                console.log('player name is ' + info.name); //debug
            }

        });
        
    }

    update () {
        if (this.mouse2.isDown && playerInputLocation.text.length > 0) { //check if there is input when players click
            this.airplaneBeep.play();
            this.scene.start('gameScene');
        }
    }
    
}