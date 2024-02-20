import { Container } from "../../layout/Container";

export interface BasicFooterProps {}

export function BasicFooter(): JSX.Element {
  return (
    <div
      className="
      BasicFooter
      mt-32 py-16 border-t border-dashed border-gray-500 text-gray-500
      "
    >
      <Container>BasicFooter</Container>
    </div>
  );
}
