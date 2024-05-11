import { View } from "obsidian";
// eslint-disable-next-line import/no-cycle
import { SampleSettingTab } from "./settings/SampleSettingTab";
import { FileTreeNavSettings } from "./settings/FileTreeNavSettings";

export default class FileTreeNav extends FileTreeNavSettings {
  async onload() {
    await this.loadSettings();

    this.addSettingTab(new SampleSettingTab(this));
    this.registerDomEvent(document, "keydown", this.handleKeyPressOnDocument);
  }

  onunload() {}

  handleKeyPressOnDocument = (event: KeyboardEvent) => {
    // TODO: not sure about this selector. Perhaps can affect custom views
    const isFileExplorerFocused =
      this.app.workspace.activeLeaf?.view.getViewType() === "file-explorer";

    if (isFileExplorerFocused) {
      const isInputFocused =
        document.activeElement?.classList.contains("is-being-renamed") ||
        document.activeElement?.tagName === "INPUT";

      if (!isInputFocused) {
        event.stopImmediatePropagation();
        this.handleKeyPressOnFileExplorer(event);
      }
    }
  };

  handleKeyPressOnFileExplorer = (event: KeyboardEvent): void => {
    const fileExplorer = this.app.workspace.activeLeaf?.view as View;
    const isContextMenuOpened = document.querySelector(".menu") != null;

    if (!event.shiftKey) {
      switch (event.code) {
        case "KeyJ": {
          if (isContextMenuOpened) {
            const ev = new KeyboardEvent("keydown", {
              key: "ArrowDown",
              bubbles: true,
              cancelable: true,
            });
            document.dispatchEvent(ev);
          } else {
            fileExplorer.tree.onKeyArrowDown(event);
          }
          break;
        }
        case "KeyK": {
          if (isContextMenuOpened) {
            const ev = new KeyboardEvent("keydown", {
              key: "ArrowUp",
              bubbles: true,
              cancelable: true,
            });
            document.dispatchEvent(ev);
          } else {
            fileExplorer.tree.onKeyArrowUp(event);
          }
          break;
        }
        case "KeyH": {
          fileExplorer.tree.onKeyArrowLeft(event);
          break;
        }
        case "KeyL": {
          fileExplorer.tree.onKeyArrowRight(event);
          break;
        }
        default:
      }
    } else {
      switch (event.code) {
        case "KeyZ": {
          fileExplorer.tree.isAllCollapsed = false;
          fileExplorer.tree.setCollapseAll(true);
          break;
        }
        case "KeyK": {
          const focusedElement = fileExplorer.tree.focusedItem.el.querySelector(
            ".nav-folder-title, .nav-file-title",
          ) as HTMLElement;
          const contextmenuEvent = new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: focusedElement.getBoundingClientRect().left,
            clientY: focusedElement.getBoundingClientRect().top,
          });

          focusedElement.dispatchEvent(contextmenuEvent);

          break;
        }
        default:
      }
    }
  };
}
