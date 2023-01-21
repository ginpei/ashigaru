import glob from "fast-glob";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const root = serverRuntimeConfig.PROJECT_ROOT;

const componentsDir = `${root}/src/domains`;
const extension = ".showcase.tsx";
const pattern = `${componentsDir}/**/*${extension}`;

interface ComponentDemo {
  name: string;
  url: string;
}

type Data = {
  components: ComponentDemo[];
};

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
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

  return {
    props: {
      components,
    },
  };
};

function Page({
  components,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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

export default Page;
