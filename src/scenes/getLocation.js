class getLocation extends Phaser.Scene {
    constructor() {
        // Where the player will put their information
        super("locationScreen");
        //this.tempName = 'Alena';
    }
    /*
    init(data) {
        this.info = data; //grab the high score details from previous scene
    }
    */

    create () {

        this.mouseClick = this.sound.add('mouseClick');

        this.add.text(10, 10, 'Security Question: Enter the city you are flying today: \nClick to Proceed', { font: '32px Courier', fill: '#ffffff' });
    
        var playerInputLocation = this.add.text(10, game.config.height/2, '', { font: '32px Courier', fill: '#ffff00' });
    
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
        
        if (event.keyCode === 8 && playerInputLocation.text.length > 0) { //this is the backspace key; to delete the typed text from playerInput.text string
            playerInputLocation.text = playerInputLocation.text.substr(0, playerInputLocation.text.length - 1); //delete input
        }
        else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) { // this is to add space and all upper and lower captial letters to the playerInput.text string
            playerInputLocation.text += event.key; 
            info.arrivingLocation = playerInputLocation.text;
            console.log(info.name + '\'s is going to ' + info.arrivingLocation);
            //this.tempName = playerInput.text;
            //this.info.name = this.tempName;
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
            this.scene.start('gameScene');
        }, this);

    }
    
}