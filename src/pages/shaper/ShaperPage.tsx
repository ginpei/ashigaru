import { StraightLayout } from "../../domains/pageLayout/straight/StraightLayout";

export interface ShaperPageProps {}

export function ShaperPage(): JSX.Element {
  return (
    <StraightLayout className="ShaperPage" title="Home">
      <h1>ShaperPage</h1>
    </StraightLayout>
  );
}
