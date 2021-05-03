class getPlayerInfo extends Phaser.Scene {
    constructor() {
        // Where the player will put their information
        super("playerInfoScreen");
    }

    init(data) {
        this.info = data; //grab the high score details from previous scene
    }

    create () {

        this.mouseClick = this.sound.add('mouseClick');

        var playerName = this.add.text(10, 10, 'Enter your name:', { font: '32px Courier', fill: '#ffffff' });
    
        var playerInput = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });

        //var playerName = this.add.text(0, 0, ' ');
    
        this.input.keyboard.on('keydown', function (event) {

        /*
            So, here is the functionality:
            Player types in name then hits enter.
            Player is asked where they are
            They type in and hit enter
            Player is then prompted their destination
            They type in and hit enter, then the game begins
        */

            //A document that explains each unique keycode: https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js 

            if (event.keyCode === 8 && playerInput.text.length > 0) { //this is the backspace key; 8 = backspace
                playerInput.text = playerInput.text.substr(0, playerInput.text.length - 1); //delete input
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) { // this is the space key
                playerInput.text += event.key; 
            }

            /*
            if (event.keyboard == 18){ // this is the alt key
                playerName.setText(playerInput.value);
            }
            */
        });
        
        // for debug purposes, when you mouse click, it brings you to the game scene
        this.input.on('pointerdown', function (pointer) {
            this.mouseClick.play();
            this.scene.start('gameScene', this.info);
        }, this);


    }  
}