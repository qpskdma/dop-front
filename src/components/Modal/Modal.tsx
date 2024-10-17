import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: ReactNode | never;
  closeModal: Function;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div className={styles.container} onClick={() => closeModal(false)}>
      <div
        className={styles.wrapper}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.closeBtn}>
          <img src="/CloseBtn.svg" alt="" onClick={() => closeModal(false)} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
