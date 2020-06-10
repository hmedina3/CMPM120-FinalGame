class ScaledAttack extends Phaser.GameObjects.Sprite{
    
    constructor(scene){
        var x = scene.player.x + 100;
        var y = scene.player.y + 50;

        super(scene, x, y, 'scaleUpgrade' );
        scene.add.existing(this); //add object to existing scene
        
        //this.play('base');
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 350;
        this.body.setSize(10,154);
        scene.projectiles.add(this);
    }

    update(){

        if(this.x < -800){
            this.destroy();
        }
    }

}