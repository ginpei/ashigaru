import { NiceLink } from "../../domains/nice/NiceLink";
import { NiceUL } from "../../domains/nice/NiceUL";
import { StraightLayout } from "../../domains/pageLayout/straight/StraightLayout";
import { aboutPagePath } from "../about/aboutPageMeta";
import { editorPagePath } from "../editor/editorPageMeta";
import { shaperPagePath } from "../shaper/shaperPageMeta";

export interface HomePageProps {}

export function HomePage(): JSX.Element {
  return (
    <StraightLayout className="HomePage" title="Home">
      <h1>HomePage</h1>
      <NiceUL>
        <li>
          <NiceLink href={editorPagePath()}>Editor</NiceLink>
        </li>
        <li>
          <NiceLink href={shaperPagePath()}>Shaper</NiceLink>
        </li>
        <li>
          <NiceLink href={aboutPagePath()}>About</NiceLink>
        </li>
      </NiceUL>
      <p>Dev:</p>
      <NiceUL>
        <li>
          <NiceLink href="/_dev/components">Components</NiceLink>
        </li>
      </NiceUL>
    </StraightLayout>
  );
}
