import React from "react";
import { Button } from "reactstrap";

function BtnDelete({ text, quizID, handleClick, ...props }) {
  return (
    <div>
      <Button color="danger" onClick={() => handleClick(quizID)}>
        {text}
      </Button>
    </div>
  );
}

export default BtnDelete;
