class Game extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    // ALL PRELOADS HAVE BEEN MOVED TO PRELOADGAME.JS 
    create() {

        console.log("testing to see if I can merge branches to main");

        if (!bgMusic) {
            bgMusic = this.sound.add('backgroundMusic', { volume: 0.3 });
            bgMusic.play({
              loop: true,
            });
        }

        // Define restart key
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // For the eventual scrolling backgrond
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * width

        // Parallax pieces
        this.sky = this.add.tileSprite(0, 0, 1920, 1080, 'sky').setOrigin(0)
        this.mountains = this.add.tileSprite(0, 0, 1919, 782, 'mountains').setOrigin(0)
        this.plateau = this.add.tileSprite(0, 0, 1920, 751, 'plateau').setOrigin(0)
        this.ground = this.add.tileSprite(0, 520, 1920, 198, 'ground').setOrigin(0)
        this.plant = this.add.tileSprite(0, 540, 1689, 216, 'plant').setOrigin(0)

        // Temp Player
        this.player = new Player(this, game.config.width/10, game.config.height/2, 'dino').setOrigin(0, 0);
        this.player.anims.play('run');      // plays the running animation
        this.player.setScale(8);            // makes the player bigger
        
        //gravity (credit to https://phasergames.com/how-to-jump-in-phaser-3/ for this section and the jump section)
        this.player.setGravityY(600); //Makes the player go down by default

        // Variables for the floor creation
        let floorHorizontal = game.config.width/2;
        let floorVertical = game.config.height * .90;
        // Floor creation
        this.floor = this.physics.add.sprite(floorHorizontal, floorVertical); //makes a floor for player to rest
        this.floor.displayWidth = game.config.width * 1.1; // makes it go across the screen
        this.physics.add.collider(this.player, this.floor); // allows for hit detection between player and floor
        this.floor.setPushable(false); //prevents floor from being moved by player

        // Mouse click to jump
        this.input.on('pointerdown', this.jump, this);

        // GAME OVER flag for later
        this.gameOver = false;

        // score stuff
        this.playerScoreValue = 0;
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.playerScoreDisplay = this.add.text(0, 0, this.playerScoreValue, scoreConfig);

    }

    update() {

        // Game Over & Restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }

        this.mountains.tilePositionX += .25;
        this.plateau.tilePositionX += .5;
        this.ground.tilePositionX += 1;
        this.plant.tilePositionX += 1.25;
        // Keyboard input! Has to be here and not in create() for some reason, not sure why
        let cursors = this.input.keyboard.createCursorKeys();

        // Press down to slide
        // Currently incomplete
        if (cursors.down.isDown){
            // call slide function
        }


    }

    jump(){
        if (this.player.body.onFloor()){
            this.player.setVelocityY(-400); //allows the for the player to go up before gravity exists
        }
    }

    slide(){
        // If player is on floor and while DOWN is held
            // Change animation
            // Change collision box
        pass // delete this when the function is made
    }

}