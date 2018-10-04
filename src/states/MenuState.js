import Settings from 'core/Settings';

class MenuState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';

      this.music = this.game.sound.play("music");

      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.makeParticles();

      this.menuTitle1 = this.game.add.sprite(267, 62, "menu-title1");
      this.menuTitle2 = this.game.add.sprite(267, 62, "menu-title2");
      this.menuTitle2.alpha = 0;

      this.menuSubtitle = this.game.add.sprite(221, 435, "menu-subtitle");
      this.menuStart = this.game.add.sprite(477, 612, "menu-start");
      this.menuAbout = this.game.add.sprite(1000, 675, "menu-about");
      this.menuAbout.alpha = 0.6;

      this.menuStart.inputEnabled = true;
      this.menuStart.events.onInputDown.add(this.startGame, this);

      this.menuAbout.inputEnabled = true;
      this.menuAbout.events.onInputDown.add(this.showAboutScreen, this);

      this.animateIn();

      this.tick = 0;
    }

    makeParticles() {
      var emitter = this.game.add.emitter(this.game.world.centerX, -200, 90);

      emitter.width = this.game.world.width;

      emitter.makeParticles(['floater1', "floater2", "floater3", "floater4"]);

      emitter.minParticleScale = 0.5;
      emitter.maxParticleScale = 0.9;

      emitter.setYSpeed(10, 100);

      emitter.start(false, 9000, 200, 0);
    }

    animateIn() {
      this.game.add.tween(this.menuTitle1).from( { alpha: 0 }, 1000, "Linear", true);

      this.game.add.tween(this.menuSubtitle).from( { x: -850 }, 500, Phaser.Easing.Cubic.Out, true, 1000);
      this.game.add.tween(this.menuStart).from( { x: 1280 }, 500, Phaser.Easing.Cubic.Out, true, 1000);
      this.game.add.tween(this.menuAbout).from( { y: 730 }, 500, Phaser.Easing.Back.Out, true, 2000);
    }

    animateOut() {
      this.game.add.tween(this.menuTitle1).to( { alpha: 0 }, 500, "Linear", true);
      this.game.add.tween(this.menuTitle2).to( { alpha: 0 }, 500, "Linear", true);
      this.game.add.tween(this.menuSubtitle).to( { alpha: 0 }, 500, "Linear", true, 100);
      this.game.add.tween(this.menuStart).to( { alpha: 0 }, 500, "Linear", true, 200);
      this.game.add.tween(this.menuAbout).to( { alpha: 0 }, 500, "Linear", true, 300);

      this.game.time.events.add(1, this.doTransition, this);
    }

    update() {
      if(this.menuTitle1.alpha == 1 || this.menuTitle2.alpha == 1 ) {
        this.wiggleLogo();
      }
    }

    wiggleLogo() {
      if(this.tick < 12) {
        this.tick++;
        this.menuTitle1.alpha = 1;
        this.menuTitle2.alpha = 0;
      }
      else if(this.tick >= 12 && this.tick < 24) {
        this.tick++;
        this.menuTitle1.alpha = 0;
        this.menuTitle2.alpha = 1;
      }
      else {
        this.tick = 0;
      }
    }

    startGame() {
      this.animateOut();
    }

    showAboutScreen() {
      this.state.start('AboutState');
    }

    doTransition() {
      this.state.start('GameState');
    }

    shutdown() {

    }
}

export default MenuState;
