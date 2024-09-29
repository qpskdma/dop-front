import React, { useEffect, useState } from "react";
import styles from "./DeleteClientModal.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { store } from "@/../store/store";
import rest from "../../../../services/rest";
import { Config } from "../../../../services/types";

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

  const token = localStorage.getItem("token");

  // const token = useSelector((state: any) => state.auth.token);
  // useEffect(() => {
  //   store.subscribe(() => console.log(token));
  // }, [store]);
  // console.log(token);

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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.text}>
          Are you sure you want to delete
          <span className={styles.clientName}> {config?.name}</span>?
        </div>
        <div className={styles.btns}>
          <button onClick={() => deleteClient()}>
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
