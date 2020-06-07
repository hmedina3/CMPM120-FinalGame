class Tutorial extends Phaser.Scene {
     
    constructor() {
        super("tutorialScene");

    }
    preload(){
         // background
         this.load.image('background_3','./assets/Space-Background-4.jpg');
        // voice commands
        this.load.audio('message1', './assets/record001_mixdown.wav');
        this.load.audio('message2', './assets/record002_mixdown.wav');
        this.load.audio('message3', './assets/record003_mixdown.wav');
        this.load.audio('message6', './assets/record006_mixdown.wav');
        // tutorial music
        // tutorial music -  Music: https://www.bensound.com
        this.load.audio('sfx_music_3', './assets/bensound-littleplanet.mp3');
        // SR-71 - main character
        this.load.spritesheet('SR-71','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1}); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.spritesheet('basicAttack','./assets/spr_bullet_strip.png',{frameWidth: 39, frameheight: 39, startFrame: 0, endFrame: 20});
    }

    create(){

        // added this code for debugging purposes
        let textConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            color: '#fafafa',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
       

        // background music
            if(bgMusicPlaying == true){
            this.bgMusic = this.sound.add('sfx_music_3', {loop: true });
            this.bgMusic.play(music);
            bgMusicPlaying = false;
            }
        // background picture
         // This will make the background move as a parallax scroller.
     this.bg_3= this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_3');
     // SetScale()
     this.bg_3.setScale(1);
     // Set its pivot to the top left corner
     this.bg_3.setOrigin(0, 0);
     // fixed it so it won't move when the camera moves.
    this.bg_3.setScrollFactor(0);
    this.add.text(300,400, "PRESS R TO GO TO PLAYSCENE", textConfig);
        // creating player //////////////////////////////////////////////////////////////////////////
         //animation for player's ship
         this.anims.create({
            key:'player',
            frames: this.anims.generateFrameNumbers('SR-71',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        });
         // basic attack anims
         this.anims.create({
            key: 'base',
            frames: this.anims.generateFrameNumbers('basicAttack',{start:0, end: 2, first: 0}),
            framerate: 30,
           repeat: -1,
        });
        // Creating main character and adding to location x y
        this.player1 = new SR71(this, 100,300,'SR-71').setScale(.5,.5).setOrigin(0,0);
        // adding physics to SR-71
        this.physics.add.existing(this.player1);
        // sets physics body
        this.player1.body.setSize(250,173,0,0);
        //player animation
        this.player1.anims.play('player',true);
        // spacebar for shooting
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        // bounded to screen
        this.player1.setCollideWorldBounds(true);
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        ////////////////////////////////////////////////////////////////////////////////////////

        // tells player how to move
        this.sound.play('message1', {delay: 20} );
        // tells player how to shoot
        //this.sound.play('message2');
        // last message to player
       //this.sound.play('message3');
       // this.sound.play('message6');



    }
    update(){
        // scrolls the background
        this.bg_3.tilePositionX += 0.2; 

        if(Phaser.Input.Keyboard.JustDown(keyR)){
            console.log("Loading playScene");
            this.bgMusic.stop();
            this.scene.start("playScene");
        }

    }




} // end of tutorial scene.