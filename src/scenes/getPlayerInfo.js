class getPlayerInfo extends Phaser.Scene {
    constructor() {
        // Where the player will put their information
        super("playerInfoScreen");
    }

    create () {
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

            if (event.keyCode === 8 && playerInput.text.length > 0) {
                playerInput.text = playerInput.text.substr(0, playerInput.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
                playerInput.text += event.key;
            }
            if (event.keyboard == 18){
                playerName.setText(playerInput.value);
            }
        });
    }  
}