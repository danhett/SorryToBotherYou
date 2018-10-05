import Settings from 'core/Settings';

class SettingsState extends Phaser.State {

	create() {
		document.body.style.cursor = 'default';

		this.bg = this.add.sprite(0, 0, "settings-bg");
		this.back = this.add.sprite(680, 0, "back-button");
		this.back.alpha = 0;

		this.addControls();
		this.enableNavigation();
	}

	addControls() {
		// basically the button background
		this.musicOff = this.add.sprite(140, 160, "toggleOff");
		this.sfxOff = this.add.sprite(400, 160, "toggleOff");

		// actual toggle
		this.musicOn = this.add.sprite(140, 160, "toggleOn");
		this.sfxOn = this.add.sprite(400, 160, "toggleOn");

		this.musicOn.inputEnabled = true;
    	this.musicOn.events.onInputDown.add(this.toggleMusic, this);

		this.sfxOn.inputEnabled = true;
    	this.sfxOn.events.onInputDown.add(this.toggleSfx, this);

		// get default saved button state
		if(Settings.loadSetting("music") == "false") {
			this.musicOn.alpha = 0;
		}
		if(Settings.loadSetting("sfx") == "false") {
			this.sfxOn.alpha = 0;
		}
	}

	toggleMusic() {
		if(Settings.loadSetting("music") == "true") {
			Settings.saveSetting("music", "false");
			Settings.MUSIC_VOLUME = 0;
			this.musicOn.alpha = 0;
		}
		else {
			Settings.saveSetting("music", "true");
			Settings.MUSIC_VOLUME = 1;
			this.musicOn.alpha = 1;
		}
	}

	toggleSfx() {
		if(Settings.loadSetting("sfx") == "true") {
			Settings.saveSetting("sfx", "false");
			Settings.SFX_VOLUME = 0;
			this.sfxOn.alpha = 0;
		}
		else {
			Settings.saveSetting("sfx", "true");
			Settings.SFX_VOLUME = 1;
			this.sfxOn.alpha = 1;
		}
	}

	enableNavigation() {
		this.back.inputEnabled = true;
    this.back.events.onInputDown.add(this.openMenu, this);
	}

	openMenu() {
		this.state.start('MenuState');
	}
}

export default SettingsState;
