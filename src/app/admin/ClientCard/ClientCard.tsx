import React, { useState } from "react";
import styles from "./ClientCard.module.scss";
import getCreationTime from "./getCreationTime";
import getLastSession from "./getLastSessionTime";

interface ClientCardProps {
  name: string;
  creationTime: number;
  lastSession: number;
  getConfig: Function;
  openDeletionModal: Function;
}

const ClientCard: React.FC<ClientCardProps> = ({
  name,
  creationTime,
  lastSession,
  getConfig,
  openDeletionModal,
}) => {
  return (
    <>
      <span className={styles.name}>{name} </span>
      <span>{getCreationTime(creationTime)}</span>
      <span>{getLastSession(lastSession)}</span>
      <div className={styles.btnContainer}>
        <button onClick={() => getConfig(name)}>"Get config"</button>
        <button
          className={styles.deleteBtn}
          onClick={() => openDeletionModal(name)}
        >
          Delete client
        </button>
      </div>
    </>
  );
};

export default ClientCard;
