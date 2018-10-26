import Settings from 'core/Settings';
import Maths from 'core/Maths';

class GameState extends Phaser.State {

    create() {
      document.body.style.cursor = 'none';

      this.game.sound.stopAll();
      this.music = this.game.sound.play("music");

      this.bg = this.game.add.sprite(0, 0, "game-background");

      this.xtarget = this.game.input.x;
      this.ytarget = this.game.input.y;
      this.xdiff;
      this.ydiff;
      this.pageOffset = 330;
      this.sliderOriginX = 576;
      this.sliderOriginY = 70;

      this.offset1 = 0;
      this.offset2 = 0;
      this.offset3 = 0;
      this.offset4 = 0;

      this.msg;
      this.mode;
      this.text;
      this.page;
      this.selectedPage = 1;
      this.totalMessages = 0;

      this.messageTime = 4;
      this.fastestMessageRate = 1.2;
      this.messageRateIncrease = 0.3;
      this.messageTickPoint = 10;

      this.journoChance = 0.5; 

      this.totalBlockHeight = 150;

      this.loadData();

      // create the phone holder hand (before UI to avoid tangles)
      this.right = this.game.add.sprite(500, 34, "hand-right");

      this.enableUI();

      // create the content holders for messages to go into
      this.createSliders();

      // create the live notification dots for each message stack
      this.createNotifications();

      // finally add the left hand on top of everything
      this.left = this.game.add.sprite(300, 200, "hand-left");

      // also adjust the anchor point of the left hand to
      // match the fingertip, so we can stick to the mouse
      this.left.anchor.set(0.68, 0.01);

      // build the page, and kick everything off
      this.animateIn();
      this.game.time.events.add(Phaser.Timer.SECOND * 2, this.beginGame, this);
    }

    loadData() {
      var config = this.game.cache.getJSON('message-data');
      this.normalMessages = config.normal;
      this.journoMessages = config.journo;
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

      // this is just a blank holder to contain each message stack.
      this.page1 = this.slider.addChild(this.game.make.sprite(0,0));
      this.page2 = this.slider.addChild(this.game.make.sprite(this.pageOffset,0));
      this.page3 = this.slider.addChild(this.game.make.sprite(this.pageOffset * 2,0));
      this.page4 = this.slider.addChild(this.game.make.sprite(this.pageOffset * 3,0));

      // Create the mask for the slider
      this.masker = this.game.add.graphics(574, 59);
      this.masker.beginFill(0x00FFFF);
      this.masker.drawRect(0, 0, 297, 548);
      this.slider.mask = this.masker;
    }

    createNotifications() {
      this.notify1 = this.right.addChild(this.game.make.sprite(120, 485, "notification"));
      this.notify2 = this.right.addChild(this.game.make.sprite(192, 485, "notification"));
      this.notify3 = this.right.addChild(this.game.make.sprite(264, 485, "notification"));
      this.notify4 = this.right.addChild(this.game.make.sprite(336, 485, "notification"));

      this.notify1.alpha = 0;
      this.notify2.alpha = 0;
      this.notify3.alpha = 0;
      this.notify4.alpha = 0;
    }

