class Game extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    // ALL PRELOADS HAVE BEEN MOVED TO PRELOADGAME.JS 
    create() {

        if (!bgMusic) {
            bgMusic = this.sound.add('backgroundMusic', { volume: 0.3 });
            bgMusic.play({
              loop: true,
            });
        }

        if (infoMusic) {
            infoMusic.stop();
        }

        if (typingSound) {
            typingSound.stop();
        }

        // Define restart key
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //Die key for debug
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Parallax pieces
        // The last 2 integers are the dimensions of the image, make sure to set the correct ones.
        // The first 2 integers are the X, Y coordinates
        // The string is the name of the asset, declared in preloadGame.js
        this.sky = this.add.tileSprite(0, 0, 1280, 720, 'sky').setOrigin(0);
        this.cloud = this.add.tileSprite(0, 0, 1280, 720, 'cloud').setOrigin(0);
        this.witch = this.add.tileSprite(0, 0, 1280, 720, 'witch').setOrigin(0);
        this.ground = this.add.tileSprite(0, 0, 1280, 720, 'ground').setOrigin(0);
        this.interior = this.add.tileSprite(0, 0, 1280, 720, 'interior').setOrigin(0);

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
        this.gameOverTicket = this.add.image(game.config.width/2, game.config.height/2, 'gameOverScreen');
        this.gameOverTicket.visible = false;
        this.playerScoreValue = 0;

        let scoreConfig = {
            fill: '#1e2138',
            fontFamily: 'pixelFont',
            fontSize: '28px',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }


        //display "Your Score: " on top left
        this.playerScoreText = this.add.text(5, 0, 'Your Score: ', scoreConfig);
        this.playerScoreText.setAlign('left');
        //display actual player score next to the "Your Score: "
        this.playerScoreDisplay = this.add.text(130, 0, this.playerScoreValue, scoreConfig);

        //display information on the game over ticket; will be blank before game over screen
        this.nameDisplay1 = this.add.text(385, 320, info.name, scoreConfig);
        this.nameDisplay1.visible = false;
        this.nameDisplay2 = this.add.text(840, 307, info.name, scoreConfig);
        this.nameDisplay2.setFontSize(24);
        this.nameDisplay2.visible = false;
        this.locationDisplay = this.add.text(651, 375, info.arrivingLocation, scoreConfig);
        this.locationDisplay.setFontSize(21);
        this.locationDisplay.visible = false;
        this.finalScoreDisplay = this.add.text(465, 358, '', scoreConfig);
        this.highScoreDisplay = this.add.text(905, 340, '', scoreConfig);
        this.highScoreDisplay.setFontSize(24);

        // GAME OVER flag
        this.gameOver = false;

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
            // camera shake when player touches suitcase
            this.cameras.main.shake(100, 0.02);
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

        //randomness variables
        suitcaseRNG = Phaser.Math.Between(2,4);
        console.log("suitcaseRNG: " + suitcaseRNG);
        sodaRNG = Phaser.Math.Between(3,5);
        console.log("sodaRNG: " + sodaRNG);
        sodaPattern = Phaser.Math.Between(1,3);
        console.log("sodaPattern: " + sodaPattern);

        // Mouse click to jump
        this.input.on('pointerdown', this.jump, this);

        //delayed call to increase difficulty
        this.hardMode = this.time.delayedCall(30000, () => {
            suitStart = 1;
            suitEnd = 2;
        }, null, this);
            

        // have to create foreground last
        this.foreground = this.add.tileSprite(0, 0, 1280, 720, 'foreground').setOrigin(0);

    }

    update(time, delta) {
        //update event timers
        suitcaseTimer += delta;
        sodaTimer += delta;

        //right now, they spawn periodically
        //to make it random all i'll have to do is change the num in the while statements to a random number

        while (suitcaseTimer >= suitcaseRNG*1000){
            this.makeSuitcase();
            suitcaseTimer -= suitcaseRNG*1000;
            suitcaseRNG = Phaser.Math.Between(suitStart,suitEnd);
            console.log("suitcaseRNG: " + suitcaseRNG);
        }

        while (sodaTimer >= sodaRNG*1000){
            switch(sodaPattern){
                case 1:
                    this.makeSoda();
                    break;
                case 2:
                    this.make3Soda();
                    break;
                case 3:
                    this.make5Soda();
                    break;
            }    
            sodaTimer -= sodaRNG*1000;
            sodaRNG = Phaser.Math.Between(3,5);
            console.log("sodaRNG: " + sodaRNG);
            sodaPattern = Phaser.Math.Between(1,3);
            console.log("sodaPattern: " + sodaPattern);
        }

        //update score
        this.playerScoreDisplay.text = this.playerScoreValue;  

        //move objects towards player
        if(!this.gameOver){
            Phaser.Actions.IncX(this.suitcaseGroup.getChildren(), -5);
            Phaser.Actions.IncX(this.sodaGroup.getChildren(), -5);
        }

        //run despawn check
        let arrSuit=this.suitcaseGroup.getChildren();
        for (let i=0; i<arrSuit.length; i++){
            if (arrSuit[i].x < 0){
                arrSuit[i].die();
                console.log("suitcase despawned");
            }
        }

        let arrSoda=this.sodaGroup.getChildren();
        for (let i=0; i<arrSoda.length; i++){
            if (arrSoda[i].x < 0){
                arrSoda[i].die();
                console.log("soda despawned");
            }
        }

        //debug purpose
        if(Phaser.Input.Keyboard.JustDown(keyD)) {
            this.gameOver = true;
            //this.playerScoreValue += 1;
        }

        //game over screen
        if (this.gameOver) {
            this.gameOverTicket.visible = true;
            this.nameDisplay1.visible = true;
            this.nameDisplay2.visible = true;
            this.locationDisplay.visible = true;
            this.playerScoreText.visible = false;
            this.playerScoreDisplay.visible = false;
            //this.add.image(game.config.width/2, game.config.height/2, 'gameOverScreen');
            //pixel font used: https://fonts.google.com/specimen/VT323

            if(this.playerScoreValue > info.highestScore) { //update high score when game over
                info.highestScore = this.playerScoreValue; 
            }
            this.finalScoreDisplay.text = this.playerScoreValue;
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
        this.suitcaseGroup.add(new Suitcase(this,floorHorizontal*2, floorVertical*.95, "suitcase", 0));
    }

    makeSoda(){
        let y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
        this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0)); 
    }

    make3Soda(){
        let y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
        this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        this.delay1 = this.time.delayedCall(300, () => {
            y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
            this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        }, null, this);

        this.delay2 = this.time.delayedCall(600, () => {
            y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
            this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        }, null, this);

    }

    make5Soda(){
        let y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
        this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        this.delay1 = this.time.delayedCall(300, () => {
            y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
            this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        }, null, this);

        this.delay2 = this.time.delayedCall(600, () => {
            y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
            this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        }, null, this);

        this.delay3 = this.time.delayedCall(900, () => {
            y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
            this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        }, null, this);

        this.delay4 = this.time.delayedCall(1200, () => {
            y = Phaser.Math.Between(game.config.height/4, game.config.height/3);
            this.sodaGroup.add(new Soda(this, floorHorizontal*3, y, "soda", 0));
        }, null, this);

    }

}