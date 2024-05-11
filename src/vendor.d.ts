import "obsidian";

declare module "obsidian" {
  interface View {
    tree: {
      focusedItem: {
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
}
