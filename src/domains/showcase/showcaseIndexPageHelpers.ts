import glob from "fast-glob";
import { GetServerSidePropsContext } from "next";
import getConfig from "next/config";
import { ComponentDemo, ShowcaseIndexPageProps } from "./ShowcaseIndexPage";

const { serverRuntimeConfig } = getConfig();
const root = serverRuntimeConfig.PROJECT_ROOT;

const componentsDir = `${root}/src/domains`;
const extension = ".showcase.tsx";
const pattern = `${componentsDir}/**/*${extension}`;

export function isShowcaseIndexPage(
  context: GetServerSidePropsContext
): boolean {
  const slug = context.params?.slug;
  return slug === undefined;
}

export async function getShowcaseIndexPageProps(): Promise<ShowcaseIndexPageProps> {
  const components = await getComponentDemos();
  return {
    components,
  };
}

/**
 * This function accesses file system, which means must run in
 * `getServerSideProps()`. Also importing this during client side rendering
 * causes an error to load `fs`.
 */
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
