class Death extends Phaser.Scene {
     
    constructor() {
        super("deathScene");

    }
    preload(){
         // background
         this.load.image('background_4','./assets/Space-Background-4.png');
         this.load.image('gameoverTitle','./assets/Gameover.png');
        // death announcement
        this.load.audio('message8', './assets/record008_mixdown.wav');
        // Music by Cleyton Kauffman - https://soundcloud.com/cleytonkauffman
        this.load.audio('sfx_music_4', './assets/No Hope.mp3');
    }

    create(){
       
        /*
         //prevent health bar from increasing
         this.health.setPercent(0);
         game.settings.gameHealth = 0;
         this.bossStage = false;
         game.settings.gameScore = 0;
         game.settings.gameHealth = 100;*/
        
         // death announcement
        this.sound.play('message8');

        // background music
        if(bgMusicPlaying == true){
            this.bgMusic = this.sound.add('sfx_music_4');
            this.bgMusic.play(music);
            bgMusicPlaying = false;
        }

        // background pictures
        this.add.sprite(400, 80, 'gameoverTitle');
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
        this.add.text(200,500, "Press R to Restart the Mission!", textConfig);

         // This will make the background move as a parallax scroller.
     this.bg_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_4');
     // SetScale()
     this.bg_4.setScale(1);
     // Set its pivot to the top left corner
     this.bg_4.setOrigin(0, 0);
     // fixed it so it won't move when the camera moves.
    this.bg_4.setScrollFactor(0);

    
        // define keyboard keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

         // timer for song - 14-seconds
       game.settings.gameTimer = 12000;
       this.timer = this.formatTime(game.settings.gameTimer);
    let timeInSeconds = this.time.addEvent({delay:1000, callback: this.onEvent, callbackScope: this, loop:true});


    }
    update(){
         // scrolls the background
         this.bg_4.tilePositionX += 0.2; 
         // check for input during death scene
         if(Phaser.Input.Keyboard.JustDown(keyR)){
            console.log("Loading playScene");
            this.scene.start("playScene");
            //this.scene.start("menuScene");
        }
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
        }
    }



}