let musicVolume = 1;
let sfxVolume = 1;

class Settings {

  /* GENERAL CONFIG SETTINGS */
  static get DEBUG() { return false; }

  /* AUDIO GETTERS/SETTERS */
  static get MUSIC_VOLUME() { return musicVolume; };
  static set MUSIC_VOLUME(value) { musicVolume = value; };
  static get SFX_VOLUME() { return sfxVolume; };
  static set SFX_VOLUME(value) { sfxVolume = value; };

  /* SETTING SAVE AND LOAD */
  static loadSetting(setting) {
    if(window.localStorage.getItem(setting) == null)
        return "true"; // default settings to 'on'

    return window.localStorage.getItem(setting);
  }

  static saveSetting(setting, value) {
    window.localStorage.setItem(setting, value);
  }
}

export default Settings;
