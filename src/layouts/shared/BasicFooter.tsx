import { Container } from "../../domains/layout/Container";

export interface BasicFooterProps {}

export function BasicFooter(): JSX.Element {
  return (
    <div className="BasicFooter">
      <Container>BasicFooter</Container>
    </div>
  );
}
