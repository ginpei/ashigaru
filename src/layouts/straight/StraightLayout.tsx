import { Container } from "../../domains/layout/Container";
import { BasicFooter } from "../shared/BasicFooter";
import { BasicHeader } from "../shared/BasicHeader";
import styles from "./StraightLayout.module.css";

export interface StraightLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function StraightLayout({ children, className }: StraightLayoutProps): JSX.Element {
  return (
    <div className={`${className} StraightLayout`}>
      <BasicHeader />
      <Container>
        <main className={styles.main}>
          {children}
        </main>
      </Container>
      <BasicFooter />
    </div>
  );
}
