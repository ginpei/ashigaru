import { Container } from "../../layout/Container";
import { NiceLink } from "../../nice/NiceLink";
import { homePagePath } from "../../../pages/home/homePageMeta";

export interface BasicHeaderProps {}

export function BasicHeader(): JSX.Element {
  return (
    <div
      className={`
      BasicHeader
      bg-ginpei
      [&_a]:text-white [&_a]:no-underline
      [&_a:is(:hover,:focus)]:text-white [&_a:is(:hover,:focus)]:underline
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
