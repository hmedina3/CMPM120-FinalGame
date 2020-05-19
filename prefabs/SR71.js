// SR-71 prefab
class SR71 extends  Phaser.Physics.Arcade.Sprite  {
  // (scene,x,y,texture,frame)
  constructor(scene, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    scene.add.existing(this); // add object to existing scene
    // audio
  }

  update(){
    this.movement();
    
  } // end of update
  movement(){
    // left/ right movement
    if(keyLEFT.isDown){
      //this.player.setVelocityX(-game.settings.playerSpeed);
      this.x -= 4;
      console.log("left!");
    }else if(keyRIGHT.isDown){
     // this.player.setVelocityX(game.settings.playerSpeed);
     this.x += 4;
      console.log("right!");
    }

    // Up/ Down movement
    if(keyUP.isDown){
      //this.player.setVelocityY(-game.settings.playerSpeed);
      this.y -= 4;
      console.log("up!");
    }else if(keyDOWN.isDown){
      //this.player.setVelocityY(game.settings.playerSpeed);
      this.y += 4;
      console.log("down!");
    }

  }  
 
} // end of SR71 class
