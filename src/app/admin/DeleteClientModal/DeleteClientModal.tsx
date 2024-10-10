import React, { useEffect, useState } from "react";
import styles from "./DeleteClientModal.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "@/../store/store";
import rest from "../../../../services/rest";
import { Config } from "../../../../services/types";
import Modal from "@/components/Modal/Modal";

interface DeleteClientModalProps {
  activeServer: string;
  config: Config | undefined;
  closeDeletionModal: Function;
}

const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  activeServer,
  config,
  closeDeletionModal,
}) => {
  const [isLoading, setLoading] = useState(false);

  async function deleteClient() {
    setLoading(true);
    try {
      await rest.delete("/api/vpn/wg_easy/admin/del_vpn_client_to_server", {
        params: {
          region: activeServer,
          id: config?.id,
        },
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
    closeDeletionModal(true);
  }

  return (
    <Modal closeModal={closeDeletionModal}>
      <div className={styles.text}>
        Are you sure you want to delete
        <span className={styles.clientName}> {config?.name}</span>?
      </div>
      <div className={styles.btns}>
        <button className="deleteBtn" onClick={() => deleteClient()}>
          {isLoading ? <span className="loader"></span> : "Yes"}
        </button>
        <button onClick={() => closeDeletionModal()}>No</button>
      </div>
    </Modal>
  );
};

export default DeleteClientModal;
