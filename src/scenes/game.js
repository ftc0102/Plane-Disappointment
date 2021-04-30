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

    // ALL PRELOADS HAVE BEEN MOVED TO PRELOADGAME.JS 
    create() {

        if (!bgMusic) {
            bgMusic = this.sound.add('backgroundMusic', { volume: 0.3 });
            bgMusic.play({
              loop: true,
            });
        }

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

    }

    update() {
        // Here's my proposal on how we do the world generation:
        // We create prefab scenes that we then generate through code to appear in the game scene
        // We can make like a set of obstacles, save it as a prefab, and have the game cycle through a set of them
        // It'll definitely be the most difficult part of our project, and I'm not sure if I have the skills to tackle it
        // Parallax scrolling
        const cam = this.cameras.main
        const speed = 10
        const MIN_SPEED = 5
        const MAX_SPEED = 20
        
        // These 3 lines have to be identical after the "=" sign in order to keep it looking nice
        cam.scrollX += Phaser.Math.Clamp(speed, MIN_SPEED, MAX_SPEED)
        this.player.x += Phaser.Math.Clamp(speed, MIN_SPEED, MAX_SPEED) //offsets camera, locking player in place
        this.floor.x += Phaser.Math.Clamp(speed, MIN_SPEED, MAX_SPEED) //same thing for the floor

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