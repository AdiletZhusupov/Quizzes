import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Questions extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    showScore: false,
    score: 0
  };
  // Lifecycle methods
  componentDidMount() {
    axios
      .get(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${this.props.match.params.id}/questions`
      )
      .then((res) => {
        this.setState({ questions: res.data });
      })
      .catch((err) => console.log(err.message));
  }
  //Functions
  // count Correct answers and control the flow of the Quiz
  handleAnswerClick = (isCorrect) => {
    if (isCorrect === true) {
      this.setState((prevState) => {
        return { score: prevState.score + 1 };
      });
    }
    const nextQuestion = this.state.currentQuestion + 1;
    if (nextQuestion < this.state.questions.length) {
      this.setState({ currentQuestion: nextQuestion });
    } else {
      this.setState({ showScore: true });
    }
  };
  render() {
    const { questions, currentQuestion, showScore, score } = this.state;
    return (
      <div className="app">
        {questions.length === 0 || questions === undefined ? (
          <h3 style={{ color: "white" }}>Loading...</h3>
        ) : showScore ? (
          <div className="answer-section">
            <div className="result-wrapper">
              <span>
                You scored {score} out of {questions.length}
              </span>
              <Button type="button" color="warning">
                <Link className="main-page-btn" to="/">
                  Main page
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>
                  Question {currentQuestion + 1}/{questions.length}
                </span>
                <Button type="button" color="warning">
                  <Link className="main-page-btn" to="/">
                    Main page
                  </Link>
                </Button>
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answer, index) => {
                return (
                  <div key={index}>
                    <button
                      className="my-button"
                      onClick={() => this.handleAnswerClick(answer.isCorrect)}
                    >
                      {answer.answerText}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Questions;
