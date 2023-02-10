import { StraightLayout } from "../../domains/pageLayout/straight/StraightLayout";

export interface AboutPageProps {}

export function AboutPage(): JSX.Element {
  return (
    <StraightLayout className="AboutPage" title="About">
      <h1>AboutPage</h1>
    </StraightLayout>
  );
}
