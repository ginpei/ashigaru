import { Container } from "../../domains/layout/Container";
import { NiceLink } from "../../domains/nice/NiceLink";
import { homePagePath } from "../../pages/home/homePageMeta";

export interface BasicHeaderProps {}

export function BasicHeader(): JSX.Element {
  return (
    <div
      className={`
      BasicHeader
      bg-ginpei
      [&_a]:text-white [&_a]:no-underline
      [&_a:hover]:text-white [&_a:hover]:underline
    `}
    >
      <Container>
        <div className="inner">
          <NiceLink href={homePagePath()}>Home</NiceLink>
        </div>
      </Container>
    </div>
  );
}
