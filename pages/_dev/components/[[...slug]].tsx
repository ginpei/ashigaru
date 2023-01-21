import { GetServerSideProps } from "next";
import {
  isShowcaseIndexPage,
  ShowcaseIndexPage,
  ShowcaseIndexPageProps,
} from "../../../src/domains/showcase/ShowcaseIndexPage";
import {
  getShowcasePageProps,
  isShowcasePage,
  ShowcasePage,
  ShowcasePageProps,
} from "../../../src/domains/showcase/ShowcasePage";

type ServerProps = IndexPageServerProps | DemoPageServerProps;

interface IndexPageServerProps extends ShowcaseIndexPageProps {
  type: "index";
}

interface DemoPageServerProps extends ShowcasePageProps {
  type: "demo";
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  if (isShowcaseIndexPage(context)) {
    return {
      props: {
        type: "index",
      },
    };
  }

  if (isShowcasePage(context)) {
    return {
      props: {
        ...(await getShowcasePageProps(context)),
        type: "demo",
      },
    };
  }

  throw new Error(`Unknown pattern`);
};

function Page(props: ServerProps): JSX.Element {
  if (props.type === "index") {
    return <ShowcaseIndexPage />;
  }

  if (props.type === "demo") {
    return <ShowcasePage {...props} />;
  }

  throw new Error(`Unknown pattern`);
}

export default Page;
