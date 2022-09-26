import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

function BtnSubmit({
  toggle,
  text,
  modal,
  quizname,
  handleChange,
  handleClick,
  ...props
}) {
  return (
    <div>
      <Button color="success" onClick={() => toggle()}>
        {text}
      </Button>
      <Modal isOpen={modal} toggle={() => toggle()}>
        <ModalHeader>{text}</ModalHeader>
        <ModalBody>
          <div>
            <Input
              placeholder="Enter quiz name"
              value={quizname}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary" onClick={() => handleClick()}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BtnSubmit;
