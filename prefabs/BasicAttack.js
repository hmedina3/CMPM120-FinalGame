class BasicAttack extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y - 16;
        super(scene, x, y, 'basicAttack');
        scene.add.existing(this); //add object to existing scene
        
        this.play('base');
        scene.physics.world.enableBody(this);
        this.body.velocity.x = 250;
        scene.projectiles.add(this);
    }

    update(){

        if(this.x < 32){
            this.destroy();
        }
    }

}