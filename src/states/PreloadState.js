import Settings from 'core/Settings';
class PreloadState extends Phaser.State {

	init() {
		document.body.style.cursor = 'default';

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

		this.scale.setMinMax(512, 288, 1280, 720);
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
		this.loaderFill = this.game.add.graphics(382,356);
    	this.loaderFill.beginFill(0xFFFFFF);
		this.loaderFill.drawRect(0, 0, 560, 10);
		this.loaderFill.scale.x = 0;
	}

	/**
	 * Actually load the items in.
	 */
	preload() {
		this.load.json('message-data', 'data/messages.json');

		this.game.load.image('game-background', 'assets/bg.jpg');

		this.game.load.image('floater1', 'assets/floater1.png');
		this.game.load.image('floater2', 'assets/floater2.png');
		this.game.load.image('floater3', 'assets/floater3.png');
		this.game.load.image('floater4', 'assets/floater4.png');

		this.game.load.image('menu-about', 'assets/menu-about.png');
		this.game.load.image('menu-start', 'assets/menu-start.png');
		this.game.load.image('menu-subtitle', 'assets/menu-subtitle.png');
		this.game.load.image('menu-title1', 'assets/menu-title1.png');
		this.game.load.image('menu-title2', 'assets/menu-title2.png');

		this.game.load.image('hand-left', 'assets/hand-left.png');
		this.game.load.image('hand-right', 'assets/hand-right.png');

		this.game.load.image('highlight', 'assets/highlight.png');
		this.game.load.image('buttons', 'assets/buttons.png');
		this.game.load.image('1-on', 'assets/1-on.png');
		this.game.load.image('2-on', 'assets/2-on.png');
		this.game.load.image('3-on', 'assets/3-on.png');
		this.game.load.image('4-on', 'assets/4-on.png');

		this.game.load.image('notification', 'assets/notification.png');

		this.game.load.image('bubble1', 'assets/bubble1.png');
		this.game.load.image('bubble2', 'assets/bubble2.png');
		this.game.load.image('bubble3', 'assets/bubble3.png');
		this.game.load.image('bubble4', 'assets/bubble4.png');

		this.game.load.image('btn-keep', 'assets/btn-keep.png');
		this.game.load.image('btn-delete', 'assets/btn-delete.png');

		this.game.load.image('masker', 'assets/mask.png');
		this.game.load.image('hitzone', 'assets/hitzone.png');
		
		this.game.load.audio('music', ['assets/audio/music.mp3']);
		this.game.load.audio('intromusic', ['assets/audio/intro.mp3']);
		this.game.load.audio('click', ['assets/audio/click.mp3']);
		this.game.load.audio('ping1', ['assets/audio/ping1.mp3']);
		this.game.load.audio('ping2', ['assets/audio/ping2.mp3']);
		this.game.load.audio('ping3', ['assets/audio/ping3.mp3']);
		this.game.load.audio('ping4', ['assets/audio/ping4.mp3']);

		this.game.load.image('about-screen', 'assets/about.png');
		this.game.load.image('gameover-screen', 'assets/gameover.png');

	}

  	loadUpdate() {
		this.loaderFill.scale.x = this.game.load.progress / 100;
  	}

	// Loading complete! Go to the menu.
  	create() {
    	this.state.start('MenuState');
	}
}

export default PreloadState;
