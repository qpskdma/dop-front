//добавить фильтрацию клиентов по символам и времени последней сессии и добавления

import React, { useState } from "react";
import styles from "./ClientCard.module.scss";
import getCreationTime from "../getCreationTime";
import getLastSession from "../getLastSessionTime";

interface ClientCardProps {
  name: string;
  creationTime: number;
  lastSession: number;
}

const ClientCard: React.FC<ClientCardProps> = ({
  name,
  creationTime,
  lastSession,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.textWrapper}>
        <span className={styles.name}>{name} </span>
      </div>
      <div className={styles.textWrapper}>
        <span>{getCreationTime(creationTime)}</span>
      </div>
      <div className={styles.textWrapper}>
        <span>{getLastSession(lastSession)}</span>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.getConfigBtn}>Get config</button>
        <button className={styles.deleteBtn}>Delete client</button>
      </div>
    </div>
  );
};

export default ClientCard;
