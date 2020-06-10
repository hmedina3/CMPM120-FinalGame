//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame,, pointValue)
    //adding pointValue so that different enemies can be worth more points
    constructor(scene, x, y, texture, frame, speed){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.speed = speed;
        //this.playerAttack = scene.projectiles.getChildren();
        this.scene = scene;
        this.health = 100;
        this.isDead = false;
        this.bar = scene.add.image(x,y-30,"enemyHealth").setScale(0.25,0.25);
        //this.bar = scene.add.image(300,300,"health").setScale(0.5,0.5);
        this.shooting = false;
        this.even = 0;
        this.timing = 0;
        this.bossStage = false;
        //this.laser = scene.add.tileSprite(0,0,200,150,'lasers');//([where on screen],[which area in image])
        
       //determining direction
       if( y <= 0){
           this.where = -10;
       }else{
           this.where = 10;
       }

    }

    update(){
        this.setPercent(this.health);
        this.bar.y = this.y - 15;
        this.bar.x = this.x + 37;

        //move enemy up and down
        //this.y += this.speed;

        //setting different algorithm for different enemy types
        //you know what type of enemy is which by their speed
        //enemy1
        if (this.speed == 8){

            //move enemy up and down
            if(this.where <= 0){
                this.y += this.speed;
            }else{
                this.y -= this.speed;
            }
            
            
            //generate random number
            let random = Math.random();

            //enemy shoots attacks at random 
            if(random <= .03 && this.shooting == false && this.isDead == false){ // for every 3% chance, the enemy will shoot a laser
                this.shooting = true;
                this.laser = this.scene.add.tileSprite(this.x,this.y+50,90,67,'lasers');
                this.scene.physics.add.existing(this.laser);
                this.laser.body.setSize(35,10,true);

            }

            //moving laser if enemy shot one
            if(this.shooting == true && this.isDead == false){
                this.laser.x -= 9;
                if(this.laser.x <= 0 && this.shooting == true){
                    this.laser.x = -100;
                    this.shooting = false;
                }
            }
        }

        //enemy2
        if (this.speed == 5){ 

            //move enemy up and down
            if(this.where <= 0){
                this.y += this.speed;
            }else{
                this.y -= this.speed;
            }

            //generate random number
            let random = Math.random();

            //enemy shoots attacks at random 
            if(random <= .03 && this.shooting == false && this.isDead == false){ // for every 3% chance, the enemy will shoot a laser
                this.shooting = true;
                this.laser = this.scene.add.tileSprite(this.x- 300,this.y+25,0,0,'yellow_lasers').setScale(3.5,1);
                this.scene.physics.add.existing(this.laser);
                this.laser.body.setSize(200,20);

            }

            //moving laser if enemy shot one
            if(this.shooting == true && this.isDead == false){
                this.laser.y = this.y + 25;
                if(this.laser.y >= config.height && this.shooting == true){
                    this.laser.destroy();
                    this.shooting = false;
                }
            }
            
        }

        //enemy3
        if (this.speed == 15 && this.isDead == false){ 
            
            //get player y coordinates
            this.playerY = this.scene.player.y;

            //control shooting rate
            this.even += 1;
            this.check = this.even%2;

            //destroy laser
            this.timing +=1;

            //move enemy up and down
            if(this.y < this.playerY && this.shooting == false){ //move down
                this.y += this.speed;
                if(this.y >= this.playerY){
                    const stay = this.playerY;
                    this.y = stay;
                     
                }

            }else if(this.y > this.playerY && this.shooting == false){ //move up
                this.y -= this.speed;
                if(this.y <= this.playerY){
                    const stay = this.playerY;
                    this.y = stay;
                    
                }
            }else{ //this.y == this.playerY
                const stay = this.playerY;
                this.y = stay;
                
            }

            //enemy shoots attacks in intervals of 4
            if(this.check == 0 && this.shooting == false && this.isDead == false){ // for every 3% chance, the enemy will shoot a laser
                this.shooting = true;
                this.laser = this.scene.add.tileSprite(this.x,this.y+50,90,67,'lasers');
                this.scene.physics.add.existing(this.laser);
                this.laser.body.setSize(40,10,true);
                this.scene.physics.world.enableBody(this.laser);
                
            } 

            //moving laser if enemy shot one
            if(this.shooting == true && this.isDead == false){
                this.laser.x -= this.speed;
                if(this.shooting == true && this.laser.x <= 0){
                    this.laser.destroy();
                    this.shooting = false;
                }
            }
            
        }

        //enemy4
        if (this.speed == 18){ 

            //move enemy up and down
            if(this.where <= 0){
                this.y += this.speed;
            }else{
                this.y -= this.speed;
            }

            //control shooting rate
            this.even += 1;
            if(this.bossStage == true){
                this.check = this.even%5;
            }else{
                this.check = this.even%25;
            }

            //enemy shoots attack constantly while its alive
            if(this.check == 0 && this.isDead == false){ 
                this.shooting = true;
                this.laser = this.scene.add.tileSprite(this.x,this.y+50,90,67,'lasers');
                this.scene.physics.add.existing(this.laser);
                this.scene.physics.world.enableBody(this.laser);
                this.laser.body.setSize(35,10,true);
                this.scene.enemy4Laser.add(this.laser);

            }

            //moving laser if enemy shot one
            if(this.shooting == true && this.isDead == false){
                for( let j = 0; j < this.scene.enemy4Laser.getChildren().length; j++){
                    this.attack = this.scene.enemy4Laser.getChildren()[j];
                    this.attack.body.velocity.x = -250;
                
                    if(this.attack.body.x <= 0 && this.shooting == true){
                        this.attack.destroy();
                    }
                }
            }
                
        }

        //wraparound screen bounds
        if(this.y >= config.height && this.where <= 0){
            this.resetUp();
        }
        if(this.y <= -300 && this.where >= 10){
            this.resetDown();
        }

    }

    resetUp(){
        this.y = -200;
    }

    resetDown(){
        this.y = 800;
    }

    setPercent(percent){
        percent = percent/100;
        this.bar.setScale(0.25*percent,0.25);
        
        if(percent <= 0){
            this.isDead == true
        }
    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y + ship.y){
                return true;
        }else{
            return false;
        }
    }
    
}