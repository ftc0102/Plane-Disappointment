class getName extends Phaser.Scene {
    constructor() {
        super("playerNameScreen");
    }

    create () {

        this.mouseClick = this.sound.add('mouseClick');

        this.add.text(10, 10, 'Enter your name: \nClick to Proceed', infoConfig);
    
        var playerInput = this.add.text(10, game.config.height/2, '', infoConfig);
    
        this.input.keyboard.on('keydown', function (event) {

            //A document that explains each unique keycode: https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js 
            
            if (event.keyCode === 8 && playerInput.text.length > 0) { //this is the backspace key; to delete the typed text from playerInput.text string
                playerInput.text = playerInput.text.substr(0, playerInput.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) { // this is to add space and all upper and lower captial letters to the playerInput.text string
                playerInput.text += event.key; 
                info.name = playerInput.text;
                console.log('player name is ' + info.name); //debug
                //this.tempName = playerInput.text;
                //this.info.name = this.tempName;
            }

        });
        
        // for debug purposes, when you mouse click, it brings you to the game scene
        this.input.on('pointerdown', function (pointer) {
            this.mouseClick.play();
            this.scene.start('locationScreen');
        }, this);

    }
    
}