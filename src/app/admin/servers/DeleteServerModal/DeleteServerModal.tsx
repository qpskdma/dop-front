import React, { useState } from "react";
import styles from "./DeleteServerModal.module.scss";
import Modal from "@/components/Modal/Modal";
import { Server } from "../../../../../services/types";

interface DeleteServerModalProps {
  server: Server;
  closeDeleteServerModal: Function;
  deleteServer: Function;
}

const DeleteServerModal: React.FC<DeleteServerModalProps> = ({
  server,
  closeDeleteServerModal,
  deleteServer,
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div>
      <Modal closeModal={closeDeleteServerModal}>
        <div className={styles.text}>
          Are you sure you want to delete
          <span className={styles.serverName}>{server?.name}</span>?
        </div>
        <div className={styles.btns}>
          <button className="deleteBtn" onClick={() => deleteServer()}>
            {isLoading ? <span className="loader"></span> : "Yes"}
          </button>
          <button onClick={() => closeDeleteServerModal()}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteServerModal;
