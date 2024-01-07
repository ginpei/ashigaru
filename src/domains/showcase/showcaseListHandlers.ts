import { showcaseList } from "./showcaseList";

export function getShowcaseComponent(
  path: keyof typeof showcaseList,
): () => JSX.Element;
export function getShowcaseComponent(path: string): (() => JSX.Element) | null {
  if (!isShowcaseListKey(path)) {
    return null;
  }

  return showcaseList[path];
}

export function isShowcaseListKey(
  path: string,
): path is keyof typeof showcaseList {
  return path in showcaseList;
}
