import { showcaseList } from "./showcaseList";

export function getShowcaseComponent(
  path: keyof typeof showcaseList,
): () => React.JSX.Element;
export function getShowcaseComponent(
  path: string,
): (() => React.JSX.Element) | null {
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
