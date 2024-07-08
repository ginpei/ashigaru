import { homePagePath } from "../../../../pages/home/homePageMeta";
import { HStack } from "../../../layout/HStask";
import { VStack } from "../../../layout/VStack";
import { StraightLayout } from "../../../pageLayout/straight/StraightLayout";
import { NiceButton } from "../../NiceButton";
import { NiceCode } from "../../NiceCode";
import { NiceCodeBlock } from "../../NiceCodeBlock";
import { NiceColorInput } from "../../NiceColorInput";
import { NiceH1, NiceH2, NiceH3 } from "../../NiceH";
import { NiceInput } from "../../NiceInput";
import { NiceLink } from "../../NiceLink";

export function NiceUisShowcase(): React.JSX.Element {
  return (
    <StraightLayout title="Nice UIs demo">
      <VStack>
        <NiceH1>Nice UIs</NiceH1>
        <NiceH2>{"<NiceButton>"}</NiceH2>
        <p>
          <NiceButton>Nice</NiceButton>
        </p>
        <NiceH2>{"<NiceCode>, <NiceCodeBlock>"}</NiceH2>
        <p>
          <NiceCode>{"<NiceCode>Hi</NiceCode>"}</NiceCode>
        </p>
        <NiceCodeBlock>
          {`
<NiceCodeBlock>{\`
export function NiceUisShowcase(): React.JSX.Element {
  return (
    …
  );
}
\`.trim()}</NiceCodeBlock>
          `.trim()}
        </NiceCodeBlock>
        <NiceH2>{"<NiceH1>, <NiceH2>, <NiceH3>"}</NiceH2>
        <blockquote className="ml-10">
          <VStack>
            <NiceH1>NiceH1</NiceH1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              eveniet debitis inventore. Reiciendis nobis deleniti cupiditate
              dolorum a in odio porro, perspiciatis cum architecto quas error
              similique, consequatur unde voluptate.
            </p>
            <NiceH2>NiceH2</NiceH2>
            <p>
              Veniam quam eius atque commodi ipsam praesentium. Corporis quas
              excepturi, ad provident laborum, quo magni adipisci dolor
              veritatis et eligendi? Vero molestias nesciunt in repudiandae
              voluptatem! Officia similique odio quasi?
            </p>
            <NiceH3>NiceH3</NiceH3>
            <p>
              Eveniet ad quos nam tempore incidunt voluptate sed fugiat magnam
              maxime omnis, eligendi totam cumque at sint sequi optio aut dolor
              illum, amet consectetur numquam? Animi sit asperiores accusantium
              ullam.
            </p>
          </VStack>
        </blockquote>
        <NiceH2>{"<NiceInput>, <NiceColorInput>"}</NiceH2>
        <HStack>
          <NiceInput type="text" placeholder="Nice input" />
          <NiceInput type="number" value={10} />
          <NiceColorInput />
        </HStack>
        <NiceH2>{"<NiceLink>"}</NiceH2>
        <p>
          <NiceLink href={homePagePath()}>Home</NiceLink>
          {" | "}
          <NiceLink href="https://ginpei.dev/">Ginpei.dev</NiceLink>
        </p>
      </VStack>
    </StraightLayout>
  );
}

NiceUisShowcase.path = "nice" as const;
