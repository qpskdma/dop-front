import styles from "./Table.module.scss";
import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  fields: Array<string>;
  navColumns: number;
}

const Table: React.FC<TableProps> = ({ children, fields, navColumns }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div
          className={styles.navTextContainer}
          style={{
            gridTemplateColumns: `repeat(${navColumns}, 1fr)`,
          }}
        >
          {fields.map((el, id) => (
            <div key={id}>{el}</div>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Table;
