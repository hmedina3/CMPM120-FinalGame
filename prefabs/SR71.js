// SR-71 prefab
class SR71 extends Phaser.GameObjects.Sprite {

    // (scene,x,y,texture,frame)
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        
        scene.add.existing(this); // add object to existing scene
       
        // audio
   
    }

    update(){

      // left/right movement
      if(keyLEFT.isDown && this.x >= 0){
        // speed depends on this
        this.x -= 4;
      }else if (keyRIGHT.isDown && this.x <= 600){
        this.x += 4;
      }
    
    } // end of update

  } // end of SR71 class
