import React, { useMemo, useState } from "react";
import styles from "./AddClientModal.module.scss";
import rest from "../../../../services/rest";

interface AddClientModalProps {
  closeAddClientModal: any;
  isUsernameTaken: any;
  setAddValue: Function;
  addValue: string;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  closeAddClientModal: closeAddClientModal,
  isUsernameTaken,
  setAddValue,
  addValue,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleInputChange = (event: any) => {
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
          "/api/mikrotik/wg/add_vpn_client",
          {},
          {
            params: {
              name: "vpn.dopserver.ru",
              comment: addValue,
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
    <>
      <div
        className={styles.container}
        onClick={() => closeAddClientModal(false)}
      >
        <div
          className={styles.wrapper}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.closeBtn}>
            <img
              src="/CloseBtn.svg"
              alt=""
              onClick={() => closeAddClientModal(false)}
            />
          </div>
          <span className={styles.form}>
            <input
              type="text"
              className="formInput"
              placeholder="Username"
              value={addValue}
              onInput={(e) => handleInputChange(e)}
            />
            <span className="validation-error">{usernameError}</span>
            <button onClick={() => createClient()}>
              {isLoading ? <span className="loader"></span> : "Add Client"}
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
