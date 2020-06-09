class Preloader extends Phaser.Scene {
     
    constructor() {
        super("preloaderScene");

    }

    preload(){
        var width = this.cameras.main.width;
            var height = this.cameras.main.height;
            var loadingText = this.make.text({
                x: width / 2,
                y: height / 2 - 50,
                text: 'Loading...',
                style: {
                    font: '28px Helvetica',
                    fill: 'yellow'
                }
            });

            loadingText.setOrigin(0.5, 0.5);
            this.load.on('complete', this.complete,{scene:this.scene});
    }

    complete() {
       loadingText.destroy(); 
	}

} // end of Preloader class.
