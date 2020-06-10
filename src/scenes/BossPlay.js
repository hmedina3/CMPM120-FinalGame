class BossPlay extends Phaser.Scene {
     
    constructor() {
        super("bossScene");

    }

    preload(){

         /***SR-71 - main character***/
         this.load.spritesheet('SR-71','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1}); //https://opengameart.org/content/one-more-lpc-alternate-character
         // Sound effect obtained from https://www.zapsplat.com
         // Basic attack
         this.load.audio('attack', './assets/sound_spark_Laser-Like_Synth_Laser_Sweep_Burst_13.mp3');
         // spritesheets
        this.load.spritesheet('basicAttack','./assets/spr_bullet_strip.png',{frameWidth: 39, frameheight: 39, startFrame: 0, endFrame: 20});
         /***Slash Upgrade Assets***/
        // announcement
        this.load.audio('scaleUpgrade!', './assets/record009_mixdown.wav');
        // Sound effect obtained from https://www.zapsplat.com
        this.load.audio('scaleUpgradeSound','./assets/zapsplat_science_fiction_weapon_gun_shoot_003_32196.mp3');
        // Mandatory: Credit "Matheus de Carvalho Oliveira" or "Matheus Carvalho"
        this.load.image('scaleUpgrade','./assets/AirSlash.png');
        // Power-up icon
        this.load.image('scaleUpgradeIcon','./assets/power2.png');
        /****************************/

        // background picture
        this.load.image('background','./assets/Space-Background-4.jpg');
        // background audio
        // epic music -  Music: https://www.bensound.com
        this.load.audio('sfx_music_x', './assets/bensound-epic.mp3');
        // announcement
        this.load.audio('message12', './assets/record0014_mixdown.wav');
           

         // health bars
         this.load.image('health','./assets/healthbar.png');
         this.load.image('box','./assets/healthbarbox.png');
         this.load.image('boxhide','./assets/healthbarhide.png');
         this.load.image('outline','./assets/healthbaroutline.png');
         this.load.image('enemyHealth','./assets/enemyhealthbar.png');

        /*** Main Boss ***/
        //  Skorpio ( http://opengameart.org/users/skorpio )  new boss sprite? large-ship.png
        this.load.spritesheet('boss','./assets/bossbig.png', {frameWidth: 885, frameheight: 749, startFrame: 0, endFrame: 2});
        this.load.image('boss1','./assets/boss1big.png');
        this.load.image('boss2','./assets/boss2big.png');
        this.load.image('boss3','./assets/boss3big.png');
        this.load.image('bossAttack','./assets/bosspower.png');
        /***********************/

        //laser
        this.load.image('lasers','./assets/spr_bullet_strip02.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets

        //asteroids
       this.load.image('asteroid','./assets/asteroid.png');

    }
    create(){
        //place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0.0);
        // background music
        if(bgMusicPlaying == true){
            this.bgMusic = this.sound.add('sfx_music_x', { delay: 5, loop: true});
            this.bgMusic.play(music);
            bgMusicPlaying = false;
        }
        // announcement
        this.sound.play('message12');
          // basic attack animation
          this.anims.create({
            key: 'base',
            frames: this.anims.generateFrameNumbers('basicAttack',{start:0, end: 2, first: 0}),
            framerate: 30,
           repeat: -1,
        });
         //animation for player's ship
         this.anims.create({
            key:'player',
            frames: this.anims.generateFrameNumbers('SR-71',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        });

        // spawn asteroids
        this.asteroidGroup = this.physics.add.group();
        this.howMany = Phaser.Math.Between(5,10);
        for(let a = 0; a < this.howMany; a++){

            let random = Math.random();
            if( random <= 0.85){
                this.size = Phaser.Math.Between(5,30);
            }else{
                this.size = Phaser.Math.Between(30,50);
            }
            let x = 0;
            let y = 0;
            switch(Phaser.Math.Between(0,4)){
                case 0: //center area
                        y = Phaser.Math.Between(game.config.height/2 - (game.config.height/2)/2, (game.config.height/2) + (game.config.height/2)/2 );
                        x = Phaser.Math.Between(game.config.width/2 - (game.config.width/2)/2, (game.config.width/2) + (game.config.width/2)/2 );
                    break;
                case 1: //bottom right corner
                        y = Phaser.Math.Between(game.config.height/2 + game.config.height/4, game.config.height);
                        x = Phaser.Math.Between(game.config.width/2 + game.config.width/4 , game.config.width);
                    break;
                case 2: //bottom left corner
                        y = Phaser.Math.Between(game.config.height/2 + game.config.height/4, game.config.height);
                        x = Phaser.Math.Between(0, (game.config.width/4));
                    break;
                case 3: //top right corner
                        y = Phaser.Math.Between(0, (game.config.height/4));
                        x = Phaser.Math.Between(game.config.width/2 + game.config.width/4, game.config.width);
                    break;
                case 4: //top left corner
                        y = Phaser.Math.Between(0, (game.config.height/4));
                        x = Phaser.Math.Between(0, (game.config.width/4));
                    break;
            }
            
            this.asteroid = this.add.image(x,y,'asteroid').setScale(this.size/5,this.size/5);
            this.physics.add.existing(this.asteroid);
            this.asteroid.body.setSize(32,32);
            this.asteroidGroup.add(this.asteroid);
            
        }
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
         keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
         

         // create group to hold all our projectiles********
        this.projectiles = this.add.group();
        this.enemy4Laser = this.add.group();
        
        
         // Power-ups
         // create group to hold all our projectiles********
         this.projectiles = this.add.group();

         // Power-ups
         this.powerUps = this.physics.add.group();
         // Initial 10 second Power-Up
         this.powerUpTimer = 10000;
         this.myTimer = this.formatTime(this.powerUpTimer);
         this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent2, callbackScope: this, loop: true });

        // player's health bar
        this.box = this.add.image(50,50,'box').setScale(0.5,0.15);
        this.outline = this.add.image(200,58,'outline').setScale(0.3,0.25);
        this.health = new HealthBar(this,52,50,2.9,0.6);
        this.hide = this.add.image(7,50,'boxhide').setScale(0.2,0.25);
        this.add.text(50, 50, 'HP',{color: 'black'}).setOrigin(0.5);
        game.settings.gameHealth = 100;
        this.health.setPercent(game.settings.gameHealth);

        this.enemiesLeft = 0;

        // Spawn Boss
        this.boss = new Boss(this, 700, 280,'boss1', 0).setScale(1.3,1.3);
        this.physics.add.existing(this.boss);
        this.boss.body.setCircle(50,230,355); //(radius, x offset, y offset)
        this.bossLaser = this.physics.add.group();
        this.enemiesLeft += 1;

        this.bossStage = true;
        this.wave = 4;

        //spawn enemy4
        for( let i = 0; i<1; i++){
            let y = -250;
            let x = 750;
            switch(Phaser.Math.Between(0,1)){
                case 0: y = Phaser.Math.Between(-50, -250);
                        x = Phaser.Math.Between(700, 750);
                    break;
                case 1: y = Phaser.Math.Between(650, 850);
                        x = Phaser.Math.Between(700, 750);
                    break;
            }
            this.enemy4 = new Enemy(this, x, y,'enemy4', 0,18).setScale(1,1).setOrigin(0,0);
            this.physics.add.existing(this.enemy4);
            this.enemy4.anims.play('enemy4',true);
            this.enemy4.body.setSize(70,55,0,0);// (x,y,[center])
            //this.theEnemies.add(this.enemy4);
            this.enemiesLeft += 1;
            this.enemy4.bossStage = true;
            console.log('x: '+ this.enemy4.x+ ' y: ' + this.enemy4.y);
            console.log('enemies left:'+ this.enemiesLeft);
        }

        this.gameOver = false;
        this.gameWin = false;
        


    } // end of create function

    update(){

        if(this.gameOver == true){
            // stop music
            this.bgMusic.stop();
            // starts deathScene  
            this.scene.start("deathScene"); 
           }
       else if(this.gameWin == true){
            this.bgMusic.stop();
            this.scene.start("winScene");
           }
        // moves background
        this.background.tilePositionX += 0.4;

            // powerUps collision
         for(let x = 0; x < this.powerUps.getChildren().length; x++){
            this.scaleUpgrade = this.powerUps.getChildren()[x];
            if(this.physics.overlap(this.player,this.scaleUpgrade) == true){
                this.scaleUpgrade.destroy();
              //  game.settings.shoe = true;
                this.isScaled = true;
                 // timer for current active powerup - 10 seconds
                this.powerUpTimer2 = 10000;
                this.myTimer2 = this.formatTime(this.powerUpTimer2);
                this.timedEvent2 = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
                this.sound.play('scaleUpgrade!');
                // start timer for next power up
                this.powerUpGone = true;
            }
        }

        //for enemy 4's attacks
        for(let j = 0; j < this.enemy4Laser.getChildren().length; j++){
            this.attack = this.enemy4Laser.getChildren()[j];
            if(this.physics.overlap(this.player,this.attack) == true){
                this.attack.destroy(); 
                game.settings.gameHealth -= 1;
                this.health.setPercent(game.settings.gameHealth);

                // move to death scene if health bar is 0////////////////////////////////////////////////////////////////////////////
                if(game.settings.gameHealth <= 0){
                    this.gameOver = true;                
                }
            }
        }

        // collision detection between Player attack to enemy4
        for(let k = 0; k < this.projectiles.getChildren().length; k++){

            this.one = this.projectiles.getChildren()[k];
            // if an enemy and a laser collide
            if(this.physics.overlap(this.one,this.enemy4) == true){
                // enemy health goes down
                this.enemy4.health -= 10;
                this.enemy4.setPercent(this.enemy4.health);
                // laser gets destroy
                this.one.destroy();
                // if enemy runs out of health, they die
                if(this.enemy4.health <= 0){
                    this.enemy4.destroy();
                    this.enemy4.bar.destroy();
                    this.enemiesLeft -= 1;
                    this.enemy4.isDead = true;
                }
            }
        }

        // spacebar to fire
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        
            if(this.isScaled == true){
                this.scaledAttack();
            }else{
                this.basicAttack();
            }
        }

        // update all attacks
        for(let i = 0; i <this.projectiles.getChildren().length; i++){
            var attack = this.projectiles.getChildren()[i];
            attack.update();
        }


        this.boss.update();
        this.enemy4.update();

        // collision detection between Player attack to Boss
        for(let k = 0; k < this.projectiles.getChildren().length; k++){

            this.one = this.projectiles.getChildren()[k];
            // if an enemy and a laser collide
            if(this.physics.overlap(this.one,this.boss) == true){
                // enemy health goes down
                if(this.isScaled == true){
                    this.boss.health -= 1;
                }else{
                    this.boss.health -= 0.3;
                }
                
                this.boss.setPercent(this.boss.health);
                // laser gets destroy
                this.one.destroy();
                // if enemy runs out of health, they die
                if(this.boss.health <= 0){
                    this.boss.destroy();
                    this.boss.bar.destroy();
                    this.boss.laser.destroy();
                    this.boss.laser2.destroy();
                    this.boss.laser3.destroy();
                    this.enemiesLeft -= 1;
                    this.boss.isDead = true;
                    this.gameWin = true;
                }
            }
        } // end of for-loop.

         // collision detection between Boss attack to Player
         for(let l = 0; l < this.bossLaser.getChildren().length; l++){

            this.power = this.bossLaser.getChildren()[l];
            if(this.physics.overlap(this.player,this.power) == true){
                game.settings.gameHealth -= 0.1;
                this.health.setPercent(game.settings.gameHealth);
            }
                
            // move to death scene if health bar is 0
            if(game.settings.gameHealth <= 0){
                this.gameOver = true;
            }
            
        } // end of for-loop.

        // updates players movements
        this.player.update();
            
    } // end of update function


    basicAttack(){
        var attack = new BasicAttack(this);
        this.sound.play('attack',{volume: 0.5});
      }
      scaledAttack(){
        var attack = new ScaledAttack(this);
          this.sound.play('scaleUpgradeSound',{volume: 0.5});
        }
        
       // More Time UI 
     formatTime(milliseconds){
        return milliseconds / 1000;
    }
      // scale power-up spawn
    onEvent(){
        // upgrade is timed.
        if(this.myTimer2 > 0){
            this.myTimer2 -= 1;
            console.log(this.myTimer2);
        }
        else{
            this.isScaled = false;
        }
    
    }
    
     onEvent2(){

         if(this.myTimer > 0){
            this.myTimer -= 1;
            console.log(this.myTimer);
            this.myCounter = 1;
         }
         else{
             
            if(this.myCounter == 1){
             this.scaleUpgrade = this.physics.add.sprite(300,300,'scaleUpgradeIcon').setScale(0.3,0.3);
             this.powerUps.add(this.scaleUpgrade);         
             this.scaleUpgrade.setRandomPosition(0,0, game.config.width, game.config.height);
             this.scaleUpgrade.setVelocity(100,100);
             this.scaleUpgrade.setCollideWorldBounds(true);
             this.scaleUpgrade.setBounce(1);
             this.myCounter = 0;
            }

            if(this.powerUpGone == true){
            // 60 seconds for next power up when grabbed 
            this.powerUpTimer = 60000;
            this.myTimer = this.formatTime(this.powerUpTimer);
            this.powerUpGone = false;
            }
         } 
    }







} // end of BossPlay scene