//Health Bar prefab
class HealthBar extends Phaser.GameObjects.Sprite{
    //tutorial from https://www.youtube.com/watch?v=dJwjv5LfJPs
    constructor(scene,x,y,sizeX,sizeY){
        super(scene);
        this.bar = scene.add.image(x,y,"health").setScale(sizeX,sizeY); //(placement [width,height],key) .setScale(3.7,0.6)
        this.dead = false;
        this.width = sizeX;
    }

    update(){

    }

    setPercent(percent){
        percent = percent/100;
        this.bar.setScale(this.width*percent,0.6);
        
        if(percent == 0){
            this.dead == true
        }
    }
}