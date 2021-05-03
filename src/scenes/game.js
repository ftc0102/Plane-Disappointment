class Game extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    // ALL PRELOADS HAVE BEEN MOVED TO PRELOADGAME.JS 
    create() {

        //console.log("entering create()");

        if (!bgMusic) {
            bgMusic = this.sound.add('backgroundMusic', { volume: 0.3 });
            bgMusic.play({
              loop: true,
            });
        }

        // Define restart key
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //Die key for debug
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Parallax pieces
        // The last 2 integers are the dimensions of the image, make sure to set the correct ones.
        // The first 2 integers are the X, Y coordinates
        // The string is the name of the asset, declared in preloadGame.js
        this.sky = this.add.tileSprite(0, 0, 1280, 720, 'sky').setOrigin(0)
        this.cloud = this.add.tileSprite(0, 0, 1280, 720, 'cloud').setOrigin(0)
        this.witch = this.add.tileSprite(0, 0, 1280, 720, 'witch').setOrigin(0)
        this.ground = this.add.tileSprite(0, 0, 1280, 720, 'ground').setOrigin(0)
        this.interior = this.add.tileSprite(0, 0, 1280, 720, 'interior').setOrigin(0)

        // Instantiating Player
        this.player = new Player(this, game.config.width/10, game.config.height/4, 'fa').setOrigin(0, 0);
        this.player.anims.play('farun');      // plays the running animation
        this.player.setScale(0.9);            // makes the player bigger
        this.player.body.setSize(150,380); //warps hitbox
        
        //gravity (credit to https://phasergames.com/how-to-jump-in-phaser-3/ for this section and the jump section)
        this.player.setGravityY(1500); //Makes the player go down by default

        // Floor creation
        this.floor = this.physics.add.sprite(floorHorizontal, floorVertical); //makes a floor for player to rest
        this.floor.displayWidth = game.config.width * 1.1; // makes it go across the screen
        this.grav = this.physics.add.collider(this.player, this.floor); // allows for hit detection between player and floor
        this.floor.setPushable(false); //prevents floor from being moved by player

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
        this.highScoreDisplay = this.add.text(1000, 0, '', scoreConfig);

        //suitcase group
        this.suitcaseGroup = this.add.group([
            {
                runChildUpdate:true
            }
        ]);
        
        //soda group
        this.sodaGroup = this.add.group([
            {
                runChildUpdate:true
            }
        ])


        //physics with suitcase group
        this.physics.add.overlap(this.player, this.suitcaseGroup, function(player, suitcase)
        {
            this.player.anims.stop();
            this.physics.world.removeCollider(this.grav);
            if(!this.gameOver){
                this.player.body.setVelocityY(-200);
            }
            this.gameOver = true;
        }, null, this)

        //collect soda
        this.physics.add.overlap(this.player, this.sodaGroup, function(player, soda)
        {
            this.playerScoreValue +=1;
            soda.die();
        }, null, this)

        // Mouse click to jump
        this.input.on('pointerdown', this.jump, this);

        // GAME OVER flag for later
        this.gameOver = false;

        this.makeSuitcase(); //spawn suitcase
        this.makeSoda();

        // have to create foreground last
        this.foreground = this.add.tileSprite(0, 0, 1280, 720, 'foreground').setOrigin(0);

    }

    update() {
        //update score
        this.playerScoreDisplay.text = this.playerScoreValue;

        //the conditions for making a suitcase
        //right now i set it to 4 jumps
        //ideally we'll base it on random timer callse but for now here we go
        

        //move objects towards player
        if(!this.gameOver){
            Phaser.Actions.IncX(this.suitcaseGroup.getChildren(), -5);
            Phaser.Actions.IncX(this.sodaGroup.getChildren(), -5);
        }

        //run despawn check
        this.suitcaseGroup.children.iterate(function(suitcase){
            if(suitcase.x < 0){
                suitcase.die();
                console.log("suitcase despawned");
            }
        });

        this.suitcaseGroup.children.iterate(function(soda){
            if(soda.x < 0){
                soda.die();
                console.log("soda despawned");
            }
        });

        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            this.gameOver = true;
            this.playerScoreValue += 1;
        }

        //update high score when game over
        if (this.gameOver) {
            this.add.image(game.config.width/2, game.config.height/2, 'gameOverScreen');
            //pixel font used: https://fonts.google.com/specimen/VT323


            if(this.playerScoreValue > info.highestScore) {
                info.highestScore = this.playerScoreValue - 1;   //for now I subtracted 1 from it since it is needed for the suitcase condition
                //console.log(info.name + '\'s latest high score is ' + info.highestScore);
                //console.log('they are going to ' + info.arrivingLocation);
            }
            this.highScoreDisplay.text = info.highestScore;

        } else {                                //if the game is not over yet
            this.sky.tilePositionX += .1;
            this.cloud.tilePositionX += .25;
            this.witch.tilePositionX += .5;
            this.ground.tilePositionX += 1.25;
            this.interior.tilePositionX += 1.75;
            this.foreground.tilePositionX += 2;
        }


        // Game Over & Restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart(this.info);
        }

        // Keyboard input! Has to be here and not in create() for some reason, not sure why
        let cursors = this.input.keyboard.createCursorKeys();

    }

    jump(){
        if (this.player.body.onFloor() && !this.gameOver){
            this.player.setVelocityY(-800); //allows the for the player to go up before gravity exists
        }
    }

    makeSuitcase(){
        this.suitcaseGroup.add(new Suitcase(
            this,
            floorHorizontal*2,
            floorVertical*.95,
            "suitcase",
            0));
    }

    makeSoda(){
        this.sodaGroup.add(new Soda(
            this,
            floorHorizontal*3,
            game.config.height/4,
            "soda",
            0));
    }

}