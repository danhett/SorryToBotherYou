class AboutState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';

      this.bg = this.game.add.sprite(0, 0, "about-screen");
      
      this.hitzone = this.game.add.sprite(930, 600, "hitzone");
      this.hitzone.alpha = 0.2;

      this.hitzone.inputEnabled = true;
      this.hitzone.events.onInputDown.add(this.goBack, this);
    }

    goBack() {
      this.game.sound.play("click");
      this.game.time.events.add(Phaser.Timer.SECOND *  0.2, this.doTransition, this);
    }

    doTransition() {
      this.state.start('MenuState');
    }

    shutdown() {

    }
}

export default AboutState;
