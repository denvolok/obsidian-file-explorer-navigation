import { PluginSettingTab, Setting } from "obsidian";
// eslint-disable-next-line import/no-cycle
import FileTreeNav from "../main";

export class SampleSettingTab extends PluginSettingTab {
  private plugin: FileTreeNav;

  constructor(plugin: FileTreeNav) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }

  public display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
