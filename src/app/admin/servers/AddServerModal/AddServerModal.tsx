import Modal from "@/components/Modal/Modal";
import React, { useState } from "react";
import rest from "../../../../../services/rest";
import styles from "./AddServerModal.module.scss";

interface AddServerModalProps {
  closeAddServerModal: any;
  isServerNameTaken: Function;
  setAddValue: Function;
  addValue: string;
}

const AddServerModal: React.FC<AddServerModalProps> = ({
  closeAddServerModal,
  isServerNameTaken,
  setAddValue,
  addValue,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleInputChange = (event: any) => {
    setAddValue(event.target.value);
    setUsernameError("");
  };

  async function createServer() {
    if (!addValue) {
      setUsernameError("Server Name cannot be empty");
      return;
    }
    if (isServerNameTaken()) {
      setUsernameError("Server Name taken");
    } else {
      setLoading(true);
      try {
        await rest.post(
          "/api/vpn/wg_easy/admin/add_server",
          {},
          {
            params: {
              name: addValue,
              ip: "",
              port: "",
              password: "",
              region: "",
            },
          }
        );
        closeAddServerModal(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
        setAddValue("");
      }
    }
  }
  return (
    <>
      <Modal closeModal={closeAddServerModal}>
        <span className={styles.form}>
          <input
            type="text"
            className="formInput"
            placeholder="Server Name"
            value={addValue}
            onInput={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            className="formInput"
            placeholder="IP"
            value={addValue}
            onInput={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            className="formInput"
            placeholder="Port"
            value={addValue}
            onInput={(e) => handleInputChange(e)}
          />
          <input
            type="password"
            className="formInput"
            placeholder="Password"
            value={addValue}
            onInput={(e) => handleInputChange(e)}
          />
          <input
            type="text"
            className="formInput"
            placeholder="Region"
            value={addValue}
            onInput={(e) => handleInputChange(e)}
          />
          <span className="validation-error">{usernameError}</span>
          <button onClick={() => createServer()}>
            {isLoading ? <span className="loader"></span> : "Add Server"}
          </button>
        </span>
      </Modal>
    </>
  );
};

export default AddServerModal;
