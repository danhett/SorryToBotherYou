import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameOverState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';
      
      this.bg = this.game.add.sprite(0, 0, "gameover-screen");
    }

    shutdown() {

    }
}

export default GameOverState;
