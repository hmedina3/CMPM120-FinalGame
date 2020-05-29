class Options extends Phaser.Scene {
    /*
    volume needs to be tracked for all scenes.
    add a credits section
    add control for in game sound? or just have one for all sound.
    */
     
    constructor() {
        super("optionsScene");
    }

    preload(){
        // background picture
        this.load.image('background_2','./assets/bg_space_seamless.png');
        this.load.image('optionsTitle','./assets/OptionsTitle.png');
        // options buttons
        this.load.image('leftArrow','./assets/leftarrow.png');
        this.load.image('leftArrow2','./assets/leftarrow2.png');
        this.load.image('rightArrow','./assets/rightarrow.png');
        this.load.image('rightArrow2','./assets/rightarrow2.png');
        this.load.image('backButton','./assets/backbutton.png');
        this.load.image('backButton2','./assets/backbutton2.png');
        // audio buttons
        // sound effect from: https://www.zapsplat.com/?s=blip&post_type=music&sound-effect-category-id= 
        this.load.audio('blip', './assets/sound_ex_machina_Button_Blip.mp3');
        // Sound select
        this.load.audio('sfx_select_2', './assets/42106__marcuslee__laser-wrath-4.wav');
    }

    create(){
    // This will make the background move as a parallax scroller.
     this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background_2');
     // SetScale()
     this.bg_2.setScale(1.8);
     // Set its pivot to the top left corner
     this.bg_2.setOrigin(0, 0);
     // fixed it so it won't move when the camera moves.
    this.bg_2.setScrollFactor(0);

    this.add.sprite(400, 50, 'optionsTitle');
    let textConfig = {
        fontFamily: 'Helvetica',
        fontSize: '40px',
        color: '#fafafa',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    this.count = 3;
    this.add.text(140,117, "Music", textConfig);
    this.volumeText = this.add.text(340,120, "3", textConfig);
    // left arrow functionality
    this.leftButton = this.add.sprite(300, 150, 'leftArrow').setScale(0.5,0.5).setInteractive()
    .on('pointerover', () => this.enterButtonHoverState() )
    .on('pointerout', () => this.enterButtonRestState() )
    .on('pointerup', () => {
        if(this.count > 0){
        this.count--;
        music.volume -= 0.3;
        console.log("left button pressed!");
        }
      this.sound.play('blip');
      this.enterButtonHoverState();
  });
  // right arrow functionality
    this.rightButton = this.add.sprite(400, 150, 'rightArrow').setScale(0.5,0.5).setInteractive()
    .on('pointerover', () => this.enterButtonHoverState2() )
    .on('pointerout', () => this.enterButtonRestState2() )
    .on('pointerup', () => {
        if(this.count < 9){
            this.count++;
            music.volume += 0.3;
            console.log("right button pressed!");
        }
        this.sound.play('blip');
      this.enterButtonHoverState2();
  });


  // back button functionality
  this.backButton = this.add.sprite(80, 550, 'backButton').setScale(0.2,0.2).setInteractive()
  .on('pointerover', () => this.enterButtonHoverState3() )
  .on('pointerout', () => this.enterButtonRestState3() )
  .on('pointerup', () => {
      this.sound.play('sfx_select_2');
    music.stop();
    this.scene.start("menuScene")
    this.enterButtonHoverState3();
});


} // end of create function



// hover states for left button
enterButtonHoverState() {
    this.leftButton = this.add.sprite(300, 150, 'leftArrow2').setScale(0.5,0.5);
  }
  enterButtonRestState() {
    this.add.sprite(300, 150, 'leftArrow').setScale(0.5,0.5);
  }
  // hover states for right button
enterButtonHoverState2() {
    this.rightButton = this.add.sprite(400, 150, 'rightArrow2').setScale(0.5,0.5);
  }
  enterButtonRestState2() {
    this.add.sprite(400, 150, 'rightArrow').setScale(0.5,0.5);
  }
  // hover states for back button
enterButtonHoverState3() {
    this.backButton = this.add.sprite(80, 550, 'backButton2').setScale(0.2,0.2);
  }
  enterButtonRestState3() {
    this.add.sprite(80, 550, 'backButton').setScale(0.2,0.2);
  }

    
    update() {
        // scrolls the background
        this.bg_2.tilePositionX += 0.2;
        // updates text for volume
        this.updateText();

        if(this.count == 0){
            // mutes audio
            music.mute = true;

            //this.sys.game.globals.model = music.mute;
        }
        else
        {
          music.mute = false;

           // this.sys.game.globals.model =  music.mute;
        }
      
    } // update function ends

    updateText(){
        this.volumeText.setText(this.count);
    }

} // end of options scene 