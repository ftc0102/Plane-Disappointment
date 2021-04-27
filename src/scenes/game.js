// Helper function to create more art as the screen scrolls
// Credit to Ourcade on Youtube
/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} texture 
 * @param {number} scrollFactor 
 */
const createAligned = (scene, totalWidth, texture, scrollFactor) => {
    // Terrible variable names, but I'm not sure what to call them
    const w = scene.textures.get(texture).getSourceImage().width
    const count = Math.ceil(totalWidth / w) * scrollFactor

    let x = 0
    for (let i = 0; i < count; ++i)
    {
        const m = scene.add.image(x, scene.scale.height, texture)
            .setOrigin(0, 1)
            .setScrollFactor(scrollFactor)

        x += m.width
    }
}

class Game extends Phaser.Scene{
    constructor() {
        super("gameScene");
    }

    preload() {
        // All our game assets go here
        // Like background art, sprites, bgm, etc

        // Temp art for parallax background
        // Credit to MarwaMJ on Itch.io for assets
        // Credit to Ourcade on Youtube for tutorial https://www.youtube.com/watch?v=Y3C5HliTDwM
        this.load.image('sky', './assets/sky.png');
        this.load.image('mountains', './assets/mountains.png');
        this.load.image('plateau', './assets/plateau.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('plant', './assets/plant.png');

    }

    create() {

        // Keyboard Inputs
        // I forgot how to do the shortcut that Adam showed in lecture, so if you do you can replace this code.
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // For the eventual scrolling backgrond
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * width

        // Parallax pieces
        this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0)
        createAligned(this, totalWidth, 'mountains', 0.25);
        createAligned(this, totalWidth, 'plateau', 0.5);
        createAligned(this, totalWidth, 'ground', 1);
        createAligned(this, totalWidth, 'plant', 1.25);

        // Temp Player
        this.player = new Player(this, game.config.width/10, game.config.height/2, 'player').setOrigin(0, 0);
        this.player.setScale(8);
        
        
        //gravity (credit to https://phasergames.com/how-to-jump-in-phaser-3/ for this section and the jump section)
        this.player.setGravityY(300); //Makes the player go down by default

        
        let floorHorizontal = game.config.width/2;
        let floorVertical = game.config.height * .90;

        this.floor = this.physics.add.sprite(floorHorizontal, floorVertical, "floor"); //makes a floor for player to rest
        this.floor.displayWidth = game.config.width * 1.1; // makes it go across the screen
        this.physics.add.collider(this.player, this.floor); // allows for hit detection between player and floor
        this.floor.setPushable(false); //prevents floor from being moved by player


        // Mouse click to jump
        this.input.on('pointerdown', this.jump, this);
    }

    update() {
        // Here's my proposal on how we do the world generation:
        // We create prefab scenes that we then generate through code to appear in the game scene
        // We can make like a set of obstacles, save it as a prefab, and have the game cycle through a set of them
        // It'll definitely be the most difficult part of our project, and I'm not sure if I have the skills to tackle it

        // Parallax scrolling
        const cam = this.cameras.main
        const speed = 5
        
        cam.scrollX += speed
        this.player.x += speed //offsets camera, locking player in place
        this.floor.x += speed //same thing for the floor

    }

    jump(){
        this.player.setVelocityY(-180); //allows the for the player to go up before gravity exists
    }

}