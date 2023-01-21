import glob from "fast-glob";
import { GetServerSideProps } from "next";
import getConfig from "next/config";
import { useRouter } from "next/router";

const { serverRuntimeConfig } = getConfig();
const root = serverRuntimeConfig.PROJECT_ROOT;

const componentsDir = `${root}/src/domains`;
const extension = ".showcase.tsx";
const pattern = `${componentsDir}/**/*${extension}`;

interface ComponentDemo {
  name: string;
  url: string;
}

type ServerProps = IndexPageServerProps | DemoPageServerProps;

interface IndexPageServerProps {
  components: ComponentDemo[];
  type: "index";
}

interface DemoPageServerProps {
  slug: string[];
  type: "demo";
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const slug = context.params?.slug;

  if (slug === undefined) {
    const components = await getComponentDemos();
    return {
      props: {
        components,
        type: "index",
      },
    };
  }

  if (Array.isArray(slug)) {
    return {
      props: {
        slug,
        type: "demo",
      },
    };
  }

  throw new Error(`Unknown pattern`);
};

async function getComponentDemos() {
  const paths = await glob(pattern);
  const components: ComponentDemo[] = paths.map((filePath) => {
    const individualPath = filePath.slice(componentsDir.length + 1);

    const fileName = individualPath.match(/[^\/]+$/)?.[0] || "";
    const componentName = fileName.slice(0, -extension.length);

    const url = individualPath.slice(0, -extension.length);

    return {
      name: componentName,
      url,
    };
  });

  return components;
}

function Page(props: ServerProps): JSX.Element {
  if (props.type === "index") {
    return <IndexPage {...props} />;
  }

  if (props.type === "demo") {
    return <DemoPage {...props} />;
  }

  throw new Error(`Unknown pattern`);
}

function IndexPage({ components }: IndexPageServerProps): JSX.Element {
  return (
    <div>
      <h1>Components ({components.length})</h1>
      <ul className="m-4 ml-8 list-disc">
        {components.map(({ name, url }) => (
          <li key={url}>
            <a href={`./components/${url}`}>
              {name}
              <br />
              <small>{url}</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemoPage({ slug }: { slug: string[] }): JSX.Element {
  // TODO
  return (
    <div>
      Slug:
      {JSON.stringify(slug)}
    </div>
  );
}

export default Page;
