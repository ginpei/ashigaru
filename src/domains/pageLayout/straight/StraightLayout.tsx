import Head from "next/head";
import { Container } from "../../layout/Container";
import { VStack } from "../../layout/VStack";
import { BasicFooter } from "../shared/BasicFooter";
import { BasicHeader } from "../shared/BasicHeader";

export interface StraightLayoutProps {
  children: React.ReactNode;
  className?: string;
  title: string;
}

export function StraightLayout({
  children,
  className,
  title,
}: StraightLayoutProps): React.JSX.Element {
  return (
    <div className={`${className} StraightLayout`}>
      <Head>
        <link rel="shortcut icon" href="/icon-512.png" type="image/png" />
        <title>{`${title} | Ashigaru`}</title>
      </Head>
      <VStack>
        <BasicHeader />
        <Container>
          <main className="min-h-[50vh]">{children}</main>
        </Container>
        <BasicFooter />
      </VStack>
    </div>
  );
}
