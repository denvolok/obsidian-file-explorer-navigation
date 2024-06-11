import { FileExplorer } from "obsidian";
// eslint-disable-next-line import/no-cycle
import { SampleSettingTab } from "./settings/SampleSettingTab";
import { FileTreeNavSettings } from "./settings/FileTreeNavSettings";
import {
  collapseAllFolders,
  cloneFile,
  createNewItem,
  onKeyArrowDown,
  onKeyArrowUp,
  showContextMenu,
  splitRight,
} from "./actions";

export default class FileTreeNav extends FileTreeNavSettings {
  async onload() {
    await this.loadSettings();

    this.addSettingTab(new SampleSettingTab(this));
    this.registerDomEvent(document, "keydown", this.handleKeyPressOnDocument);
  }

  onunload() {}

  handleKeyPressOnDocument = (event: KeyboardEvent) => {
    if (this.isShouldHandleKeyPress()) {
      event.stopImmediatePropagation();
      this.handleKeyPressOnFileExplorer(event);
    }
  };

  isShouldHandleKeyPress = (): boolean => {
    // TODO: not sure about this selector. Perhaps can affect custom views
    const isFileExplorerFocused =
      this.app.workspace.activeLeaf?.view.getViewType() === "file-explorer";

    if (!isFileExplorerFocused) {
      return false;
    }

    const isPopupOpen = !!document.querySelector(".modal");
    const isInputFocused =
      document.activeElement?.classList.contains("is-being-renamed") ||
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.getAttribute("contenteditable") === "true";

    return !isInputFocused && !isPopupOpen;
  };

  handleKeyPressOnFileExplorer = (event: KeyboardEvent): void => {
    const fileExplorer = this.app.workspace.activeLeaf?.view as FileExplorer;

    if (event.shiftKey) {
      switch (event.code) {
        case "KeyZ": {
          collapseAllFolders(this.app);
          break;
        }
        default:
      }

      return;
    }

    if (event.altKey) {
      switch (event.code) {
        case "KeyK": {
          showContextMenu(this.app);
          break;
        }
        default:
      }
      return;
    }

    switch (event.code) {
      case "ContextMenu": {
        event.preventDefault();
        showContextMenu(this.app);
        break;
      }
      case "KeyJ": {
        onKeyArrowDown(this.app, event);
        break;
      }
      case "KeyK": {
        onKeyArrowUp(this.app, event);
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
      case "KeyS": {
        splitRight(this.app);
        break;
      }
      case "KeyN": {
        createNewItem(this.app, "file");
        break;
      }
      case "KeyF": {
        createNewItem(this.app, "folder");
        break;
      }
      case "KeyC": {
        cloneFile(this.app);
        break;
      }
      default:
    }
  };
}
