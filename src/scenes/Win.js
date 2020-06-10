class Win extends Phaser.Scene {
     
    constructor() {
        super("winScene");

    }
    preload(){

         // background
         this.load.image('background_4','./assets/Space-Background-4.png');
         this.load.image('gameoverTitle','./assets/Gameover.png');
        // death announcement
        this.load.audio('message11', './assets/record0011_mixdown.wav');
        // Music: https://www.bensound.com
        this.load.audio('sfx_music_y', './assets/bensound-dreams.mp3');
         /***SR-71 - main character***/
         this.load.spritesheet('SR-71','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1});

    }

    create(){

        // background music
        this.bgMusic = this.sound.add('sfx_music_y');
        this.bgMusic.play(music);
        // congrats to player
        this.sound.play('message11');

        // tells player how to get out of screen
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
        this.add.text(100,100, "Project Ezekiel was a sucess! Congratulations!", textConfig);
        this.add.text(50,500, "Press R to Restart the Mission! or Press M to go to Menu!", textConfig);

         // This will make the background move as a parallax scroller.
     this.bg_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_4');
     // SetScale()
     this.bg_4.setScale(1);
     // Set its pivot to the top left corner
     this.bg_4.setOrigin(0, 0);
     // fixed it so it won't move when the camera moves.
    this.bg_4.setScrollFactor(0);

    //animation for player's ship
    this.anims.create({
        key:'player',
        frames: this.anims.generateFrameNumbers('SR-71',{start:0,end:2,first:0}),
        framerate:60,
        repeat: -1,
    })

    // Creating main character and adding to location x y
         this.player = new SR71(this, 100,300,'SR-71').setScale(.5,.5).setOrigin(0,0);
         // adding physics to SR-71
         this.physics.add.existing(this.player);
         // sets physics body
         this.player.body.setSize(250,173,0,0);
         //player animation
         this.player.anims.play('player',true); 
    
        // define keyboard keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

    }

    update(){
    
         // scrolls the background
         this.bg_4.tilePositionX += 0.2; 
         
         if(Phaser.Input.Keyboard.JustDown(keyR)){
            console.log("Loading playScene");
            this.bgMusic.stop();
            this.scene.start("preloaderScene");
            this.scene.start("playScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyM)){
            this.bgMusic.stop();
            // global count?
            this.scene.start("preloaderScene");
            this.scene.start("menuScene");

        }

    }

     
} // end of win scene