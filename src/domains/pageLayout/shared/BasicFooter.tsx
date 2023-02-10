import { Container } from "../../layout/Container";

export interface BasicFooterProps {}

export function BasicFooter(): JSX.Element {
  return (
    <div className="BasicFooter border-t border-gray-500 border-dashed">
      <Container>BasicFooter</Container>
    </div>
  );
}
