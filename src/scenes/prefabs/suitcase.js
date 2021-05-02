class Suitcase extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); 
        scene.physics.add.existing(this);
    }

    create(){
    }

    update(){
        if(this.x < -this.width){
            this.destroy();
        }
    }
}