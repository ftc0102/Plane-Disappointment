class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.JUMP_IMPULSE = -500;
    }

    // ALL PRELOADS HAVE BEEN MOVED TO PRELOADGAME.JS 

}