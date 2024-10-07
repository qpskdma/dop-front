import React, { useState } from "react";
import styles from "./ClientCard.module.scss";
import getCreationTime from "./getCreationTime";
import getLastSession from "./getLastSessionTime";
import { Config } from "../../../../services/types";
import { Tooltip } from "react-tooltip";

interface ClientCardProps {
  config: Config;
  getConfig: Function;
  getQR: Function;
  openDeletionModal: Function;
}

const ClientCard: React.FC<ClientCardProps> = ({
  config,
  getConfig,
  getQR,
  openDeletionModal,
}) => {
  return (
    <>
      <span className={styles.name}>{config.name} </span>
      <span>{getCreationTime(config.createdAt)}</span>
      <span>{getLastSession(config.latestHandshakeAt)}</span>
      <div className={styles.btnContainer}>
        <div>
          <button
            data-tooltip-id="qr"
            data-tooltip-content="Download QR code"
            data-tooltip-place="bottom"
            className={styles.qr}
            onClick={() => getQR(config)}
          >
            <img width={"32px"} height={"32px"} src="/QR.svg" alt="" />
          </button>
        </div>
        <button
          data-tooltip-id="config"
          data-tooltip-content="Get config"
          data-tooltip-place="bottom"
          onClick={() => getConfig(config)}
        >
          <img width={"32px"} height={"32px"} src="/Download.svg" alt="" />
        </button>
        <button
          data-tooltip-id="delete"
          data-tooltip-content="Delete"
          data-tooltip-place="bottom"
          className={styles.deleteBtn}
          onClick={() => openDeletionModal(config)}
        >
          <img width={"32px"} height={"32px"} src="/Delete.svg" alt="" />
        </button>
        <Tooltip id="config" />
        <Tooltip id="qr" />
        <Tooltip id="delete" />
      </div>
    </>
  );
};

export default ClientCard;
