import Settings from 'core/Settings';

class MenuState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';

      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.menuTitle1 = this.game.add.sprite(267, 62, "menu-title1");
      this.menuTitle2 = this.game.add.sprite(267, 62, "menu-title2");

      this.menuSubtitle = this.game.add.sprite(221, 435, "menu-subtitle");
      this.menuStart = this.game.add.sprite(477, 612, "menu-start");
      this.menuAbout = this.game.add.sprite(1000, 675, "menu-about");
      this.menuAbout.alpha = 0.3;

      this.menuStart.inputEnabled = true;
      this.menuStart.events.onInputDown.add(this.startGame, this);

      this.tick = 0;
    }

    update() {
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
      this.state.start('GameState');
    }

    shutdown() {

    }
}

export default MenuState;
