import Modal from "@/components/Modal/Modal";
import React, { ChangeEvent, useState } from "react";
import rest from "../../../../../services/rest";
import styles from "./AddServerModal.module.scss";
import { Server } from "http";
import PasswordInput from "@/components/PasswordInput/PasswordInput";

interface FormData {
  serverName: string;
  ip: string;
  port: string;
  password: string;
  region: string;
}

interface AddServerModalProps {
  servers: Server[] | any;
  closeAddServerModal: any;
}

const AddServerModal: React.FC<AddServerModalProps> = ({
  servers,
  closeAddServerModal,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameError, setError] = useState("");
  const [portError, setPortError] = React.useState("");
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
    if (name === "port") {
      if (value.length > 5 || !/^\d+$/.test(value)) {
        setPortError("Must be 5 digits or less");
      } else {
        setPortError("");
      }
    }
  };

  async function createServer() {
    if (
      !formData.ip ||
      !formData.serverName ||
      !formData.password ||
      !formData.region ||
      !formData.port
    ) {
      setError("Fill in all fields");
      return;
    }
    if (isServerNameTaken()) {
      setError("Server Name taken");
      return;
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
        setFormData({
          serverName: "",
          ip: "",
          port: "",
          password: "",
          region: "",
        });
      }
    }
  }

  const isServerNameTaken = () => {
    return (
      servers.filter((element: any) => element.name === formData.serverName)
        .length > 0
    );
  };

  function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    if (!(passwordInput instanceof HTMLInputElement)) {
      return;
    }
    if (passwordInput.type === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      setIsPasswordVisible(!isPasswordVisible);
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
          {portError ? (
            <span className={`validation-error ${styles.error}`}>
              {portError}
            </span>
          ) : null}
          <PasswordInput
            value={formData.password}
            isPasswordVisible={isPasswordVisible}
            handlePasswordChange={handleInputChange}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          {/* <input
            type="password"
            name="password"
            className="formInput"
            placeholder="Password"
            value={formData.password}
            onInput={handleInputChange}
          /> */}
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
