
class Play extends Phaser.Scene {
     
    constructor() {

        super("playScene");
    }

    preload() {
        //background music
        this.load.audio('sfx_music_2', './assets/OrbitalColossus.mp3'); //https://opengameart.org/content/space-boss-battle-theme
        
        // SR-71 - main character
        this.load.spritesheet('SR-71','./assets/player1.png',{frameWidth: 250, frameheight: 173, startFrame: 0, endFrame: 1}); //https://opengameart.org/content/one-more-lpc-alternate-character
        // SR-71 upgrade sound effects
        // Sound effect obtained from https://www.zapsplat.com
        this.load.audio('attack', './assets/sound_spark_Laser-Like_Synth_Laser_Sweep_Burst_13.mp3');
        this.load.audio('scaleUpgrade', './assets/record006_mixdown.wav');
        this.load.audio('beamUpgrade', './assets/record005_mixdown.wav');

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

        //icons for power-ups

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

        //boss sprite
        this.load.spritesheet('boss','./assets/bossbig.png', {frameWidth: 885, frameheight: 749, startFrame: 0, endFrame: 2});
        this.load.image('boss1','./assets/boss1big.png');
        this.load.image('boss2','./assets/boss2big.png');
        this.load.image('boss3','./assets/boss3big.png');
        this.load.image('bossAttack','./assets/bosspower.png');

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
        if(bgMusicPlaying == false){
        this.bgMusic = this.sound.add('sfx_music_2', { delay: 5, loop: true});
        this.bgMusic.play(music);
        bgMusicPlaying = true;
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

        //animation for boss
        /*
        this.anims.create({
            key:'boss',
            frames: this.anims.generateFrameNumbers('boss',{start:0,end:2,first:0}),
            framerate:60,
            repeat: -1,
        })*/
        
        // different types of enemies
        /*
        // enemy1
        this.enemy1 = new Enemy(this, 550, -200,'enemy', 0,8).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy1);
        this.enemy1.anims.play('enemy1',true);
        this.enemy1.body.setSize(98,70,0,0);// (x,y,[center])
        //enemy2 (blue one)
        this.enemy2 = new Enemy(this, 650, -100,'enemy2', 0,5).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy2);
        this.enemy2.anims.play('enemy2',true);
        this.enemy2.body.setSize(87,65,0,0);// (x,y,[center])
        //enemy3 (red one)
        this.enemy3 = new Enemy(this, 700, -50,'enemy3', 0,15).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy3);
        this.enemy3.anims.play('enemy3',true);
        this.enemy3.body.setSize(87,65,0,0);// (x,y,[center])
        //enemy4 (small gray one)
        this.enemy4 = new Enemy(this, 750, -250,'enemy4', 0,18).setScale(1,1).setOrigin(0,0);
        this.physics.add.existing(this.enemy4);
        this.enemy4.anims.play('enemy4',true);
        this.enemy4.body.setSize(70,55,0,0);// (x,y,[center])
        */

        // spawm asteroids
        this.asteroidGroup = this.physics.add.group();
        this.howMany = Phaser.Math.Between(5,10);
        for(let a = 0; a < this.howMany; a++){
            let random = Math.random();
            console.log('random: '+ random);
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
            console.log('x: '+ this.asteroid.x+ ' y: ' + this.asteroid.y);
            console.log('size: '+ this.size);
            console.log('how many: '+ this.howMany);
        }

        //spawn enemies
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

        console.log('enemies left = ' + this.enemiesLeft);

        /*
        //testig boss
        this.boss = new Boss(this, 700, 280,'boss1', 0).setScale(1.3,1.3);
        this.physics.add.existing(this.boss);
        this.boss.body.setCircle(270,183,188);
        */

        /*
        //putting all types of enemies into a group
        this.theEnemies = this.physics.add.group();
        this.theEnemies.add(this.enemy1);
        this.theEnemies.add(this.enemy2);
        this.theEnemies.add(this.enemy3);
        this.theEnemies.add(this.enemy4);
        */

        //putting all lasers into a group for enemy4's attacks
        this.enemy4Laser = this.physics.add.group();
        this.bossLaser = this.physics.add.group();
        
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
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

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
        this.gameWin = false;
        this.bossStage = false;
        

    }   // end of create function

   /**********************************************************************************************************/
    update() {
        
        // tracking time and game status
        if(this.gameOver == false && this.gameWin == false){
            this.timer += 0.04;
        }
        else if(this.gameOver == true){
             // stop music
             this.bgMusic.stop();
             // deletes playScene
             this.scene.remove("playScene");
             // starts deathScene  
             this.scene.start("deathScene"); 
            }
        else if(this.gameWin == true){
                //this.winScene();
                this.scene.start("winScene");
            }
        

        //display time
     this.showTime = this.add.text(490,33,'Time: ' + Math.floor(this.timer), scoreConfig);

       this.shortestTime = localStorage.getItem("high-score");
 
        
        // moves background
        this.background.tilePositionX += 0.4;

        // spacebar test
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            //console.log("Firing for effect!");
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
                    //bullet gets destroy
                    this.one.destroy();
                    //if enemy runs out of health, they die
                    if(this.opponent.health == 0){
                        this.opponent.destroy();
                        this.opponent.bar.destroy();
                        this.opponent.laser.destroy();
                        this.enemiesLeft -= 1;
                        this.opponent.isDead = true;
                    }
                }
            }
        }
       

        
        //checking for collision between enemy attack and player
        for(let k = 0; k < this.theEnemies.getChildren().length; k++){
            this.one = this.theEnemies.getChildren()[k];
            if( this.one.speed == 18){ //for enemy 4's attacks
                for(let j = 0; j < this.enemy4Laser.getChildren().length; j++){
                    this.attack = this.enemy4Laser.getChildren()[j];
                    if(this.physics.overlap(this.player,this.attack) == true){
                        //this.one.laser.destroy();
                        this.attack.destroy();
                        game.settings.gameHealth -= 2;
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
                    if(this.one.speed != 5){ //destroy all red laser
                        this.one.laser.destroy();
                        game.settings.gameHealth -= 10;
                        this.health.setPercent(game.settings.gameHealth)

                    }else{ //for yellow laser
                        game.settings.gameHealth -= 3;
                        this.health.setPercent(game.settings.gameHealth)

                    }
                    
                    // move to death scene if health bar is 0
                    if(game.settings.gameHealth <= 0){
                        this.gameOver = true;
                    }
                }
            }
        }

        //spawn boss
        if(this.enemiesLeft <= 0 && this.wave == 3){

            console.log('boss stage');

            this.enemiesLeft = 1;
            this.bossStage = true;
            this.wave = 4;
            
            this.boss = new Boss(this, 700, 280,'boss1', 0).setScale(1.3,1.3);
            this.physics.add.existing(this.boss);
            this.boss.body.setCircle(270,183,188); //(radius, x offset, y offset)
            //this.boss.setTexture('boss3');

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
        }

        //entering boss stage
        if(this.bossStage == true){

            this.boss.update();
            console.log('boss updates');

            //collision detection between player attck to boss
            for(let k = 0; k < this.projectiles.getChildren().length; k++){
                this.one = this.projectiles.getChildren()[k];
                //if an enemy and a bullet/laser collide
                if(this.physics.overlap(this.one,this.boss) == true){
                    //enemy health goes down
                    this.boss.health -= 3;
                    this.boss.setPercent(this.boss.health);
                    //bullet gets destroy
                    this.one.destroy();
                    //if enemy runs out of health, they die
                    if(this.boss.health == 0){
                        this.boss.destroy();
                        this.boss.bar.destroy();
                        this.boss.laser.destroy();
                        this.boss.laser2.destroy();
                        this.boss.laser3.destroy();
                        this.enemiesLeft -= 1;
                        this.boss.isDead = true;
                        //this.gameWin = true;
                    }
                }
                
            }

            //collision detection between boss attack to player
            for(let l = 0; l < this.bossLaser.getChildren().length; l++){
                this.power = this.bossLaser.getChildren()[l];
                if(this.physics.overlap(this.player,this.power) == true){
                    game.settings.gameHealth -= 1;
                    this.health.setPercent(game.settings.gameHealth);
                }
                    
                // move to death scene if health bar is 0
                if(game.settings.gameHealth <= 0){
                    this.gameOver = true;
                }
                
            }

            if(this.enemiesLeft == 0 ){
                this.gameWin = true;
            }

            if(this.gameWin == true){
                this.winScene();
            }

        }

        //move to next wave when all enemies are destroyed
        if(this.enemiesLeft <= 0 && this.wave < 3){

            //spawn enemies
            this.wave += 1;
            
            if(this.wave == 2 ){
                this.amount = Phaser.Math.Between(1,2);
                console.log('wave' + this.wave);
            }

            if(this.wave == 3){
                this.amount = Phaser.Math.Between(2,3);
                console.log('wave' + this.wave);
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

  
        //this.enemy1.update();
        //this.enemy2.update();
        //this.enemy3.update();
        //this.enemy4.update();
        this.player.update();
        //this.boss.update();

        //update enemies
        for(let m =0; m<this.theEnemies.getChildren().length; m++){
            this.update = this.theEnemies.getChildren()[m];
            this.update.update();
        }

        if(this.winScene == false){
            this.stopHealth = game.settings.gameHealth;
        }

    } // end of update function. 

    basicAttack(){
      var attack = new BasicAttack(this);
      this.sound.play('attack',{volume: 0.5});
    }
    
    // win scene
    winScene(){

        // when the player beats the boss level, go to win scene
        if(this.gameWin == true){
            //tracking shortest time
            if(this.shortestTime == null || this.shortestTime == 0){
                localStorage.setItem("high-score", 1000);
                this.shortestTime = 1000;
            }else if(this.timer < this.shortestTime){
                localStorage.setItem("high-score", this.timer);
            }

            //prevent health bar from increasing
            game.settings.gameHealth = this.stopHealth;
            this.health.setPercent(game.settings.gameHealth);

            this.bgMusic.stop();
            this.add.text(game.config.width/2, game.config.height/6 + 50, 'Project Ezekiel was a sucess! Congratulations!',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Finishing Time: ' + Math.floor(localStorage.getItem("high-score")),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, 'R to Restart or M for Menu', deathConfig).setOrigin(0.5);

            // check for input during end scene
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart(this.p1Score);
                this.bossStage = false;
                this.gameWin = false;
                game.settings.gameScore = 0;
                this.bgMusic.stop();
                this.scene.start('tutorialScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyM)){
                this.scene.start('menuScene');
                this.bgMusic.stop();
            }
        
        }
    }
    
} // end of play class