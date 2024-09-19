//добавить фильтрацию клиентов по символам и времени последней сессии и добавления

import React, { useEffect, useState } from "react";
import styles from "./ClientCard.module.css";
import getCreationTime from "./getCreationTime";
import getLastSession from "./getLastSessionTime";

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
  const [isOnline, setOnline] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div>{name} </div>
      <div>
        <span className="textSecondary">Creation time: </span>
        {getCreationTime(creationTime)}
      </div>
      <div>
        <span className="textSecondary">Last session:</span>
        {/* <span className={isOnline && styles.never}> */}
        {getLastSession(lastSession)}
        {/* </span> */}
      </div>
      <button className={styles.deleteBtn}>Delete client</button>
    </div>
  );
};

export default ClientCard;
