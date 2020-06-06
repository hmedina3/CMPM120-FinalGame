class Credits extends Phaser.Scene {
    /*
     credits section
    */
     
    constructor() {
        super("creditsScene");
    }
    create () {

        let textConfig = {
            fontFamily: 'Helvetica',
            fontSize: '40px',
            color: '#fafafa',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.creditsText2 = this.add.text(325, 50, "Credits", textConfig);
        this.madeByText = this.add.text(100, 100, "Game Developed by the We Make Games Team", textConfig);
        this.madeByText.setFontSize('28px');
        this.madeByText2 = this.add.text(300, 150, "Hector Medina", textConfig);
        this.madeByText2.setFontSize('28px');
        this.madeByText3 = this.add.text(310, 200, "Yongshi Sun", textConfig);
        this.madeByText3.setFontSize('28px');
        this.madeByText4 = this.add.text(50, 400, "Even given the circumstances of the year 2020, we were able to push through and finish this game.", textConfig);
        this.madeByText4.setFontSize('16px');
        this.madeByText4 = this.add.text(50, 420, "Let us look forward to the future to advance humanity and work towards equality for all.", textConfig);
        this.madeByText4.setFontSize('16px');





    } // end of create function.
     
} // end of credits class.