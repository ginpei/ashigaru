import { NiceLink } from "../../domains/nice/NiceLink";
import { StraightLayout } from "../../layouts/straight/StraightLayout";
import { aboutPagePath } from "../about/aboutPageMeta";
import { editorPagePath } from "../editor/editorPageMeta";

export interface HomePageProps {}

export function HomePage(): JSX.Element {
  return (
    <StraightLayout className="HomePage" title="Home">
      <h1>HomePage</h1>
      <ul className="m-4 ml-8 list-disc">
        <li>
          <NiceLink href={editorPagePath()}>Editor</NiceLink>
        </li>
        <li>
          <NiceLink href={aboutPagePath()}>About</NiceLink>
        </li>
      </ul>
      <p>Dev:</p>
      <ul className="m-4 ml-8 list-disc">
        <li>
          <NiceLink href="/_dev/components">Components</NiceLink>
        </li>
      </ul>
    </StraightLayout>
  );
}
