import { homePagePath } from "../../../pages/home/homePageMeta";
import { Container } from "../../layout/Container";
import { NiceLink } from "../../nice/NiceLink";

export interface BasicHeaderProps {}

export function BasicHeader(): React.JSX.Element {
  return (
    <div
      className={`
      BasicHeader
      bg-ginpei
      [&_a:is(:hover,:focus)]:text-white [&_a:is(:hover,:focus)]:underline
      [&_a]:text-white [&_a]:no-underline
    `}
    >
      <Container>
        <div>
          <NiceLink href={homePagePath()}>Home</NiceLink>
        </div>
      </Container>
    </div>
  );
}
