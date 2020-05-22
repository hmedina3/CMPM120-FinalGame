//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame,, pointValue)
    //adding pointValue so that different enemies can be worth more points
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.points = pointValue;
        //this.playerAttack = scene.projectiles.getChildren();
        this.scene = scene;
        this.health = 100;
        this.isDead = false;
        this.bar = scene.add.image(x,y-30,"enemyHealth").setScale(0.25,0.25);
        
        
        //this.bar = scene.add.image(300,300,"health").setScale(0.5,0.5);
        //this.shooting = false;
        //this.laser = scene.add.tileSprite(0,0,200,150,'lasers');//([where on screen],[which area in image])
        
       
    }

    update(){
        this.setPercent(this.health);
        this.bar.y = this.y - 15;
        this.bar.x = this.x + 37;
        

        //move enemy up and down
        this.y += game.settings.EnemySpeed;

        //wraparound screen bounds
        if(this.y >= config.height){
            //this.x = game.config.width;
            this.reset();
        }
        
    }

    reset(){
        this.y = -200;
    }

    setPercent(percent){
        percent = percent/100;
        this.bar.setScale(0.25*percent,0.25);
        
        if(percent == 0){
            this.dead == true
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