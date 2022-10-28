import Head from "next/head";
import { Container } from "../../domains/layout/Container";
import { BasicFooter } from "../shared/BasicFooter";
import { BasicHeader } from "../shared/BasicHeader";

export interface StraightLayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

export function StraightLayout({ children, className, title }: StraightLayoutProps): JSX.Element {
  return (
    <div className={`${className} StraightLayout`}>
      <Head>
        <title>{title} | Ashigaru</title>
      </Head>
      <BasicHeader />
      <Container>
        <main className="min-h-[50vh]">
          {children}
        </main>
      </Container>
      <BasicFooter />
    </div>
  );
}
