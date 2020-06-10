class Preloader extends Phaser.Scene {
     
    constructor() {
        super("preloaderScene");

    }

    preload(){
            var loadingText = this.make.text({
                x: 380,
                y: 250,
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
