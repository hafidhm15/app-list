import React from "react";
import Button from "./Button";
import "../styles/DeleteModal.css";

class DeleteModal extends React.Component {
  render() {
    const { delet, dlt, close, data } = this.props;
    if (delet) {
      return (
        <div className="modal-container">
          <div className="modal-box">
            <h3>Apakah Kamu yakin ingin menghapus ini ?</h3>
            <div className="input">
              <p>{data.title}</p>
            </div>
            <div className="btn-group">
              <Button text="hapus" variant="success" action={dlt} />
              <Button text="cancel" variant="warning" action={close} />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DeleteModal;
