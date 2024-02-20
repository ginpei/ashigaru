import { Container } from "../../layout/Container";

export interface BasicFooterProps {}

export function BasicFooter(): JSX.Element {
  return (
    <div
      className="
      BasicFooter
      mt-32 border-t border-dashed border-gray-500 py-16 text-gray-500
      "
    >
      <Container>BasicFooter</Container>
    </div>
  );
}
