import GameState from 'states/GameState';
import MenuState from 'states/MenuState';
import PreloadState from 'states/PreloadState';
import GameOverState from 'states/GameOverState';

import Settings from 'core/Settings';

class Game extends Phaser.Game {

	constructor() {
		document.body.style.cursor = 'none'; // doesn't work in chrome?

		super(1280, 720, Phaser.AUTO, '');

		this.state.add('PreloadState', PreloadState, false);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		this.state.add('GameOverState', GameOverState, false);

		this.state.start('PreloadState');
	}
}

new Game();
