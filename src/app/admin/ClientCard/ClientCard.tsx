import React, { useState } from "react";
import styles from "./ClientCard.module.scss";
import getCreationTime from "./getCreationTime";
import getLastSession from "./getLastSessionTime";
import { Config } from "../../../../services/types";

interface ClientCardProps {
  config: Config;
  getConfig: Function;
  openDeletionModal: Function;
}

const ClientCard: React.FC<ClientCardProps> = ({
  config,
  getConfig,
  openDeletionModal,
}) => {
  return (
    <>
      <span className={styles.name}>{config.name} </span>
      <span>{getCreationTime(config.createdAt)}</span>
      <span>{getLastSession(config.latestHandshakeAt)}</span>
      <div className={styles.btnContainer}>
        <button onClick={() => getConfig(config)}>Get config</button>
        <button
          className={styles.deleteBtn}
          onClick={() => openDeletionModal(config)}
        >
          Delete client
        </button>
      </div>
    </>
  );
};

export default ClientCard;
