import { VStack } from "../../layout/VStack";
import { NiceCode } from "../../nice/NiceCode";
import { NiceH1, NiceH2 } from "../../nice/NiceH";
import { StraightLayout } from "../../pageLayout/straight/StraightLayout";

export function StylesPage(): JSX.Element {
  return (
    <StraightLayout title="Command demos">
      <VStack>
        <NiceH1>Styles</NiceH1>
        <VStack>
          <NiceH2>
            <NiceCode>{`<table className="ui-table">`}</NiceCode>
          </NiceH2>
          <table className="ui-table">
            <caption>hehe</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#001</td>
                <td>Alice</td>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur officiis reprehenderit eaque. Dolores delectus
                  sequi ullam aut neque ea placeat animi quaerat praesentium
                  magnam quisquam, exercitationem laborum nam. Odit, inventore.
                </td>
              </tr>
              <tr>
                <td>#002</td>
                <td>Bob</td>
                <td>
                  Sequi quasi earum culpa illo consequuntur nisi! Fuga,
                  perspiciatis asperiores! Veritatis corrupti ad dolorum
                  voluptatibus. Voluptatem animi suscipit odio nobis
                  necessitatibus. Eaque ducimus reprehenderit aspernatur
                  doloremque! Tenetur quos modi aut!
                </td>
              </tr>
              <tr>
                <td>#003</td>
                <td>Charlie</td>
                <td>
                  Id accusamus ab error animi? Nihil, culpa maiores alias quasi
                  eveniet necessitatibus eius in, velit facilis labore, id
                  debitis officia similique. Accusamus mollitia quod inventore
                  et sequi commodi. Ratione, quia.
                </td>
              </tr>
            </tbody>
          </table>
        </VStack>
        <VStack>
          <NiceH2>
            <NiceCode>{`<ul className="ui-ul">`}</NiceCode>
          </NiceH2>
          <ul className="ui-ul">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </VStack>
        <VStack>
          <NiceH2>
            <NiceCode>{`<ol className="ui-ol">`}</NiceCode>
          </NiceH2>
          <ol className="ui-ol">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ol>
        </VStack>
      </VStack>
    </StraightLayout>
  );
}

StylesPage.path = "styles" as const;