    /**
     * Switches to a particular screen when hitting a phone button.
     */
    switchToScreen(state) {
      this.game.sound.play("click");

      // reset all the buttons
      this.button1.alpha = 0;
      this.button2.alpha = 0;
      this.button3.alpha = 0;
      this.button4.alpha = 0;

      // makes the hand look like it's pressing down.
      this.left.scale.set(0.9);

      // do the switch
      if(state.name == "email") {
        this.selectedPage = 1;
        this.button1.alpha = 1;
        this.doStateTransition(0xc4afbb, this.sliderOriginX);
        this.notify1.alpha = 0;
      }

      if(state.name == "facebook") {
        this.selectedPage = 2;
        this.button2.alpha = 1;
        this.doStateTransition(0xffac71, this.sliderOriginX - this.pageOffset);
        this.notify2.alpha = 0;
      }

      if(state.name == "twitter") {
        this.selectedPage = 3;
        this.button3.alpha = 1;
        this.doStateTransition(0xc4d8bb, this.sliderOriginX - (this.pageOffset*2));
        this.notify3.alpha = 0;
      }

      if(state.name == "whatsapp") {
        this.selectedPage = 4;
        this.button4.alpha = 1;
        this.doStateTransition(0xffacc8, this.sliderOriginX - (this.pageOffset*3));
        this.notify4.alpha = 0;
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

    beginGame() {
      this.spawnMessage();
    }

    /**
     * Spawns a new message. Recursively calls itself.
     */
    spawnMessage() {
      this.checkMessageRate();

      this.createMessageBlock();

      this.game.time.events.add(Phaser.Timer.SECOND * this.messageTime, this.spawnMessage, this);
    }

    /**
     * Increases the rate messages appear
     */
    checkMessageRate() {
      if(this.totalMessages % this.messageTickPoint == 0) {
        if(this.messageTime > this.fastestMessageRate) {
          this.messageTime -= this.messageRateIncrease;
          console.log("reducing to " + this.messageTime)
        }
      }
    }

    // TODO - don't make these vars every time, optimise obviously
    createMessageBlock() {
      this.totalMessages++;

      // force the first two messages onto the visible screen, then randomise
      if(this.totalMessages > 2)
        this.page = this.getRandomInt(1,4);
      else
        this.page = 1;

      if(Math.random() > this.journoChance) { 
        this.mode = "friend";
      }
      else {
        this.mode = "journo";
      }
      
      if(this.page == 1) {
        this.game.sound.play("ping1");

        this.msg = this.page1.addChild(this.game.make.sprite(0, this.offset1, 'bubble1'));
        
        if(this.selectedPage != 1)
          this.notify1.alpha = 1;
      }
      if(this.page == 2) {
        this.game.sound.play("ping2");

        this.msg = this.page2.addChild(this.game.make.sprite(0, this.offset2, 'bubble2'));
        
        if(this.selectedPage != 2)
          this.notify2.alpha = 1;
      }
      if(this.page == 3) {
        this.game.sound.play("ping3");

        this.msg = this.page3.addChild(this.game.make.sprite(0, this.offset3, 'bubble3'));
        
        if(this.selectedPage != 3)
          this.notify3.alpha = 1;
      }
      if(this.page == 4) {
        this.game.sound.play("ping4");

        this.msg = this.page4.addChild(this.game.make.sprite(0, this.offset4, 'bubble4'));
        
        if(this.selectedPage != 4)
          this.notify4.alpha = 1;
      }

      this.game.add.tween(this.msg).from( { alpha:0 }, 200, "Linear", true);

      this.msg.currentPage = this.page;
      this.enableInteraction(this.msg);

      var style = { font: "14px Arial", fill: "#000000", align: "left", wordWrap:true, wordWrapWidth:240 };
      
      if(this.mode == "friend") {
        this.text = this.msg.addChild(this.game.add.text(20, 20, this.getFriendText(), style));
        this.msg.currentType = this.mode;
      }
      else {
        this.text = this.msg.addChild(this.game.add.text(20, 20, this.getJournoText(), style));
        this.msg.currentType = this.mode;
      }

      if(this.page == 1) {
        this.offset1 += this.totalBlockHeight;

        if(this.offset1 > (this.totalBlockHeight * 3))
          this.triggerGameOver();
      }
      if(this.page == 2) {
        this.offset2 += this.totalBlockHeight;
      }
      if(this.page == 3) {
        this.offset3 += this.totalBlockHeight;
      }
      if(this.page == 4) {
        this.offset4 += this.totalBlockHeight;
      }
    }

    // now the message exists, turn on the buttons
    enableInteraction(msg) {
      var keep = msg.addChild(this.game.make.sprite(190, 98, 'btn-keep'));
      var kill = msg.addChild(this.game.make.sprite(240, 98, 'btn-delete'));

      keep.scale.x = keep.scale.y = 0.8;
      kill.scale.x = kill.scale.y = 0.8;

      keep.inputEnabled = true;
      keep.events.onInputDown.add(this.acceptMessage, this);

      kill.inputEnabled = true;
      kill.events.onInputDown.add(this.killMessage, this);
    }

    acceptMessage(msg) {
      this.handleMessageClick(msg, "accept");
    }

    killMessage(msg) {
      this.handleMessageClick(msg, "delete");
    }

    handleMessageClick(msg, clicked) {
      this.game.sound.play("click");

      this.left.scale.set(0.9);
      this.game.time.events.add(Phaser.Timer.SECOND * 0.15, this.resetHand, this);

      if((msg.parent.currentType === "friend" && clicked === "accept") || 
         (msg.parent.currentType === "journo" && clicked === "delete")) {
        
        if(msg.parent.currentPage == 1) {
          this.offset1 -= this.totalBlockHeight;
          this.shuffleUp(this.page1.children, msg, this.game, this.totalBlockHeight);
        }
        if(msg.parent.currentPage == 2) {
          this.offset2 -= this.totalBlockHeight;
          this.shuffleUp(this.page2.children, msg, this.game, this.totalBlockHeight);
        }
        if(msg.parent.currentPage == 3) {
          this.offset3 -= this.totalBlockHeight;
          this.shuffleUp(this.page3.children, msg, this.game, this.totalBlockHeight);
        }
        if(msg.parent.currentPage == 4) {
          this.offset4 -= this.totalBlockHeight;
          this.shuffleUp(this.page4.children, msg, this.game, this.totalBlockHeight);
        }

        msg.parent.destroy();
      }
      else {
        this.triggerGameOver();
      }
    }

    /**
     * Move everything up when the message is deleted
     */
    shuffleUp(items, msg, game, height) {
      items.forEach(function(item) {
        if(item.y > msg.parent.y) 
          game.add.tween(item).to( { y: item.y - height }, 200, "Linear", true);
      });
    }

    triggerGameOver() {
      this.state.start('GameOverState');
    }

    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * GENERATE TEXT MESSAGES (friend + journo)
     */
    getFriendText() {
      return Phaser.ArrayUtils.getRandomItem(this.normalMessages);
    }
    getJournoText() {
      return Phaser.ArrayUtils.getRandomItem(this.journoMessages);
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
