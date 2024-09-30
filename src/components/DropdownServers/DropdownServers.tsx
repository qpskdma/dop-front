import React, { useEffect, useState } from "react";
import styles from "./DropdownServers.module.scss";

interface DropdownServersProps {
  servers: Array<Server> | undefined;
  activeServer: string | undefined;
  changeServer: Function;
}
export interface Server {
  id: number;
  name: string;
  ip: string;
  port: number;
  region: string;
}

const DropdownServers: React.FC<DropdownServersProps> = ({
  servers,
  activeServer,
  changeServer,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.text}>
          <p>{activeServer ? activeServer : "Unknown"}</p>
          <img src="/ArrowDown.svg" alt="" />
        </div>
        <div className={styles.content}>
          {servers?.map((el, index) => (
            <p key={index} onClick={() => changeServer(el.region)}>
              {el.name} – {el.region}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownServers;
