import { StraightLayout } from "../pageLayout/straight/StraightLayout";
import { NiceUL } from "../nice/NiceUL";
import { showcaseList } from "./showcaseList";

export function ShowcaseIndexPage(): JSX.Element {
  const showcasePaths = Object.keys(showcaseList);

  return (
    <StraightLayout className="ShowcaseIndexPage" title="Components">
      <h1>Components ({showcasePaths.length})</h1>
      <NiceUL>
        {showcasePaths.map((path) => (
          <li key={path}>
            <a href={`./components/${path}`}>{path}</a>
          </li>
        ))}
      </NiceUL>
    </StraightLayout>
  );
}
