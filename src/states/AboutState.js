class AboutState extends Phaser.State {

    create() {
      this.bg = this.game.add.sprite(0, 0, "about-screen");
    }


    shutdown() {

    }
}

export default AboutState;
