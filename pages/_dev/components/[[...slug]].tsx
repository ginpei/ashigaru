import { GetStaticPaths, GetStaticProps } from "next";
import { ShowcaseIndexPage } from "../../../src/domains/showcase/ShowcaseIndexPage";
import { showcaseList } from "../../../src/domains/showcase/showcaseList";
import {
  getShowcaseComponent,
  isShowcaseListKey,
} from "../../../src/domains/showcase/showcaseListHandlers";

interface ServerProps {
  showcaseId: keyof typeof showcaseList | "";
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: { slug: [] },
      },
      ...Object.keys(showcaseList).map((v) => ({
        params: { slug: v.split("/") },
      })),
    ],
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps<ServerProps> = async (context) => {
  const slug = context.params?.slug;
  const showcaseId = Array.isArray(slug) ? slug.join("/") : undefined;

  if (showcaseId !== undefined && !isShowcaseListKey(showcaseId)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      showcaseId: showcaseId ?? "",
    },
  };
};

function Page({ showcaseId }: ServerProps): JSX.Element {
  if (showcaseId === "") {
    return <ShowcaseIndexPage />;
  }

  const Component = getShowcaseComponent(showcaseId);
  return <Component />;
}

export default Page;
