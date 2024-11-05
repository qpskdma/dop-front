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
      <div className="tableBtnContainer">
        <div>
          <button
            className={styles.qr}
            data-tooltip-id="qr"
            data-tooltip-content="Download QR code"
            data-tooltip-place="bottom"
            onClick={() => getQR(config)}
          >
            <img width={"32"} height={"32"} src="/QR.svg" alt="QR" />
          </button>
        </div>
        <button
          data-tooltip-id="config"
          data-tooltip-content="Get config"
          data-tooltip-place="bottom"
          onClick={() => getConfig(config)}
        >
          <img width={"32"} height={"32"} src="/Download.svg" alt="Download" />
        </button>
        <button
          data-tooltip-id="delete"
          data-tooltip-content="Delete"
          data-tooltip-place="bottom"
          className="deleteBtn"
          onClick={() => openDeletionModal(config)}
        >
          <img width={"32"} height={"32"} src="/Delete.svg" alt="Delete" />
        </button>
        <Tooltip id="config" />
        <Tooltip id="qr" />
        <Tooltip id="delete" />
      </div>
    </>
  );
};

export default ClientCard;
