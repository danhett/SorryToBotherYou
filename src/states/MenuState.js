import Settings from 'core/Settings';

class MenuState extends Phaser.State {

    create() {
      //this.bg = this.game.add.sprite(0, 0, "game-background");

      // TEMP
      this.state.start('GameState');
    }

    shutdown() {

    }
}

export default MenuState;
