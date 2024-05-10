import { Plugin } from "obsidian";

interface Settings {
  mySetting: string;
}

const DEFAULT_SETTINGS: Settings = {
  mySetting: "default",
};

export class FileTreeNavSettings extends Plugin {
  public settings: Settings;

  public async loadSettings(): Promise<void> {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
  }

  public async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }
}
