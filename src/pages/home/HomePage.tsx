import Link from "next/link";
import { StraightLayout } from "../../layouts/straight/StraightLayout";
import { aboutPagePath } from "../about/aboutPageMeta";

export interface HomePageProps {
}

export function HomePage(): JSX.Element {
  return (
    <StraightLayout className="HomePage" title="Home">
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link href={aboutPagePath()}>About</Link>
        </li>
      </ul>
    </StraightLayout>
  );
}
