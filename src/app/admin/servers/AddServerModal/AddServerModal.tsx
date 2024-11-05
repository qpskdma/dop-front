import Modal from "@/components/Modal/Modal";
import React, { ChangeEvent, useState } from "react";
import rest from "../../../../../services/rest";
import styles from "./AddServerModal.module.scss";
import { Server } from "../../../../../services/types";
import PasswordInput from "@/components/PasswordInput/PasswordInput";

interface NewServer {
  serverName: string;
  ip: string;
  port: string;
  password: string;
  region: string;
}

interface AddServerModalProps {
  servers: Server[];
  closeAddServerModal: Function;
}

const AddServerModal: React.FC<AddServerModalProps> = ({
  servers,
  closeAddServerModal,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [usernameError, setError] = useState("");
  const [portError, setPortError] = React.useState("");
  const [IPError, setIPError] = React.useState("");
  const [newServer, setNewServer] = useState<NewServer>({
    serverName: "",
    ip: "",
    port: "",
    password: "",
    region: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "port") {
      if (value.length > 5 || !/^\d+$/.test(value)) {
        setPortError("Must be 5 digits or less");
      } else {
        setPortError("");
      }
    }
    if (name === "ip") {
      const formattedValue = value.replace(/(\d{3})(?=\d)/g, "$1.");
      setNewServer((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
      if (validateIP(value) || !value) {
        setIPError("");
      } else {
        setIPError("Invalid IP address");
      }
      return;
    }
    setNewServer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function validateIP(ip: string) {
    const ipRegex =
      /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  async function createServer() {
    if (
      !newServer.ip ||
      !newServer.serverName ||
      !newServer.password ||
      !newServer.region ||
      !newServer.port
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
          "/vpn/admin/add_server",
          {
            name: newServer.serverName,
            ip: newServer.ip,
            port: newServer.port,
            password: newServer.password,
            region: newServer.region,
          },
          {}
        );
        closeAddServerModal(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Incorrect password");
      } finally {
        setLoading(false);
        setNewServer({
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
      servers.filter((element: Server) => element.name === newServer.serverName)
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
        <form className={styles.form}>
          <input
            type="text"
            name="serverName"
            className="formInput"
            placeholder="Server Name"
            value={newServer.serverName}
            onInput={handleInputChange}
          />
          <input
            type="text"
            name="ip"
            className="formInput"
            placeholder="IP"
            value={newServer.ip}
            onInput={handleInputChange}
          />
          {IPError ? (
            <span className={`validation-error ${styles.error}`}>
              {IPError}
            </span>
          ) : null}
          <input
            type="text"
            name="port"
            className="formInput"
            placeholder="Port"
            value={newServer.port}
            onInput={handleInputChange}
          />
          {portError ? (
            <span className={`validation-error ${styles.error}`}>
              {portError}
            </span>
          ) : null}
          <PasswordInput
            value={newServer.password}
            isPasswordVisible={isPasswordVisible}
            handlePasswordChange={handleInputChange}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          {/* <input
            type="password"
            name="password"
            className="formInput"
            placeholder="Password"
            value={newServer.password}
            onInput={handleInputChange}
          /> */}
          <input
            type="text"
            name="region"
            className="formInput"
            placeholder="Region"
            value={newServer.region}
            onInput={handleInputChange}
          />
          <span className="validation-error">{usernameError}</span>
          <button onClick={() => createServer()}>
            {isLoading ? <span className="loader"></span> : "Add Server"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddServerModal;
