import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

function BtnEdit({
  text,
  quizID,
  handleClick,
  quizname,
  handleChange,
  ...props
}) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [quizName, setQuizName] = useState(quizname);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [change, setChange] = useState(false);

  //UseEffect similar to Lifecycle methods
  useEffect(() => {
    axios
      .get(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizID}/questions`
      )
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (change) {
      axios
        .get(
          `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizID}/questions`
        )
        .then((res) => {
          setQuestions(res.data);
        })
        .catch((err) => console.log(err.message));
      setChange(!change);
    }
  }, [addNew, change, quizID]);

  //Functions
  // type and change Quiz Name
  const handleChangeName = (e) => {
    const inputValue = e.target.value;
    setQuizName(inputValue);
  };
  //update Quiz Name in API and close Modal
  const handleClickEdit = () => {
    toggle();
    handleClick(quizID, quizName);
  };
  // type New Question
  const handleTypeNewQuestion = (e) => {
    const typedQuestion = e.target.value;
    setNewQuestion(typedQuestion);
  };
  //add New Question to API
  const handleClickAdd = () => {
    if (newQuestion) {
      const questionText = newQuestion;
      axios.post(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizID}/questions`,
        {
          questionText
        }
      );
      setTimeout(() => {
        setNewQuestion("");
        setChange(!change);
        setAddNew((prevState) => !prevState);
      }, 1000);
    }
  };
  //delete Question from API
  const handleClickDelete = (id) => {
    axios.delete(
      `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizID}/questions/${id}`
    );
    setTimeout(() => {
      setChange(!change);
    }, 1000);
  };
  return (
    <div>
      <Button className="my-btn" color="warning" onClick={toggle}>
        {text}
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>Edit Quiz</ModalHeader>
        <ModalBody>
          <div>
            <Input
              value={quizName}
              onChange={(e) => {
                handleChangeName(e);
              }}
            />
            {questions.length > 0 && (
              <ul>
                {questions.map((question, index) => {
                  return (
                    <li key={index} className="modal-list-item">
                      <Link
                        className="my-anchor"
                        to={`/quiz/${quizID}/EditQuestions/${question.id}`}
                      >
                        {question.questionText}
                      </Link>
                      <Button
                        color="danger"
                        onClick={() => {
                          handleClickDelete(question.id);
                        }}
                      >
                        Delete
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="add-question">
              <Input
                placeholder="Type Your Question Here..."
                value={newQuestion}
                onChange={(e) => {
                  handleTypeNewQuestion(e);
                }}
              />
              <Button
                color="warning"
                onClick={() => {
                  handleClickAdd();
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleClickEdit()}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BtnEdit;
