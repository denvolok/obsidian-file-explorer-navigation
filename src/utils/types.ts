import { TFile, TFolder } from "obsidian";

export function isFileItemFile(item: TFile | TFolder): item is TFile {
  return (item as TFile).extension != null;
}
