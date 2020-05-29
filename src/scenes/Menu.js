class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }
 
    preload() {            
        
        // Menu music -  Music: https://www.bensound.com
        this.load.audio('sfx_music', './assets/bensound-birthofahero.mp3');
        
        // background picture
        this.load.image('background','./assets/bg_space_seamless.png');
        // buttons
        this.load.image('button1','./assets/PixelArt_1.png');
        this.load.image('button2','./assets/PixelArt_2.png');
        this.load.image('options1','./assets/Options_1.png');
        this.load.image('options2','./assets/Options_2.png');

        
        // Sound select - Sound effect obtained from https://www.zapsplat.com
        this.load.audio('sfx_select', './assets/zapsplat_science_fiction_space_fighter_fly_past_fast_002_32236.mp3');
        this.load.audio('sfx_select_2', './assets/42106__marcuslee__laser-wrath-4.wav');
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
     this.startButton = this.add.sprite(400, 350, 'button1')
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

    // options button
    this.optionsButton = this.add.sprite(400, 430, 'options1').setScale(0.1,0.1)
    .setInteractive()
    .on('pointerover', () => this.enterButtonHoverState2() )
    .on('pointerout', () => this.enterButtonRestState2() )
  //  .on('pointerdown', () => this.enterButtonActiveState() )
    .on('pointerup', () => {
      this.scene.start("optionsScene");
      this.sound.play('sfx_select_2');
     // music.stop();
      this.enterButtonHoverState2();
  });
      // play music
      music = this.sound.add('sfx_music');
      music.play();
      
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

    this.add.text(centerX, centerY- textSpacer, "Project Ezekiel", menuConfig).setOrigin(0.5);
    //this.add.text(centerX, centerY + textSpacer + 50, '«press space»', instructConfig).setOrigin(0.5);

    // define keys
     keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    } // end of create function

    // hover states for start button
    enterButtonHoverState() {
      this.startButton = this.add.sprite(400, 350, 'button2');
    }
    enterButtonRestState() {
      this.add.sprite(400, 350, 'button1');
    }
    // hover states for options button
    enterButtonHoverState2() {
      this.optionsButton = this.add.sprite(400, 430, 'options2').setScale(0.1,0.1);
    }
    enterButtonRestState2() {
      this.add.sprite(400, 430, 'options1').setScale(0.1,0.1);
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