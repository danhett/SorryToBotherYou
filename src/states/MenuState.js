import Settings from 'core/Settings';

class MenuState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';

      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.menuTitle1 = this.game.add.sprite(267, 62, "menu-title1");
      this.menuTitle2 = this.game.add.sprite(267, 62, "menu-title2");
      this.menuTitle2.alpha = 0;

      this.menuSubtitle = this.game.add.sprite(221, 435, "menu-subtitle");
      this.menuStart = this.game.add.sprite(477, 612, "menu-start");
      this.menuAbout = this.game.add.sprite(1000, 675, "menu-about");
      this.menuAbout.alpha = 0.3;

      this.menuStart.inputEnabled = true;
      this.menuStart.events.onInputDown.add(this.startGame, this);

      this.animateIn();

      this.tick = 0;
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
      if(this.tick < 10) {
        this.tick++;
        this.menuTitle1.alpha = 1;
        this.menuTitle2.alpha = 0;
      }
      else if(this.tick >= 10 && this.tick < 20) {
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

    doTransition() {
      this.state.start('GameState');
    }

    shutdown() {

    }
}

export default MenuState;
