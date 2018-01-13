import Settings from 'core/Settings';
class PreloadState extends Phaser.State {

	init() {
		console.log("preloader");

		this.handleScaling();
		this.checkSettings();
		this.drawPreloader();
	}

	/**
	 * Resizes the stage if we're on mobile
	 */
	handleScaling() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
	}

	handleIncorrect() {
		document.getElementById("turn").style.display="block";
	}

	handleCorrect() {
		document.getElementById("turn").style.display="none";
	}

	/**
	 * Pulls in any previously saved settings.
	 */
	checkSettings() {
		if(Settings.loadSetting("music") == "false") {
			Settings.MUSIC_VOLUME = 0;
		}

		if(Settings.loadSetting("sfx") == "false") {
			Settings.SFX_VOLUME = 0;
		}
	}

	/**
	 * Draws the preload bar
	 */
	drawPreloader() {
		/*
		this.loaderBase = this.game.add.graphics(100,185);
    this.loaderBase.beginFill(0x5b2033);
		this.loaderBase.drawRect(0, 0, 600, 30);

		this.loaderFill = this.game.add.graphics(110,195);
    this.loaderFill.beginFill(0xFFFFFF);
		this.loaderFill.drawRect(0, 0, 580, 10);
		this.loaderFill.scale.x = 0;
		*/
	}

	/**
	 * Actually load the items in.
	 */
	preload() {
		this.game.load.image('game-background', 'assets/bg.jpg');

		this.game.load.image('menu-about', 'assets/menu-about.png');
		this.game.load.image('menu-start', 'assets/menu-start.png');
		this.game.load.image('menu-subtitle', 'assets/menu-subtitle.png');
		this.game.load.image('menu-title', 'assets/menu-title.png');

		this.game.load.image('hand-left', 'assets/hand-left.png');
		this.game.load.image('hand-right', 'assets/hand-right.png');

		this.game.load.image('highlight', 'assets/highlight.png');
		this.game.load.image('buttons', 'assets/buttons.png');
		this.game.load.image('1-on', 'assets/1-on.png');
		this.game.load.image('2-on', 'assets/2-on.png');
		this.game.load.image('3-on', 'assets/3-on.png');
		this.game.load.image('4-on', 'assets/4-on.png');


	}

  loadUpdate() {
		//this.loaderFill.scale.x = this.game.load.progress / 100;
  }

	// Loading complete! Go to the menu.
  create() {
		console.log("loading complete");

    this.state.start('MenuState');
	}
}

export default PreloadState;
