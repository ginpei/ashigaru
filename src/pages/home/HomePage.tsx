import { StraightLayout } from "../../layouts/straight/StraightLayout";

export interface HomePageProps {
}

export function HomePage(): JSX.Element {
  return (
    <StraightLayout className="HomePage">
      <h1>HomePage</h1>
    </StraightLayout>
  );
}
