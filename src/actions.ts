import { App, FileExplorer, TFolder, View } from "obsidian";

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
  const isFileSelected = selectedItem?.extension != null;
  let folder: TFolder | null = selectedItem;

  if (isFileSelected) {
    folder = selectedItem!.parent;
  }

  fileExplorer.createAbstractFile(type, folder, false);
}
