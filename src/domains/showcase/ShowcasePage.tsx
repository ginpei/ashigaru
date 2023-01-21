import { GetServerSidePropsContext } from "next";
import { getShowcaseComponent } from "./showcaseListHandlers";

export interface ShowcasePageProps {
  path: string;
}

export function isShowcasePage(context: GetServerSidePropsContext): boolean {
  const slug = context.params?.slug;
  return Array.isArray(slug);
}

export async function getShowcasePageProps(
  context: GetServerSidePropsContext
): Promise<ShowcasePageProps> {
  const slug = context.params?.slug;
  if (!Array.isArray(slug)) {
    throw new Error("Slug must be a string array");
  }

  return {
    path: slug.join("/"),
  };
}

export function ShowcasePage({ path }: ShowcasePageProps): JSX.Element {
  const Component = getShowcaseComponent(path);
  if (!Component) {
    return <div>Not found: {path}</div>;
  }

  return <Component />;
}
