import { App, FileExplorer, TFolder, View } from "obsidian";
import { de } from "./utils/utils";
import { isFileItemFile } from "./utils/types";

export function collapseAllFolders(app: App) {
  const fileExplorer = app.workspace.activeLeaf?.view as View;

  fileExplorer.tree.isAllCollapsed = false;
  fileExplorer.tree.setCollapseAll(true);
}

export function showContextMenu(app: App) {
  const fileExplorer = app.workspace.activeLeaf?.view as View;
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
}

export function onKeyArrowDown(app: App, event: KeyboardEvent) {
  const fileExplorer = app.workspace.activeLeaf?.view as View;
  const isContextMenuOpened = document.querySelector(".menu") != null;

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
}

export function onKeyArrowUp(app: App, event: KeyboardEvent) {
  const fileExplorer = app.workspace.activeLeaf?.view as View;
  const isContextMenuOpened = document.querySelector(".menu") != null;

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
}

export function splitRight(app: App) {
  const fileExplorer = app.workspace.activeLeaf?.view as View;
  const selectedFile = fileExplorer.tree.focusedItem.file;

  if (selectedFile) {
    const newLeaf = this.app.workspace.splitActiveLeaf();
    newLeaf.openFile(selectedFile);
  }
}

export function createNewItem(app: App, type: "file" | "folder") {
  const fileExplorer = app.workspace.activeLeaf?.view as FileExplorer;
  const selectedItem = fileExplorer.tree.focusedItem.file as any;
  let folder: TFolder | null = selectedItem;

  if (isFileItemFile(selectedItem)) {
    folder = selectedItem.parent;
  }

  fileExplorer.createAbstractFile(type, folder, false);
}

export async function cloneFile(app: App) {
  const fileExplorer = app.workspace.activeLeaf?.view as FileExplorer;
  const { file } = fileExplorer.tree.focusedItem;

  if (file != null && isFileItemFile(file)) {
    const destPath = this.app.vault.getAvailablePath(de(file.path), file.extension);
    await app.vault.copy(file, destPath);
  }
}
