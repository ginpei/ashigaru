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
        <VStack>
          <NiceH2>
            <NiceCode>{`<pre className="ui-pre">`}</NiceCode>
          </NiceH2>
          <pre className="ui-pre">{`<pre className="ui-pre">{\`export function myFunction() {
  console.log("hello");
}
\`}</pre>
`}</pre>
        </VStack>
        <VStack>
          <NiceH2>
            <NiceCode>{`<details className="ui-details">`}</NiceCode>
          </NiceH2>
          <p>
            Also use <NiceCode>{`className="ui-details--content"`}</NiceCode>{" "}
            for content in need.
          </p>
          <details className="ui-details">
            <summary>Details</summary>
            <VStack className="ui-details--content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates natus asperiores quidem sunt libero ut facere laborum
              ducimus consequuntur quos. Ex quaerat ducimus eveniet, voluptatum
              quae porro ab quisquam ratione.
            </VStack>
          </details>
          <details className="ui-details" open>
            <summary>Details</summary>
            <VStack className="ui-details--content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates natus asperiores quidem sunt libero ut facere laborum
              ducimus consequuntur quos. Ex quaerat ducimus eveniet, voluptatum
              quae porro ab quisquam ratione.
            </VStack>
          </details>
        </VStack>
      </VStack>
    </StraightLayout>
  );
}

StylesPage.path = "styles" as const;
