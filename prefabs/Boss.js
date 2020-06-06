//Boss prefab
class Boss extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame,, pointValue)
    //adding pointValue so that different enemies can be worth more points
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.scene = scene;
        this.health = 100;
        this.isDead = false;
        this.bar = scene.add.image(0,0,"health").setScale(8.4,2.35);
        this.shooting = 0;
        this.yUp = y;
        this.yDown = y+50;
        this.change = false;
  
     

    }

    update(){
        this.setPercent(this.health);

        //move enemy up and down
        if(this.y >= this.yDown){
            this.change = true;
        }
        if(this.y <= this.yUp){
            this.change = false;
        }
        if(this.change == false){
            this.y += 1; 
        }else{
            this.y -= 1;
        }
        
        
        //generate random number
        let random = Math.random();

        //enemy shoots attacks at random 
        if(random <= .23 && this.shooting == 0 && this.isDead == false){ // for every 3% chance, the enemy will shoot a laser
            this.shooting = 3;
            this.laser = this.scene.add.tileSprite(this.x - 200,this.y+50,0,0,'bossAttack').setScale(0.5,0.5);
            this.laser2 = this.scene.add.tileSprite(this.x - 200,this.y+250,0,0,'bossAttack').setScale(0.5,0.5);
            this.laser3 = this.scene.add.tileSprite(this.x - 200,this.y-150,0,0,'bossAttack').setScale(0.5,0.5);
            this.scene.physics.add.existing(this.laser);
            this.scene.physics.add.existing(this.laser2);
            this.scene.physics.add.existing(this.laser3);
            this.laser.body.setSize(954,154);
            this.laser2.body.setSize(954,154);
            this.laser3.body.setSize(954,154);
            this.scene.bossLaser.add(this.laser);
            this.scene.bossLaser.add(this.laser2);
            this.scene.bossLaser.add(this.laser3);

        }

        //moving laser if enemy shot one
        if(this.shooting == 3 && this.isDead == false){
            this.laser.x -= 9;
            this.laser2.x -= 9;
            this.laser3.x -= 9;

            if(this.laser.x <= -600 && this.shooting > 0){
                this.laser.x = -600;
                this.laser.destroy();
                this.shooting -= 1;
            }
            if(this.laser2.x <= -600 && this.shooting > 0){
                this.laser2.x = -600;
                this.laser2.destroy();
                this.shooting -= 1;
            }
            if(this.laser3.x <= -600 && this.shooting > 0){
                this.laser3.x = -600;
                this.laser3.destroy();
                this.shooting -= 1;
            }
        }
    }



    setPercent(percent){

        percent = percent/100;
        this.bar.setScale(8.4*percent,2.35);

        if(percent <= 0){
            this.destroy();
            this.isDead == true
        }

        if(percent <= 0.67 && percent > 0.34){
            //this.setTexture('boss2');
        }
        if(percent <= 0.33){
            //this.setTexture('boss3');
        }
        if( percent >= 1){
            //this.setTexture('boss1');
        }
    }

    
}
