class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }
 
    preload() {            
        
        // Menu music
        this.load.audio('sfx_music', './assets/Space Music.mp3'); // Music:
        
        // background picture
        this.load.image('background','./assets/bg_space_seamless.png');
        this.load.image('button1','./assets/PixelArt_1.png');
        this.load.image('button2','./assets/PixelArt_2.png');

        
        // Sound select
        this.load.audio('sfx_select', './assets/42106__marcuslee__laser-wrath-4.wav');

    }
    
    create() {

     // This will make the background move as a parallax scroller.
     this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
     // SetScale()
     this.bg_1.setScale(1.8);
     // Set its pivot to the top left corner
     this.bg_1.setOrigin(0, 0);
     // fixed it so it won't move when the camera moves.
     this.bg_1.setScrollFactor(0);

     // start button
     this.startButton = this.add.sprite(320, 300, 'button1')
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
    //  .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.scene.start("playScene");
        this.sound.play('sfx_select');
        music.stop();
        this.enterButtonHoverState();
    });
   

      // play music
      music = this.sound.add('sfx_music');
      let musicConfig = {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
      }
      music.play(musicConfig);
    
      let menuConfig = {
        fontFamily: 'Helvetica',
        fontSize: '70px',
        color: '#00ff00',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    let centerX = game.config.width/2;
    let centerY = game.config.height/2;
    let textSpacer = 64;

    this.add.text(centerX, centerY- textSpacer, "Project Zeke", menuConfig).setOrigin(0.5);
    //this.add.text(centerX, centerY + textSpacer + 50, '«press space»', instructConfig).setOrigin(0.5);

    // define keys
     keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    } // end of create function

    // hover state for button
    enterButtonHoverState() {
      this.startButton = this.add.sprite(320, 300, 'button2');
    }
    enterButtonRestState() {
      this.add.sprite(320, 300, 'button1');
    }

    update() {

    // scrolls the background
      this.bg_1.tilePositionX += 0.2;

      /*game.settings = {
        //BlockSpeed: 4,
        gameTimer: 60000    
      }*/  

    } // update function ends
             
} // end of Menu class 