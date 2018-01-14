import Settings from 'core/Settings';

class MenuState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';

      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.menuTitle = this.game.add.sprite(267, 62, "menu-title");
      this.menuSubtitle = this.game.add.sprite(221, 435, "menu-subtitle");
      this.menuStart = this.game.add.sprite(477, 612, "menu-start");
      this.menuAbout = this.game.add.sprite(937, 670, "menu-about");
      this.menuAbout.alpha = 0.3;

      this.menuStart.inputEnabled = true;
      this.menuStart.events.onInputDown.add(this.startGame, this);
    }

    startGame() {
      this.state.start('GameState');
    }

    shutdown() {

    }
}

export default MenuState;
