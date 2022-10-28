import Link from "next/link";
import { Container } from "../../domains/layout/Container";
import { homePagePath } from "../../pages/home/homePageMeta";

export interface BasicHeaderProps {
}

export function BasicHeader(): JSX.Element {
  return (
    <div className="BasicHeader">
      <Container>
        <div className="inner">
          <Link href={homePagePath()}>Home</Link>
        </div>
      </Container>
    </div>
  );
}
