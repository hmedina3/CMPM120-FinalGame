class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }

    preload() {
        //background music
        this.load.audio('sfx_music_2', './assets/OrbitalColossus.mp3'); //https://opengameart.org/content/space-boss-battle-theme
        
        // SR-71 - main character
        this.load.spritesheet('SR-71','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1}); //https://opengameart.org/content/one-more-lpc-alternate-character

        //enemy
        this.load.spritesheet('enemy','./assets/4_fighters_sprites.png',{frameWidth: 98, frameheight: 72, startFrame: 0, endFrame: 1}); //http://freegameassets.blogspot.com/2015/02/space-patrol-sprite-sheet-this-space.html
        this.load.spritesheet('enemy2','./assets/enemy2.png',{frameWidth: 84, frameheight: 60, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy3','./assets/enemy3.png',{frameWidth: 106, frameheight: 58, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy4','./assets/enemy4.png',{frameWidth: 79, frameheight: 47, startFrame: 0, endFrame: 1});

        //load sound effect
        //this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_laser1', './assets/35684__jobro__laser7.wav'); //https://freesound.org/people/jobro/sounds/35684/ 
        this.load.audio('sfx_laser2', './assets/341236__sharesynth__laser00.wav'); //https://freesound.org/people/sharesynth/sounds/341236/
        
        //load images/tile sprites
        this.load.image('bullets','./assets/spr_bullet_strip.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        this.load.image('lasers','./assets/spr_bullet_strip02.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 

        //icons for power-ups

        //background picture
        this.load.image('background','./assets/Space-Background-4.jpg');

        //spritesheets
        this.load.spritesheet('basicAttack','./assets/spr_bullet_strip.png',{frameWidth: 18, frameheight: 20, startFrame: 0, endFrame: 20});
        
        //health bar
        this.load.image('health','./assets/healthbar.png');
        this.load.image('box','./assets/healthbarbox.png');
        this.load.image('boxhide','./assets/healthbarhide.png');
        this.load.image('outline','./assets/healthbaroutline.png');
        this.load.image('enemyHealth','./assets/enemyhealthbar.png');
    }

    create()  {

        //player time core
        this.timer = game.settings.gameScore;

        //place background
        this.background = this.add.tileSprite(0,0,640,480,'background').setOrigin(0,0);

        // background music 
        music = this.sound.add('sfx_music_2');
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

          // basic attack anims
        this.anims.create({
            key: 'base',
            frames: this.anims.generateFrameNumbers('basicAttack',{start:0, end: 2, first: 0}),
            framerate: 30,
           repeat: -1,
        });

        //animation for enemies ship
        //enemy type 1
        this.anims.create({
            key:'enemy1',
            frames: this.anims.generateFrameNumbers('enemy',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        })
        //enemy type 2
        this.anims.create({
            key:'enemy2',
            frames: this.anims.generateFrameNumbers('enemy2',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        })
        //enemy type 3
        this.anims.create({
            key:'enemy3',
            frames: this.anims.generateFrameNumbers('enemy3',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        })
        //enemy type 4
        this.anims.create({
            key:'enemy4',
            frames: this.anims.generateFrameNumbers('enemy4',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        })

        //animation for player's ship
        this.anims.create({
            key:'player',
            frames: this.anims.generateFrameNumbers('SR-71',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        })
        
        // different types of enemies
        // enemy1
        this.enemy1 = new Enemy(this, 500, -200,'enemy', 0,8).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy1);
        this.enemy1.anims.play('enemy1',true);
        this.enemy1.body.setSize(98,70,0,0);// (x,y,[center])
        //enemy2 (blue one)
        this.enemy2 = new Enemy(this, 450, -100,'enemy2', 0,10).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy2);
        this.enemy2.anims.play('enemy2',true);
        this.enemy2.body.setSize(87,65,0,0);// (x,y,[center])
        //enemy3 (red one)
        this.enemy3 = new Enemy(this, 400, -50,'enemy3', 0,15).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy3);
        this.enemy3.anims.play('enemy3',true);
        this.enemy3.body.setSize(87,65,0,0);// (x,y,[center])
        //enemy4 (small gray one)
        this.enemy4 = new Enemy(this, 300, -250,'enemy4', 0,18).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy4);
        this.enemy4.anims.play('enemy4',true);
        this.enemy4.body.setSize(70,55,0,0);// (x,y,[center])

        //putting all types of enemies into a group
        this.theEnemies = this.physics.add.group();
        this.theEnemies.add(this.enemy1);
        this.theEnemies.add(this.enemy2);
        this.theEnemies.add(this.enemy3);
        this.theEnemies.add(this.enemy4);
        
        // Creating main character and adding to location x y
        this.player = new SR71(this, 100,300,'SR-71').setScale(.5,.5).setOrigin(0,0);
        // adding physics to SR-71
        this.physics.add.existing(this.player);
        // sets physics body
        this.player.body.setSize(250,173,0,0);
        //player animation
        this.player.anims.play('player',true);
        // spacebar for shooting
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        // bounded to screen
        this.player.setCollideWorldBounds(true);

        
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // create group to hold all our projectiles
        this.projectiles = this.add.group();

        //player's health bar
        this.box = this.add.image(50,50,'box').setScale(0.5,0.15);
        this.outline = this.add.image(200,58,'outline').setScale(0.3,0.25);
        this.health = new HealthBar(this,52,50,2.9,0.6);
        this.hide = this.add.image(7,50,'boxhide').setScale(0.2,0.25);
        this.add.text(50, 50, 'HP',{color: 'black'}).setOrigin(0.5);
        game.settings.gameHealth = 100;
        this.health.setPercent(game.settings.gameHealth);

        this.gameOver = false;
        

    }   // end of create function
   
    update() {
        
        
        //tracking time
        if(this.gameOver == false){
            this.timer += 0.04;
        }else{
            this.timer == this.timer;
        }

        //display time
        this.showTime = this.add.text(490,33,'Time: ' + Math.floor(this.timer), scoreConfig);

        let shortestTime = localStorage.getItem("high-score");
 
        
        // moves background
        this.background.tilePositionX += 0.2;

        // spacebar test
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Firing for effect!");
            this.basicAttack();
        }
        // update all attacks
        for(let i = 0; i <this.projectiles.getChildren().length; i++){
            var attack = this.projectiles.getChildren()[i];
            attack.update();
        }

        
        // collision detection for attacks to enemy
        for(let k = 0; k < this.projectiles.getChildren().length; k++){
            this.one = this.projectiles.getChildren()[k];
            for(let j = 0; j < this.theEnemies.getChildren().length; j++){
                this.opponent = this.theEnemies.getChildren()[j];
                //if an enemy and a bullet/laser collide
                if(this.physics.overlap(this.one,this.opponent) == true){
                    //enemy health goes down
                    this.opponent.health -= 10;
                    this.opponent.setPercent(this.opponent.health);
                    //bullet/laser gets destroy
                    this.one.destroy();
                    //if enemy runs out of health, they die
                    if(this.opponent.health == 0){
                        this.opponent.destroy();
                        this.opponent.bar.destroy();
                        this.opponent.laser.destroy();
                        this.opponent.isDead = true;
                    }
                }
            }
        }
       

        
        //checking for collision between enemy attack and player
        for(let k = 0; k < this.theEnemies.getChildren().length; k++){
            this.one = this.theEnemies.getChildren()[k];
            if(this.physics.overlap(this.player,this.one.laser) == true){
                this.one.laser.destroy();
                game.settings.gameHealth -= 10;
                this.health.setPercent(game.settings.gameHealth)

                // move to death scene if health bar is 0
                if(game.settings.gameHealth == 0){
                    this.gameOver = true;                  
                    music.stop();
                    this.add.text(game.config.width/2, game.config.height/8 + 50, 'YOU DIED',highScoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/4 + 50, 'Survival Time: ' + this.timer ,highScoreConfig).setOrigin(0.5);
                    this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

                    // check for input during death scene
                    if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                        this.scene.restart(this.timer);
                        game.settings.gameScore = 0;
                        music.stop();
                        //this.scene.restart(this.p1Score);
                        this.scene.start('playScene');
                    }
                    if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                        music.stop();
                        this.scene.start('menuScene');
                    }
                
                }
            }
        }

        // when the player beats the boss level
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            //tracking shortest time
            if(shortestTime == null || shortestTime == 0){
                localStorage.setItem("high-score", 1000);
                shortestTime = 1000;
            }else if(this.timer < shortestTime){
                localStorage.setItem("high-score", this.timer);
            }
            music.stop();
            this.add.text(game.config.width/2, game.config.height/6 + 50, 'YOU WIN!',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/8 + 50, 'YOU WIN!',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Finishing Time: ' + localStorage.getItem("high-score"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during end scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.restart(this.p1Score);
                game.settings.gameScore = 0;
                music.stop();
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('menuScene');
                music.stop();
            }
        
        }
  
        this.enemy1.update();
        this.enemy2.update();
        this.enemy3.update();
        this.enemy4.update();
        this.player.update();

    } // end of update function. 

    basicAttack(){
      var attack = new BasicAttack(this);
    }
    
   
}