import { TFile, TFolder } from "obsidian";

declare module "obsidian" {
  interface View {
    tree: {
      focusedItem: {
        file: TFile | TFolder | null;
        el: HTMLElement;
      };
      isAllCollapsed: boolean;
      onKeyArrowDown(event: KeyboardEvent): unknown;
      onKeyArrowUp(j: KeyboardEvent): void;
      onKeyArrowLeft(event: KeyboardEvent): void;
      onKeyArrowRight(event: KeyboardEvent): void;
      setCollapseAll(b: boolean): void;
    };
  }

  interface FileExplorer extends View {
    createAbstractFile(file: string, selectedFile: null | TFolder, b: boolean): any;
  }
}
