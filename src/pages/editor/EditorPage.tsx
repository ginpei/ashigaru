import Head from "next/head";
import { Editor } from "./editor/Editor";
import styles from "./EditorPage.module.css";
import { ListPane } from "./list/ListPane";
import { NavBar } from "./navBar/NavBar";

export interface EditorPageProps {
}

export function EditorPage(): JSX.Element {
  return (
    <div className={styles.root}>
      <Head>
        <title>Editor</title>
      </Head>
      <header className={styles.navbar}>
        <NavBar />
      </header>
      <div className={styles.list}>
        <ListPane />
      </div>
      <div className={styles.editor}>
        <Editor />
      </div>
    </div>
  );
}
