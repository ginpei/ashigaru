import { GetServerSidePropsContext } from "next";
import { StraightLayout } from "../../layouts/straight/StraightLayout";

export interface ShowcasePageProps {
  slug: string[];
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
    throw new Error(`Slug must be a string array`);
  }

  return {
    slug,
  };
}

export function ShowcasePage({ slug }: ShowcasePageProps): JSX.Element {
  return (
    <StraightLayout className="HomePage" title={slug.join("/")}>
      <h1>ShowcasePage</h1>
      <p>{slug.join("/")}</p>
    </StraightLayout>
  );
}
