import styles from "./Container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
}
