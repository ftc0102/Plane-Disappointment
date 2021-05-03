class getLocation extends Phaser.Scene {
    constructor() {
        super("locationScreen");
    }

    create () {

        this.mouseClick = this.sound.add('mouseClick');

        this.add.text(10, 10, 'Security Question \nEnter the city you are flying today: \nClick to Proceed', { font: '32px Courier', fill: '#ffffff' });
    
        var playerInputLocation = this.add.text(10, game.config.height/2, '', { font: '32px Courier', fill: '#ffff00' });
    
        this.input.keyboard.on('keydown', function (event) {

            //A document that explains each unique keycode: https://github.com/photonstorm/phaser/blob/v3.51.0/src/input/keyboard/keys/KeyCodes.js 
            
            if (event.keyCode === 8 && playerInputLocation.text.length > 0) {   //this is the backspace key; to delete the typed text from playerInput.text string
                playerInputLocation.text = playerInputLocation.text.substr(0, playerInputLocation.text.length - 1); //delete input
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) {   // this is to add space and all upper and lower captial letters to the input string
                playerInputLocation.text += event.key; 
                info.arrivingLocation = playerInputLocation.text;
                console.log(info.name + '\'s is going to ' + info.arrivingLocation); //debug

            }

        });
        
        // for debug purposes, when you mouse click, it brings you to the game scene
        this.input.on('pointerdown', function (pointer) {
            this.mouseClick.play();
            this.scene.start('gameScene');
        }, this);

    }
    
}