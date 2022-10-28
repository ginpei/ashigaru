import { NiceLink } from "../../domains/atom/NiceLink";
import { Container } from "../../domains/layout/Container";
import { homePagePath } from "../../pages/home/homePageMeta";

export interface BasicHeaderProps {
}

export function BasicHeader(): JSX.Element {
  return (
    <div className="BasicHeader">
      <Container>
        <div className="inner">
          <NiceLink href={homePagePath()}>Home</NiceLink>
        </div>
      </Container>
    </div>
  );
}
