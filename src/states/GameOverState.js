import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameOverState extends Phaser.State {

    create() {
      document.body.style.cursor = 'default';
      
      this.bg = this.game.add.sprite(0, 0, "gameover-screen");

      this.retryBtn = this.game.add.sprite(570, 530, "hitzone");
      this.retryBtn.alpha = 0;
      this.retryBtn.scale.set(0.6);
      this.retryBtn.inputEnabled = true;
      this.retryBtn.events.onInputDown.add(this.doRetry, this);

      this.quitBtn = this.game.add.sprite(800, 530, "hitzone");
      this.quitBtn.alpha = 0;
      this.quitBtn.scale.set(0.6);
      this.quitBtn.inputEnabled = true;
      this.quitBtn.events.onInputDown.add(this.doQuit, this);
    }

    doRetry() {
      this.game.sound.play("click");
      this.game.time.events.add(Phaser.Timer.SECOND *  0.2, this.doRetryTransition, this);
    }

    doRetryTransition() {
      this.state.start('GameState');
    }

    doQuit() {
      this.game.sound.play("click");
      this.game.time.events.add(Phaser.Timer.SECOND *  0.2, this.doQuitTransition, this);
    }

    doQuitTransition() {
      this.state.start('MenuState');
    }

    shutdown() {

    }
}

export default GameOverState;
