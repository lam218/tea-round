import React from "react";
import "./Modal.scss";

type Props = {
  handleClose: () => void,
  show: boolean,
  children: React.ReactNode
};

const Modal = ({ handleClose, show, children }: Props) => {
  return (
    <div className={show ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};
export default Modal;
