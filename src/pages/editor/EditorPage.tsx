import Head from "next/head";
import { CSSProperties, useEffect } from "react";
import { editorCommands } from "./actions/editorCommands";
import { Editor } from "./editor/Editor";
import { ListPane } from "./list/ListPane";
import { NavBar } from "./navBar/NavBar";
import { startCommandPalette as startCommandPalette } from "./tempCommandPalette";

export interface EditorPageProps {
}

const rootStyle: CSSProperties = {
  gridTemplate: `
    "navbar navbar" 2rem
    "list   editor" auto
    / 300px auto
  `,
};

export function EditorPage(): JSX.Element {
  useEffect(() => {
    return startCommandPalette(editorCommands);
  }, []);

  return (
    <div className="EditorPage grid h-[100vh] [&>*]:overflow-auto" style={rootStyle}>
      <Head>
        <title>Editor</title>
      </Head>
      <header style={{ gridArea: "navbar" }}>
        <NavBar />
      </header>
      <div style={{ gridArea: "list" }}>
        <ListPane />
      </div>
      <div style={{ gridArea: "editor" }}>
        <Editor />
      </div>
    </div>
  );
}
