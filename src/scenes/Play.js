
class Play extends Phaser.Scene {
     
    constructor() {

        super("playScene");
    }

    preload() {
        //background music
        this.load.audio('sfx_music_2', './assets/OrbitalColossus.mp3'); //https://opengameart.org/content/space-boss-battle-theme
        
        // SR-71 - main character
        this.load.spritesheet('SR-71','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1}); //https://opengameart.org/content/one-more-lpc-alternate-character
        

        // SR-71 upgrade assets
        
        // Sound effect obtained from https://www.zapsplat.com
        this.load.audio('attack', './assets/sound_spark_Laser-Like_Synth_Laser_Sweep_Burst_13.mp3');
       
        /***Slash Upgrade Assets***/
        // announcement
        this.load.audio('scaleUpgrade!', './assets/record009_mixdown.wav');
        // Sound effect obtained from https://www.zapsplat.com
        this.load.audio('scaleUpgradeSound','./assets/zapsplat_science_fiction_weapon_gun_shoot_003_32196.mp3');
        // Mandatory: Credit "Matheus de Carvalho Oliveira" or "Matheus Carvalho"
        this.load.image('scaleUpgrade','./assets/AirSlash.png');
        
        /***Beam Upgrade Assets***/
        // announcement
        this.load.audio('beamUpgrade!', './assets/record005_mixdown.wav');
         // Sound effect obtained from https://www.zapsplat.com
        this.load.audio('beamUpgradeSound', './assets/zapsplat_science_fiction_beam_lightly_rising_44803.mp3');
        this.load.image('beamUpgrade','./assets/beamUpgrade.png'); 
        //

         //icons for power-ups
         this.load.image('scaleUpgradeIcon','./assets/power2.png');
         this.load.image('beamUpgradeIcon','./assets/power1.png');

        //enemy
        this.load.spritesheet('enemy','./assets/4_fighters_sprites.png',{frameWidth: 98, frameheight: 72, startFrame: 0, endFrame: 1}); //http://freegameassets.blogspot.com/2015/02/space-patrol-sprite-sheet-this-space.html
        this.load.spritesheet('enemy2','./assets/enemy2.png',{frameWidth: 84, frameheight: 60, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy3','./assets/enemy3.png',{frameWidth: 106, frameheight: 58, startFrame: 0, endFrame: 1});
        this.load.spritesheet('enemy4','./assets/enemy4.png',{frameWidth: 79, frameheight: 47, startFrame: 0, endFrame: 1});

        //load sound effect
        this.load.audio('tangos', './assets/record007_mixdown.wav');

        //this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_laser1', './assets/35684__jobro__laser7.wav'); //https://freesound.org/people/jobro/sounds/35684/ 
        this.load.audio('sfx_laser2', './assets/341236__sharesynth__laser00.wav'); //https://freesound.org/people/sharesynth/sounds/341236/
        
        //load images/tile sprites
        this.load.image('bullets','./assets/spr_bullet_strip.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        this.load.image('lasers','./assets/spr_bullet_strip02.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        this.load.image('yellow_lasers','./assets/laser2.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 

        //background picture
        this.load.image('background','./assets/Space-Background-4.jpg');

        //spritesheets
        this.load.spritesheet('basicAttack','./assets/spr_bullet_strip.png',{frameWidth: 39, frameheight: 39, startFrame: 0, endFrame: 20});
        
        //health bar
        this.load.image('health','./assets/healthbar.png');
        this.load.image('box','./assets/healthbarbox.png');
        this.load.image('boxhide','./assets/healthbarhide.png');
        this.load.image('outline','./assets/healthbaroutline.png');
        this.load.image('enemyHealth','./assets/enemyhealthbar.png');

        //asteroids
        this.load.image('asteroid','./assets/asteroid.png');
    }

    create()  {

        //tracking waves
        this.wave = 0;

        //player time score
        this.timer = game.settings.gameScore;

        // intro-sound
        this.sound.play('tangos');

        //place background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0.0);

        // background music
        if(this.bgMusicPlaying == false){
        this.bgMusic = this.sound.add('sfx_music_2', { delay: 5, loop: true});
        this.bgMusic.play(music);
        this.bgMusicPlaying = true;
        }

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

        // spawm asteroids
        this.asteroidGroup = this.physics.add.group();
        this.howMany = Phaser.Math.Between(5,10);
        for(let a = 0; a < this.howMany; a++){
            let random = Math.random();
            //console.log('random: '+ random);
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
            //console.log('x: '+ this.asteroid.x+ ' y: ' + this.asteroid.y);
            //console.log('size: '+ this.size);
            //console.log('how many: '+ this.howMany);
        }

        // spawn enemies
        this.enemiesLeft = 0;
        this.theEnemies = this.physics.add.group();
        this.wave += 1;
        this.amount = Phaser.Math.Between(0,1);
        // spawn enemy2
        /*
        for( let i = 0; i<this.amount; i++){
            let y = -100;
            let x = 650;
            switch(Phaser.Math.Between(0,1)){
                case 0: y = Phaser.Math.Between(-50, -250);
                        x = Phaser.Math.Between(600, 650);
                    break;
                case 1: y = Phaser.Math.Between(650, 850);
                        x = Phaser.Math.Between(600, 650);
                    break;
            }
            this.enemy2 = new Enemy(this, x, y,'enemy2', 0,5).setScale(1,1).setOrigin(0,0);
            this.physics.add.existing(this.enemy2);
            this.enemy2.anims.play('enemy2',true);
            this.enemy2.body.setSize(87,65,0,0);// (x,y,[center])
            this.theEnemies.add(this.enemy2);
            this.enemiesLeft += 1;
        }
        //spawn enemy4
        for( let i = 0; i<this.amount; i++){
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
            this.theEnemies.add(this.enemy4);
            this.enemiesLeft += 1;
        }
        */
        // spawn enemy3
        for( let i = 0; i<this.amount+1; i++){
            let y = -50;
            let x = 700;
            switch(Phaser.Math.Between(0,1)){
                case 0: y = Phaser.Math.Between(-50, -250);
                        x = Phaser.Math.Between(650, 700);
                    break;
                case 1: y = Phaser.Math.Between(650, 850);
                        x = Phaser.Math.Between(650, 700);
                    break;
            }
            this.enemy3 = new Enemy(this, x, y,'enemy3', 0,15).setScale(1,1).setOrigin(0,0);
            this.physics.add.existing(this.enemy3);
            this.enemy3.anims.play('enemy3',true);
            this.enemy3.body.setSize(87,65,0,0);// (x,y,[center])
            this.theEnemies.add(this.enemy3);
            this.enemiesLeft += 1;
        }

        // spawn enemy1
        for( let i = 0; i<this.amount+2; i++){
            let y = -200;
            let x = 550;
            switch(Phaser.Math.Between(0,1)){
                case 0: y = Phaser.Math.Between(-50, -250);
                        x = Phaser.Math.Between(500, 550);
                    break;
                case 1: y = Phaser.Math.Between(650, 850);
                        x = Phaser.Math.Between(500, 550);
                    break;
            }
            this.enemy1 = new Enemy(this, x, y,'enemy', 0,8).setScale(1,1).setOrigin(0,0);
            this.physics.add.existing(this.enemy1);
            this.enemy1.anims.play('enemy1',true);
            this.enemy1.body.setSize(98,70,0,0);// (x,y,[center])
            this.theEnemies.add(this.enemy1);
            this.enemiesLeft += 1;
        }

        //console.log('enemies left = ' + this.enemiesLeft);

        //putting all lasers into a group for enemy4's attacks
        this.enemy4Laser = this.physics.add.group();
        
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

        // Power-ups
        this.powerUps = this.physics.add.group();
        // Initial 10 second Power-Up
        this.powerUpTimer = 10000;
        this.myTimer = this.formatTime(this.powerUpTimer);
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent2, callbackScope: this, loop: true });
       

        //player's health bar
        this.box = this.add.image(50,50,'box').setScale(0.5,0.15);
        this.outline = this.add.image(200,58,'outline').setScale(0.3,0.25);
        this.health = new HealthBar(this,52,50,2.9,0.6);
        this.hide = this.add.image(7,50,'boxhide').setScale(0.2,0.25);
        this.add.text(50, 50, 'HP',{color: 'black'}).setOrigin(0.5);
        game.settings.gameHealth = 100;
        this.health.setPercent(game.settings.gameHealth);

        this.gameOver = false;
        this.gameWin = false;
        this.bossStage = false;
        

    }   // end of create function

   /**********************************************************************************************************/
    update() {

        //console.log('gameWin= '+ this.gameWin);
        
        // tracking time and game status
        if(this.gameOver == false && this.gameWin == false){
            this.timer += 0.04;
        }
        else if(this.gameOver == true){
             // stop music
             if(this.bgMusicPlaying == true){
                 this.bgMusic.stop();
             }
             // starts deathScene  
             this.scene.start("deathScene"); 
            }
        else if(this.gameWin == true){
                this.scene.start("bossScene");
                //this.scene.start('winScene');
            }
        

        //display time
     this.showTime = this.add.text(490,33,'Time: ' + Math.floor(this.timer), scoreConfig);
     this.shortestTime = localStorage.getItem("high-score");
 
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

        
        // collision detection for Player attacks to Enemy***************************
        for(let k = 0; k < this.projectiles.getChildren().length; k++){
            
            this.one = this.projectiles.getChildren()[k];

            for(let j = 0; j < this.theEnemies.getChildren().length; j++){

                this.opponent = this.theEnemies.getChildren()[j];
                // if an enemy and a laser collide
                if(this.physics.overlap(this.one,this.opponent) == true){
                    //enemy health goes down - 10
                    if(this.isScaled == true){
                        this.opponent.health -= 30;
                    }else{
                        this.opponent.health -= 10;
                    }
                    
                     // laser gets destroyed
                     this.one.destroy();
                    this.opponent.setPercent(this.opponent.health);
                    
                    //if enemy runs out of health, they die
                    if(this.opponent.health <= 0){
                        this.opponent.destroy();
                        this.opponent.bar.destroy();
                        this.opponent.laser.destroy();
                        this.enemiesLeft -= 1;
                        this.opponent.isDead = true;
                    }
                }
            }
        }
       
        // checking for collision for Enemy attacks to Player
        for(let k = 0; k < this.theEnemies.getChildren().length; k++){
            this.one = this.theEnemies.getChildren()[k];
            if( this.one.speed == 18){ 
                //for enemy 4's attacks
                for(let j = 0; j < this.enemy4Laser.getChildren().length; j++){
                    this.attack = this.enemy4Laser.getChildren()[j];
                    if(this.physics.overlap(this.player,this.attack) == true){
                            //this.one.laser.destroy();
                            this.attack.destroy(); 
                        game.settings.gameHealth -= 1;
                        this.health.setPercent(game.settings.gameHealth)

                        // move to death scene if health bar is 0////////////////////////////////////////////////////////////////////////////
                        if(game.settings.gameHealth <= 0){
                            this.gameOver = true;                
                        }
                    }
                }
            }
            else{ //for enemy 1, enemy 2, enemy 3 's atacks
                if(this.physics.overlap(this.player,this.one.laser) == true){
                    if(this.one.speed != 5){ 
                        // destroy all red lasers - 10
                        this.one.laser.destroy();
                        game.settings.gameHealth -= 1;
                        this.health.setPercent(game.settings.gameHealth)

                    }else{ //for yellow laser = 3
                        game.settings.gameHealth -= 0.1;
                        this.health.setPercent(game.settings.gameHealth)

                    }
                    
                    // move to death scene if health bar is 0
                    if(game.settings.gameHealth <= 0){
                        this.gameOver = true;
                    }
                }
            }
        } // end of collison for-loop projectiles
        
        // starts boss scene
        if(this.enemiesLeft <= 0 && this.wave == 3){
            this.wave = 4;
            console.log('wave:'+ this.wave);
            this.gameWin = true; 
            this.scene.start("bossScene");   
        }
        // last wave
        /*
        if(this.enemiesLeft <= 0 && this.wave == 4){
            console.log('wave= ' + this.wave);

            this.enemiesLeft = 1;
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
                this.theEnemies.add(this.enemy4);
                this.enemiesLeft += 1;
            }
        }*/

        // move to next wave when all enemies are destroyed
        if(this.enemiesLeft <= 0 && this.wave < 3){

            //spawn enemies
            this.wave += 1;
            console.log('wave' + this.wave);
            
            if(this.wave == 2 ){
                this.amount = Phaser.Math.Between(1,2);
                
            }

            if(this.wave == 3){
                this.amount = Phaser.Math.Between(2,3);

            }

            // spawn enemy2
            for( let i = 0; i<this.amount; i++){
                let y = -100;
                let x = 650;
                switch(Phaser.Math.Between(0,1)){
                    case 0: y = Phaser.Math.Between(-50, -250);
                            x = Phaser.Math.Between(600, 650);
                        break;
                    case 1: y = Phaser.Math.Between(650, 850);
                            x = Phaser.Math.Between(600, 650);
                        break;
                }
                this.enemy2 = new Enemy(this, x, y,'enemy2', 0,5).setScale(1,1).setOrigin(0,0);
                this.physics.add.existing(this.enemy2);
                this.enemy2.anims.play('enemy2',true);
                this.enemy2.body.setSize(87,65,0,0);// (x,y,[center])
                this.theEnemies.add(this.enemy2);
                this.enemiesLeft += 1;
            }
            //spawn enemy4
            for( let i = 0; i<this.amount; i++){
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
                this.theEnemies.add(this.enemy4);
                this.enemiesLeft += 1;
            }
            //spawn enemy3
            for( let i = 0; i<this.amount+1; i++){
                let y = -50;
                let x = 700;
                switch(Phaser.Math.Between(0,1)){
                    case 0: y = Phaser.Math.Between(-50, -250);
                            x = Phaser.Math.Between(650, 700);
                        break;
                    case 1: y = Phaser.Math.Between(650, 850);
                            x = Phaser.Math.Between(650, 700);
                        break;
                }
                this.enemy3 = new Enemy(this, x, y,'enemy3', 0,15).setScale(1,1).setOrigin(0,0);
                this.physics.add.existing(this.enemy3);
                this.enemy3.anims.play('enemy3',true);
                this.enemy3.body.setSize(87,65,0,0);// (x,y,[center])
                this.theEnemies.add(this.enemy3);
                this.enemiesLeft += 1;
            }

            //spawn enemy1
            for( let i = 0; i<this.amount+2; i++){
                let y = -200;
                let x = 550;
                switch(Phaser.Math.Between(0,1)){
                    case 0: y = Phaser.Math.Between(-50, -250);
                            x = Phaser.Math.Between(500, 550);
                        break;
                    case 1: y = Phaser.Math.Between(650, 850);
                            x = Phaser.Math.Between(500, 550);
                        break;
                }
                this.enemy1 = new Enemy(this, x, y,'enemy', 0,8).setScale(1,1).setOrigin(0,0);
                this.physics.add.existing(this.enemy1);
                this.enemy1.anims.play('enemy1',true);
                this.enemy1.body.setSize(98,70,0,0);// (x,y,[center])
                this.theEnemies.add(this.enemy1);
                this.enemiesLeft += 1;
            }
            
        }

        // updates players movements
        this.player.update();
        
        // update enemies
        for(let m =0; m < this.theEnemies.getChildren().length; m++){
            this.update = this.theEnemies.getChildren()[m];
            this.update.update();
        }

        if(this.winScene == false){
            this.stopHealth = game.settings.gameHealth;
        }

    } // end of update function.

    
     // More Time UI 
     formatTime(milliseconds){
        return milliseconds / 1000;
    }
    // scale power-up spawn
    onEvent(){
        // upgrade is timed.
        if(this.myTimer2 > 0){
            this.myTimer2 -= 1;
            //console.log(this.myTimer2);
        }
        else{
            this.isScaled = false;
        }
    
    }
    
     onEvent2(){

         if(this.myTimer > 0){
            this.myTimer -= 1;
            //console.log(this.myTimer);
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
            // 30 seconds for next power up when grabbed 
            this.powerUpTimer = 30000;
            this.myTimer = this.formatTime(this.powerUpTimer);
            this.powerUpGone = false;
            }
         } 
    }


    basicAttack(){
      var attack = new BasicAttack(this);
      this.sound.play('attack',{volume: 0.5});
    }

    scaledAttack(){
    var attack = new ScaledAttack(this);
      this.sound.play('scaleUpgradeSound',{volume: 0.5});
    }
    
   

} // end of play class