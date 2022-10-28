import { Container } from "../../domains/layout/Container";

export interface BasicHeaderProps {
}

export function BasicHeader(): JSX.Element {
  return (
    <div className="BasicHeader">
      <Container>
        BasicHeader
      </Container>
    </div>
  );
}
