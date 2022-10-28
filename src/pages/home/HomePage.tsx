import { NiceLink } from "../../domains/atom/NiceLink";
import { StraightLayout } from "../../layouts/straight/StraightLayout";
import { aboutPagePath } from "../about/aboutPageMeta";
import { editorPagePath } from "../editor/editorPageMeta";

export interface HomePageProps {
}

export function HomePage(): JSX.Element {
  return (
    <StraightLayout className="HomePage" title="Home">
      <h1>HomePage</h1>
      <ul>
        <li>
          <NiceLink href={editorPagePath()}>Editor</NiceLink>
        </li>
        <li>
          <NiceLink href={aboutPagePath()}>About</NiceLink>
        </li>
      </ul>
    </StraightLayout>
  );
}
