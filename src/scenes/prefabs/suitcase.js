class Suitcase extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 
        scene.physics.add.existing(this);
        this.body.setSize(50, 50);
    }

    die(){
        this.destroy();
    }
}