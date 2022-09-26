import axios from "axios";
import { Component } from "react";
import { Input, Button, Form } from "reactstrap";
import { Link } from "react-router-dom";
class EditQuestions extends Component {
  state = {
    question: "",
    questionValue: "",
    submitted: false,
    answers: [],
    answerText: "",
    changedBoolean: false,
    addedText: "",
    addedBoolean: false
  };

  // Lifecycle methods
  componentDidMount() {
    const quizNumber = this.getQuizNum();
    axios
      .get(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({
          question: res.data.questionText,
          questionValue: res.data.questionText
        });
      })
      .catch((err) => console.log(err.message));
    axios
      .get(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}/answers`
      )
      .then((res) => {
        this.setState({
          answers: res.data
        });
      })
      .catch((err) => console.log(err.message));
  }
  componentDidUpdate(prevProps, prevState) {
    const quizNumber = this.getQuizNum();
    if (prevState.submitted !== this.state.submitted) {
      axios
        .get(
          `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}`
        )
        .then((res) => {
          this.setState({
            question: res.data.questionText,
            questionValue: res.data.questionText
          });
        })
        .catch((err) => console.error("something went wrong: " + err));
      axios
        .get(
          `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}/answers`
        )
        .then((res) => {
          this.setState({
            answers: res.data
          });
        })
        .catch((err) => console.log(err.message));
    }
  }

  // Functions
  //returns Quiz id
  getQuizNum = () => {
    const str = this.props.match.url;
    const index = str.search(/[0-9]/);
    const firstNum = Number(str[index]);
    return firstNum;
  };
  // type and change Question
  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ questionValue: inputValue });
  };
  //update Question in API
  handleClick = () => {
    const { questionValue } = this.state;
    if (questionValue) {
      const questionText = questionValue;
      const quizNumber = this.getQuizNum();
      axios.put(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}`,
        {
          questionText
        }
      );
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            submitted: !prevState.submitted
          };
        });
      }, 1000);
    }
  };
  //type and change Answer Text
  handleAnswerText = (e, id) => {
    const inputValue = e.target.value;
    this.setState({
      answerText: inputValue,
      textID: id
    });
  };
  //select and change whether Answer is True or False
  handleIsCorrect = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "true") {
      this.setState({ changedBoolean: true });
    } else {
      this.setState({ changedBoolean: false });
    }
  };
  //update Answer in API
  handleClickAnswer = (e, id) => {
    e.preventDefault();
    const { answerText, changedBoolean } = this.state;
    const quizNumber = this.getQuizNum();
    const isCorrect = changedBoolean;
    axios.put(
      `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}/answers/${id}`,
      {
        answerText,
        isCorrect
      }
    );
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          submitted: !prevState.submitted,
          answerText: "",
          changedBoolean: false
        };
      });
      alert("Answer updated");
    }, 1000);
  };
  //add New Answer Text
  handleAddText = (e) => {
    const inputValue = e.target.value;
    this.setState({ addedText: inputValue });
  };
  //select and choose True or False for New Answer
  handleBooleanAnswer = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "true") {
      this.setState({ addedBoolean: true });
    } else {
      this.setState({ addedBoolean: false });
    }
  };
  //add New Answer to API
  handleClickCreateNewAnswer = (e) => {
    e.preventDefault();
    const { addedText, addedBoolean } = this.state;
    const quizNumber = this.getQuizNum();
    const answerText = addedText;
    const isCorrect = addedBoolean;
    if (addedText) {
      axios.post(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}/answers`,
        {
          answerText,
          isCorrect
        }
      );
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            submitted: !prevState.submitted,
            addedText: "",
            addedBoolean: false
          };
        });
      }, 1000);
    }
  };
  //delete Answer
  handleClickDelete = (id) => {
    const quizNumber = this.getQuizNum();
    axios.delete(
      `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizNumber}/questions/${this.props.match.params.id}/answers/${id}`
    );
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          submitted: !prevState.submitted
        };
      });
    }, 1000);
  };
  render() {
    const id = this.props.match.params.id;
    const quizID = this.getQuizNum();
    const { answers, questionValue, addedBoolean } = this.state;
    return (
      <div className="edit-div">
        <h1>
          Quiz {quizID} Question {id}
        </h1>
        <div className="question-text-wrapper">
          <Input
            value={questionValue}
            onChange={(e) => {
              this.handleChange(e);
            }}
          ></Input>
          <Button
            color="primary"
            onClick={() => {
              this.handleClick();
            }}
          >
            Change
          </Button>
        </div>
        <div className="inputs-wrapper">
          {answers.map((answer, index) => {
            //updating
            return (
              <Form
                key={index}
                className="answer-wrapper"
                onSubmit={(e) => {
                  this.handleClickAnswer(e, answer.id);
                }}
              >
                <Input
                  onChange={(e) => {
                    this.handleAnswerText(e, answer.id);
                  }}
                  defaultValue={answer.answerText}
                ></Input>
                <Input
                  className="mb-5"
                  type="select"
                  defaultValue={answer.isCorrect}
                  onChange={(e) => {
                    this.handleIsCorrect(e);
                  }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Input>
                <div className="question-btns">
                  <Button color="primary">Change</Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      this.handleClickDelete(answer.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Form>
            );
          })}
          {answers.length < 3 && (
            //adding
            <Form
              className="answer-wrapper"
              onSubmit={(e) => {
                this.handleClickCreateNewAnswer(e);
              }}
            >
              <Input
                value={this.state.addedText}
                onChange={(e) => {
                  this.handleAddText(e);
                }}
              ></Input>
              <Input
                className="mb-5"
                value={addedBoolean}
                type="select"
                onChange={(e) => {
                  this.handleBooleanAnswer(e);
                }}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </Input>
              <Button color="info">Add</Button>
            </Form>
          )}
        </div>
        <div className="btn-group">
          <Button type="button" color="warning">
            <Link className="main-page-btn" to="/">
              Main page
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default EditQuestions;
