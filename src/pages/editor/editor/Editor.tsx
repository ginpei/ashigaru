import styles from "./Editor.module.css";

export interface EditorProps {
}

export function Editor(): JSX.Element {
  return (
    <div className={styles.root}>
      <input
        className={styles.title}
        type="text"
        placeholder="Title"
      />
      <textarea
        className={styles.body}
        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nobis amet illum illo doloribus quo aut. Eius fugiat mollitia illum excepturi repellat, commodi, quasi nihil facilis at eaque, deserunt iusto!"
      />
    </div>
  );
}
