import { GetServerSidePropsContext } from "next";
import { StraightLayout } from "../../layouts/straight/StraightLayout";
import { showcaseList } from "./showcaseList";

export interface ShowcaseIndexPageProps {}

/**
 * TODO rename
 */
export interface ComponentDemo {
  name: string;
  url: string;
}

export function ShowcaseIndexPage(): JSX.Element {
  const showcasePaths = Object.keys(showcaseList);

  return (
    <StraightLayout className="ShowcaseIndexPage" title="Components">
      <h1>Components ({showcasePaths.length})</h1>
      <ul className="m-4 ml-8 list-disc">
        {showcasePaths.map((path) => (
          <li key={path}>
            <a href={`./components/${path}`}>{path}</a>
          </li>
        ))}
      </ul>
    </StraightLayout>
  );
}

export function isShowcaseIndexPage(
  context: GetServerSidePropsContext
): boolean {
  const slug = context.params?.slug;
  return slug === undefined;
}
