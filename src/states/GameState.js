import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameState extends Phaser.State {

    create() {
      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.right = this.game.add.sprite(598, 34, "hand-right");
      this.left = this.game.add.sprite(212, 331, "hand-left");

      this.left.anchor.set(0.68, 0.05);

      this.game.physics.enable(this.left, Phaser.Physics.ARCADE);
    }

    update() {

      this.left.position.x = this.game.input.x;
      this.left.position.y = this.game.input.y;

      /*
      this.game.physics.arcade.moveToPointer(this.left, 1000);

      if (Phaser.Rectangle.contains(this.left.body, this.game.input.x, this.game.input.y)) {
        this.left.body.velocity.setTo(0, 0);
      }
      */
    }

    shutdown() {

    }
}

export default GameState;
