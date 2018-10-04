import GameState from 'states/GameState';
import MenuState from 'states/MenuState';
import AboutState from 'states/AboutState';
import PreloadState from 'states/PreloadState';
import GameOverState from 'states/GameOverState';

class Game extends Phaser.Game {

	constructor() {
		super(1280, 720, Phaser.AUTO, '', null, true);

		this.state.add('PreloadState', PreloadState, false);
		this.state.add('MenuState', MenuState, false);
		this.state.add('AboutState', AboutState, false);
		this.state.add('GameState', GameState, false);
		this.state.add('GameOverState', GameOverState, false);

		this.state.start('PreloadState');
	}
}

new Game();
