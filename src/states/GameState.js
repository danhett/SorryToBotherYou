import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameState extends Phaser.State {

    create() {
      document.body.style.cursor = 'none';

      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.xtarget = this.game.input.x;
      this.ytarget = this.game.input.y;
      this.xdiff;
      this.ydiff;
      this.pageOffset = 330;
      this.sliderOriginX = 576;
      this.sliderOriginY = 100;

      // create the phone holder hand
      this.right = this.game.add.sprite(500, 34, "hand-right");

      this.enableUI();

      this.createSliders();

      // finally add the left hand on top of everything
      this.left = this.game.add.sprite(300, 200, "hand-left");

      // also adjust the anchor point of the left hand to
      // match the fingertip, so we can stick to the mouse
      this.left.anchor.set(0.68, 0.01);

      this.animateIn();
    }

    /**
     * Build the page in.
     */
    animateIn() {
      this.game.add.tween(this.left).from( { alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 1500);
      this.game.add.tween(this.right).from( { x: 1300, y:200 }, 1000, Phaser.Easing.Cubic.Out, true, 500);
    }

    /**
     * Create the phone interface visual elements
     */
    enableUI() {
      this.highlight = this.right.addChild(this.game.make.sprite(0, 0, "highlight"));
      this.buttons = this.right.addChild(this.game.make.sprite(79, 494, "buttons"));
      this.button1 = this.right.addChild(this.game.make.sprite(79, 493, "1-on"));
      this.button2 = this.right.addChild(this.game.make.sprite(150, 493, "2-on"));
      this.button3 = this.right.addChild(this.game.make.sprite(223, 493, "3-on"));
      this.button4 = this.right.addChild(this.game.make.sprite(294, 493, "4-on"));

      this.makeClickableButton(this.button1, "email");
      this.makeClickableButton(this.button2, "facebook");
      this.makeClickableButton(this.button3, "twitter");
      this.makeClickableButton(this.button4, "whatsapp");

      // make the first button active
      this.button1.alpha = 1;
      this.button2.alpha = 0;
      this.button3.alpha = 0;
      this.button4.alpha = 0;
      this.highlight.tint = 0xc4afbb;
    }

    makeClickableButton(target, buttonName) {
      target.inputEnabled = true;
      target.name = buttonName;
      target.events.onInputDown.add(this.switchToScreen, this);
      target.events.onInputUp.add(this.resetHand, this);
    }

    /**
     * Creates the holder structure for the sliding screen and messages.
     */
    createSliders() {
      this.slider = this.game.add.sprite(this.sliderOriginX, this.sliderOriginY);

      this.page1 = this.slider.addChild(this.game.make.sprite(0,0));
      this.page1.addChild(this.game.make.sprite(0, 0, 'bubble1'));

      this.page2 = this.slider.addChild(this.game.make.sprite(0,0));
      this.page2.addChild(this.game.make.sprite(this.pageOffset, 0, 'bubble2'));

      this.page3 = this.slider.addChild(this.game.make.sprite(0,0));
      this.page3.addChild(this.game.make.sprite(this.pageOffset * 2, 0, 'bubble3'));

      this.page4 = this.slider.addChild(this.game.make.sprite(0,0));
      this.page4.addChild(this.game.make.sprite(this.pageOffset * 3, 0, 'bubble4'));

      // Create the mask for the slider
      this.masker = this.game.add.graphics(574, 59);
      this.masker.beginFill(0x00FFFF);
      this.masker.drawRect(0, 0, 297, 548);
      this.slider.mask = this.masker;
    }

    /**
     * Switches to a particular screen when hitting a phone button.
     */
    switchToScreen(state) {
      // reset all the buttons
      this.button1.alpha = 0;
      this.button2.alpha = 0;
      this.button3.alpha = 0;
      this.button4.alpha = 0;

      // makes the hand look like it's pressing down.
      this.left.scale.set(0.9);

      // do the switch
      if(state.name == "email") {
        this.button1.alpha = 1;
        this.doStateTransition(0xc4afbb, this.sliderOriginX);
      }

      if(state.name == "facebook") {
        this.button2.alpha = 1;
        this.doStateTransition(0xffac71, this.sliderOriginX - this.pageOffset);
      }

      if(state.name == "twitter") {
        this.button3.alpha = 1;
        this.doStateTransition(0xc4d8bb, this.sliderOriginX - (this.pageOffset*2));
      }

      if(state.name == "whatsapp") {
        this.button4.alpha = 1;
        this.doStateTransition(0xffacc8, this.sliderOriginX - (this.pageOffset*3));
      }
    }

    /**
     * Changes the tint background, and slides to the correct position.
     */
    doStateTransition(newTint, pos) {
      this.tweenTint(this.highlight, this.highlight.tint, newTint, 500);
      this.game.add.tween(this.slider).to( { x: pos }, 500, Phaser.Easing.Cubic.Out, true);
    }

    tweenTint(obj, startColor, endColor, time) {
      var colorBlend = {step: 0};
      var colorTween = this.game.add.tween(colorBlend).to({step: 100}, time);

      colorTween.onUpdateCallback(function() {
        obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
      });

      obj.tint = startColor;
      colorTween.start();
    }

    /**
     * Restores the hand scale after it's touched the screen
     */
    resetHand() {
      this.left.scale.set(1);
    }

    /**
     * Tick!
     */
    update() {
      this.moveHand();
    }

    /**
     * Sticks the hand to the cursor, with a little easing and rotation.
     */
    moveHand() {
      // rotate the hand slightly based on the position
      this.left.angle = this.game.input.x / 40;

      // move the hand to the cursor, with a little easing
      this.xdiff = this.game.input.x - this.left.position.x;
      this.left.position.x += this.xdiff *= 0.2;

      this.ydiff = this.game.input.y - this.left.position.y;
      this.left.position.y += this.ydiff *= 0.2;
    }
}

export default GameState;
