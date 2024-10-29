import React, { useState } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "@/components/Modal/DeletionModal.module.scss";
import { Server } from "../../../../../services/types";
import rest from "../../../../../services/rest";

interface DeleteServerModalProps {
  server: Server | undefined;
  closeDeleteServerModal: Function;
}

const DeleteServerModal: React.FC<DeleteServerModalProps> = ({
  server,
  closeDeleteServerModal,
}) => {
  const [isLoading, setLoading] = useState(false);

  async function deleteServer() {
    setLoading(true);
    try {
      await rest.delete("/vpn/wg_easy/admin/delete_server", {
        params: {
          server_id: server?.id,
        },
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
    closeDeleteServerModal(true);
  }

  return (
    <>
      <Modal closeModal={closeDeleteServerModal}>
        <div className={styles.delModalText}>
          Are you sure you want to delete
          <span className={styles.delItemName}> {server?.name}</span>?
        </div>
        <div className={styles.delBtns}>
          <button className="deleteBtn" onClick={() => deleteServer()}>
            {isLoading ? <span className="loader"></span> : "Yes"}
          </button>
          <button onClick={() => closeDeleteServerModal()}>No</button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteServerModal;
