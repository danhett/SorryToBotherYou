import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameState extends Phaser.State {

    create() {
      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.xtarget = this.game.input.x;
      this.ytarget = this.game.input.y;
      this.xdiff;
      this.ydiff;

      // create the hands
      this.right = this.game.add.sprite(500, 34, "hand-right");
      this.left = this.game.add.sprite(212, 331, "hand-left");

      // create the UI
      this.highlight = this.right.addChild(this.game.make.sprite(0, 0, "highlight"));
      this.buttons = this.right.addChild(this.game.make.sprite(79, 494, "buttons"));
      this.button1 = this.right.addChild(this.game.make.sprite(79, 493, "1-on"));
      this.button2 = this.right.addChild(this.game.make.sprite(150, 493, "2-on"));
      this.button3 = this.right.addChild(this.game.make.sprite(223, 493, "3-on"));
      this.button4 = this.right.addChild(this.game.make.sprite(294, 493, "4-on"));

      // adjust the anchor point of the left hand to
      // match the fingertip, so we can stick to the mouse
      this.left.anchor.set(0.68, 0.01);

      this.enableUI();
    }

    enableUI() {
      // make the first button active
      //this.setState(1);

      this.button1.inputEnabled = true;
      this.button1.name = "email";
      this.button1.events.onInputDown.add(this.setState, this);
      this.button1.events.onInputUp.add(this.resetHand, this);

      this.button2.inputEnabled = true;
      this.button2.name = "facebook";
      this.button2.events.onInputDown.add(this.setState, this);
      this.button2.events.onInputUp.add(this.resetHand, this);

      this.button3.inputEnabled = true;
      this.button3.name = "twitter";
      this.button3.events.onInputDown.add(this.setState, this);
      this.button3.events.onInputUp.add(this.resetHand, this);

      this.button4.inputEnabled = true;
      this.button4.name = "whatsapp";
      this.button4.events.onInputDown.add(this.setState, this);
      this.button4.events.onInputUp.add(this.resetHand, this);
    }

    setState(state) {
      this.button1.alpha = 0;
      this.button2.alpha = 0;
      this.button3.alpha = 0;
      this.button4.alpha = 0;

      this.left.scale.set(0.9);

      if(state.name == "email") {
        this.button1.alpha = 1;
        this.highlight.tint = 0xc4afbb;
      }

      if(state.name == "facebook") {
        this.button2.alpha = 1;
        this.highlight.tint = 0xffac71;
      }

      if(state.name == "twitter") {
        this.button3.alpha = 1;
        this.highlight.tint = 0xc4d8bb;
      }

      if(state.name == "whatsapp") {
        this.button4.alpha = 1;
        this.highlight.tint = 0xffacc8;
      }
    }

    resetHand() {
      this.left.scale.set(1);
    }

    update() {
      this.moveHand();
    }

    moveHand() {
      // rotate the hand slightly based on the position
      this.left.angle = this.game.input.x / 40;

      // move the hand to the cursor, with a little easing
      this.xdiff = this.game.input.x - this.left.position.x;
      this.left.position.x += this.xdiff *= 0.2;

      this.ydiff = this.game.input.y - this.left.position.y;
      this.left.position.y += this.ydiff *= 0.2;
    }

    shutdown() {

    }
}

export default GameState;
