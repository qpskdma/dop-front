import React, { useState } from "react";
import styles from "./DeleteClientModal.module.scss";
import axios from "axios";

interface DeleteClientModalProps {
  deleteClientName: string;
  closeDeletionModal: Function;
}

const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  deleteClientName,
  closeDeletionModal,
}) => {
  const [isLoading, setLoading] = useState(false);

  async function deleteClient() {
    setLoading(true);
    try {
      await axios.get("https://api.dopserver.ru/api/mikrotik/wg/del_client", {
        params: {
          name: "vpn.dopserver.ru",
          remove: true,
          comment: deleteClientName,
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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Are you sure you want to delete
          <span className={styles.clientName}> {deleteClientName}</span>?
        </div>
        <div className={styles.btns}>
          <button onClick={() => deleteClient()}>
            {" "}
            {isLoading ? <span className="loader"></span> : "Yes"}
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => closeDeletionModal()}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;