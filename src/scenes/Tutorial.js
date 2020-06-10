class Tutorial extends Phaser.Scene {
     
    constructor() {
        super("tutorialScene");

    }
    preload(){
      
         // background
         this.load.image('background_3','./assets/Space-Background-4.png');
        // voice commands
        this.load.audio('message1', './assets/record001_mixdown.wav');
        this.load.audio('message2', './assets/record002_mixdown.wav');
        this.load.audio('message3', './assets/record003_mixdown.wav');
        this.load.audio('message6', './assets/record006_mixdown.wav');
        // tutorial music
        // tutorial music -  Music: https://www.bensound.com
        this.load.audio('sfx_music_3', './assets/bensound-littleplanet.mp3');
        // SR-71 - main character
        this.load.spritesheet('SR-71_2','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1}); //https://opengameart.org/content/one-more-lpc-alternate-character
        this.load.spritesheet('basicAttack','./assets/spr_bullet_strip.png',{frameWidth: 39, frameheight: 39, startFrame: 0, endFrame: 20});
        // Sound effect obtained from https://www.zapsplat.com
        this.load.audio('attack', './assets/sound_spark_Laser-Like_Synth_Laser_Sweep_Burst_13.mp3');
       
    }

    create(){
        

        // added this code for debugging purposes
        let textConfig = {
            fontFamily: 'Helvetica',
            fontSize: '16px',
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
     //this.bg_3 = this.physics.add.image(0, 0, game.config.width, game.config.height, 'background_3');
     // SetScale()
     this.bg_3.setScale(1);
     // Set its pivot to the top left corner
     this.bg_3.setOrigin(0, 0);
     // fixed it so it won't move when the camera moves.
    this.bg_3.setScrollFactor(0);

    // used for debug
    this.add.text(350,500, "TUTORIAL", textConfig);

    /***************creating player********************************/
    //animation for player's ship
    this.anims.create({
        key:'player1',
        frames: this.anims.generateFrameNumbers('SR-71_2',{start:0,end:2,first:0}),
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
    this.player = new SR71(this, 100,300,'SR-71_2').setScale(.5,.5).setOrigin(0,0);
    // adding physics to SR-71
    this.physics.add.existing(this.player);
    // sets physics body
    this.player.body.setSize(250,173,0,0);
    //player animation
    this.player.anims.play('player1',true);

    // spacebar for shooting
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    // bounded to screen
    this.player.setCollideWorldBounds(true);

    /****************************************************************************/
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        // create group to hold all our projectiles
        this.projectiles = this.add.group();

        // tells player how to move
        this.sound.play('message1',{delay: 10});

        // movement test
        this.counter = 0;
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // 140-seconds 140000
       game.settings.gameTimer = 140000;
      this.timer = this.formatTime(game.settings.gameTimer);
    }

    update(){
       
        
        // scrolls the background
        this.bg_3.tilePositionX += 0.2; 
      //  this.physics.world.collide(this.bg_3 , this.player);
       
/***************************************************** 
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            console.log("Loading playScene");
            this.bgMusic.stop();
           
            this.scene.start("playScene");
          //  this.restartCounter = 1;

        }
        **********************************************/

         // tells player how to move
        if(Phaser.Input.Keyboard.JustDown(this.right) || Phaser.Input.Keyboard.JustDown(this.left) || Phaser.Input.Keyboard.JustDown(this.up)
        || Phaser.Input.Keyboard.JustDown(this.down)){

            if(this.counter < 5){
                this.counter += 1;
            }
        }

        if(this.counter == 4){
            // tells player how to shoot
            this.sound.play('message2',{volume:2, delay: 2});
            this.counter += 1;
            
        }

        // spacebar test
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Firing for effect!");
            this.basicAttack();
            if(this.counter < 7 ){
                this.counter += 1; 
            }
        }

        if(this.counter == 6){
            // last message to player
            this.sound.play('message3', {delay: 3});
            this.counter += 1;
            // last message to player
            if(this.sound.play('message6', {volume: 2, delay: 18})){
                console.log("Loading playScene");
               let timeInSeconds = this.time.addEvent({delay:1000, callback: this.onEvent, callbackScope: this, loop:true});
            }
        }
        
        // update all attacks
        for(let i = 0; i <this.projectiles.getChildren().length; i++){
            var attack = this.projectiles.getChildren()[i];
            attack.update();
        } 

        this.player.update();

    } 

    basicAttack(){
        var attack = new BasicAttack(this);
        this.sound.play('attack',{volume: 0.5});
      }

      // More Time UI 
    formatTime(milliseconds){
        return milliseconds / 1000;
    }

    onEvent(){
        if(this.timer > 0){
            this.timer -= 1;
            console.log(this.timer);
        }
        else{
            this.bgMusic.stop();
            this.scene.start("playScene");
        }
    }



} // end of tutorial scene.