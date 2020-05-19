//Enemy prefab
class Enemy extends Phaser.GameObjects.Sprite{
    //(scene,x,y,texture,frame,, pointValue)
    //adding pointValue so that different enemies can be worth more points
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); //add object to existing scene
        this.points = pointValue;
        this.scene = scene;
        //this.shooting = false;
        //this.laser = scene.add.tileSprite(0,0,200,150,'lasers');//([where on screen],[which area in image])
        
       
    }

    update(){
        /*
        //generate random number
        let random = Math.random();

        //enemy shoots attacks at random 
        if(random <= .01 && this.shooting == false){ // for every 1% chance, the enemy will shoot a laser
            this.shooting = true;
            this.laser = this.scene.add.tileSprite(this.x,this.y,100,50,'lasers')
        }

        if(this.shooting == true){
            this.laser.x -= 3;
            if(this.laser.x <= 0 && this.shooting == true){
                this.laser.x = -10
                this.shooting = false;
            }
        }
        */


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
}