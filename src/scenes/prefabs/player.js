class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.JUMP_IMPULSE = -500;
    }

<<<<<<< Updated upstream
    // ALL PRELOADS HAVE BEEN MOVED TO PRELOADGAME.JS 
=======
    preload() {
        //Temp art for player and playtest
        this.load.spritesheet('dino', './assets/dinoSprites.png', 
        { frameWidth: 24, frameHeight: 1});
    }
>>>>>>> Stashed changes

    create() {
        // Temp Player Animation for playtest
        this.anims.create({
            key: 'run',
<<<<<<< Updated upstream
            frames: this.anims.generateFrameNumbers('tempArt', {start: 1, end: 7, first: 0}),
            frameRate: 10,
=======
            frames: this.anims.generateFrameNumbers('dino', {start: 17, end: 23}),
            frameRate: 20.5,
>>>>>>> Stashed changes
            repeat: -1
        });

        //Temp art for player and playtest
        let dinoRun = this.add.sprite(game.config.width/2, game.config.height/2, 'dino').setOrigin(0,0);
        dinoRun.anims.play('run');
        dinoRun.setScale(8);
        // this.load.spritesheet('tempArt', './assets/dinoSprites.png', { frameWidth: 24, frameHeight: 1});
        // this.player.play('run');
    }
}