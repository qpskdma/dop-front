import React, { useMemo, useState } from "react";
import styles from "./AddClientModal.module.scss";
import rest from "../../../../services/rest";
import Modal from "@/components/Modal/Modal";

interface AddClientModalProps {
  activeServer: string;
  closeAddClientModal: Function;
  isUsernameTaken: Function;
  setAddValue: Function;
  addValue: string;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  activeServer,
  closeAddClientModal,
  isUsernameTaken,
  setAddValue,
  addValue,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddValue(event.target.value);
    setUsernameError("");
  };

  async function createClient() {
    if (!addValue) {
      setUsernameError("Username cannot be empty");
      return;
    }
    if (isUsernameTaken()) {
      setUsernameError("Username taken");
    } else {
      setLoading(true);
      try {
        await rest.post(
          "/vpn/user/add_vpn_client_to_server",
          {},
          {
            params: {
              region: activeServer,
              name: addValue,
            },
          }
        );
        closeAddClientModal(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
        setAddValue("");
      }
    }
  }

  return (
    <Modal closeModal={closeAddClientModal}>
      <span className={styles.form}>
        <input
          type="text"
          className="formInput"
          placeholder="Username"
          value={addValue}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
        />
        <span className="validation-error">{usernameError}</span>
        <button onClick={() => createClient()}>
          {isLoading ? <span className="loader"></span> : "Add Client"}
        </button>
      </span>
    </Modal>
  );
};

export default AddClientModal;
