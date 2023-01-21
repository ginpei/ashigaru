import { StraightLayout } from "../../layouts/straight/StraightLayout";

export interface ShowcaseIndexPageProps {
  components: ComponentDemo[];
}

/**
 * TODO rename
 */
export interface ComponentDemo {
  name: string;
  url: string;
}

export function ShowcaseIndexPage({
  components,
}: ShowcaseIndexPageProps): JSX.Element {
  return (
    <StraightLayout className="ShowcaseIndexPage" title="Components">
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
    </StraightLayout>
  );
}
