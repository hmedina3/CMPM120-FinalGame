//Health Bar prefab
class HealthBar extends Phaser.GameObjects.Sprite{
    //tutorial from https://www.youtube.com/watch?v=dJwjv5LfJPs
    constructor(scene){
        super(scene);
        this.bar = scene.add.image(0,0,"health").setScale(3.7,0.6); //(placement [width,height],key)
        this.dead = false;
    }

    update(){

    }

    setPercent(percent){
        percent = percent/100;
        this.bar.setScale(3.7*percent,0.6);
        
        if(percent == 0){
            this.dead == true
        }
    }
}