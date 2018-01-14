import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameOverState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';

      console.log("gameover");
    }

    shutdown() {

    }
}

export default GameOverState;
