import React from "react";
import "./Modal.scss";

type Props = {
  toggleModal: (boolean) => void,
  show: boolean,
  children: React.ReactNode
};

const Modal = ({ toggleModal, show, children }: Props) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        {children}
        <button onClick={toggleModal(false)}>close</button>
      </section>
    </div>
  );
};
export default Modal;
