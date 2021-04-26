class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.JUMP_IMPULSE = -500;
    }

    preload() {
        //Temp art for player and playtest
        this.load.spritesheet('tempArt', './assets/dinoSprites.png', { frameWidth: 24, frameHeight: 1});
    }

    create() {
        // Temp Player Animation for playtest
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('tempArt', {start: 1, end: 7, first: 0}),
            frameRate: 10.5,
            repeat: -1
        });

        //Temp art for player and playtest
        this.load.spritesheet('tempArt', './assets/dinoSprites.png', { frameWidth: 24, frameHeight: 1});
        this.player.play('run');

        //jump
        //this.input.on('pointerdown', this.jump, this);
    }
}