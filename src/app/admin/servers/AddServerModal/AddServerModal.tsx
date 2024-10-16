import Modal from "@/components/Modal/Modal";
import React, { ChangeEvent, useState } from "react";
import rest from "../../../../../services/rest";
import styles from "./AddServerModal.module.scss";

interface FormData {
  serverName: string;
  ip: string;
  port: string;
  password: string;
  region: string;
}

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
  const [formData, setFormData] = useState<FormData>({
    serverName: "",
    ip: "",
    port: "",
    password: "",
    region: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              name: formData.serverName,
              ip: formData.ip,
              port: formData.port,
              password: formData.password,
              region: formData.region,
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
            name="serverName"
            className="formInput"
            placeholder="Server Name"
            value={formData.serverName}
            onInput={handleInputChange}
          />
          <input
            type="text"
            name="ip"
            className="formInput"
            placeholder="IP"
            value={formData.ip}
            onInput={handleInputChange}
          />
          <input
            type="text"
            name="port"
            className="formInput"
            placeholder="Port"
            value={formData.port}
            onInput={handleInputChange}
          />
          <input
            type="password"
            name="password"
            className="formInput"
            placeholder="Password"
            value={formData.password}
            onInput={handleInputChange}
          />
          <input
            type="text"
            name="region"
            className="formInput"
            placeholder="Region"
            value={formData.region}
            onInput={handleInputChange}
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
