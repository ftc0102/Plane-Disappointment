class getName extends Phaser.Scene {
    constructor() {
        super("playerNameScreen");
    }

    create () {

        if (!infoMusic) {
            infoMusic = this.sound.add('playerInfoMusic', { volume: 0.3 });
            infoMusic.play({
              loop: true,
            });
        }

        //pointer created to confirm player input is in or not
        this.mouse = this.input.activePointer;

        typingSound = this.sound.add('playerTypingNoise');
        errorSound = this.sound.add('sfx_error', { volume: 0.4 });
        this.airplaneBeep = this.sound.add("airplaneBeep");
        this.mouseClick = this.sound.add('mouseClick');
        this.inputBG_1 = this.add.image(0, 0, 'input_1').setOrigin(0,0);

        //this.add.text(10, 10, 'Enter your name: \nClick to Proceed', {fontFamily: 'Comic Sans MS', fontSize: '28px'});
    
        playerInput = this.add.text(195, 385, '', answerConfig);
    
        this.input.keyboard.on('keydown', function (event) { //keyboard input code credits from: https://phaser.io/examples/v3/view/input/keyboard/text-entry
            
            //A document that explains each unique keycode: https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js 
            
            if (event.keyCode === 8 && playerInput.text.length > 0) { //this is the backspace key; to delete the typed text from playerInput.text string
                typingSound.play();
                playerInput.text = playerInput.text.substr(0, playerInput.text.length - 1);
            } else if (playerInput.text.length >= 14) { //if it's too long, it won't insert more input
                //console.log('too long');
                errorSound.play();

            } else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) { // this is to add space and all upper and lower captial letters to the playerInput.text string
                typingSound.play();
                playerInput.text += event.key; 
                info.name = playerInput.text;
                //console.log('player name is ' + info.name); //debug
            }

        });
        
    }

    update () {
        if (this.mouse.isDown && playerInput.text.length > 0) { //check if there is input when players click
            this.airplaneBeep.play();
            this.scene.start('locationScreen');
        }
    }
    
}