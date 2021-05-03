class splashScreen extends Phaser.Scene {
    constructor() {
        // Main Menu
        super("splashScreen");
    }

    init(data) { //this grabs data from the previous scene
        this.info = data;
        if(this.info.highestScore == null) { //if there is not a score already
            this.info.highestScore = 0; //set highscore to 0
            this.name = 'Bob';
            this.departingLocation = 'San Francisco';
            this.arrivingLocation = 'New York';
            console.log('high score in Menu: ' + this.info.highestScore + '. Player name is ' + this.name + ' and they are from ' + this.departingLocation + ' and are going to ' + this.arrivingLocation);
        }


    }

    create() {
        // menuscreen art
        // credits to Måns Grebäck from fontspace.com for use of the Aeronaves Font
        this.menuscreen = this.add.image(game.config.width/2, game.config.height/2, 'menuscreen');

        // sound for clicking
        this.mouseClick = this.sound.add('mouseClick');

        //check if there is a previous high score, if not, create an info type object to hold all high score
        if(this.info.highestScore < 0){
            this.info = {
                highestScore: 0
            }
        }

        //mouse click = start game
        this.input.on('pointerdown', function (pointer) {
            this.mouseClick.play();
            this.scene.start('playerInfoScreen', this.info);
        }, this);
        
    }
}