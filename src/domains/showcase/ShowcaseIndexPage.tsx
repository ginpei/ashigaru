import { NiceUL } from "../nice/NiceUL";
import { StraightLayout } from "../pageLayout/straight/StraightLayout";
import { showcaseList } from "./showcaseList";

export function ShowcaseIndexPage(): React.JSX.Element {
  const showcasePaths = Object.keys(showcaseList).sort((a, b) =>
    a.localeCompare(b),
  );

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
