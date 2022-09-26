import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import BtnDelete from "./BtnDelete";
import BtnEdit from "./BtnEdit";
import BtnSubmit from "./BtnSubmit";
import { Button } from "reactstrap";
class Quizzes extends Component {
  state = {
    quizzes: [],
    modal: false,
    quizName: "",
    submitted: false
  };
  // Lifecycle methods
  componentDidMount() {
    axios
      .get("https://632803c09a053ff9aaae7001.mockapi.io/quizzes")
      .then((res) => {
        this.setState({ quizzes: res.data });
      })
      .catch((err) => console.error("something went wrong: " + err));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.submitted !== this.state.submitted) {
      axios
        .get("https://632803c09a053ff9aaae7001.mockapi.io/quizzes")
        .then((res) => {
          this.setState({ quizzes: res.data });
        })
        .catch((err) => console.error("something went wrong: " + err));
    }
  }
  // Functions
  //open and close Modal
  toggle = () => {
    this.setState((prevState) => {
      return {
        modal: !prevState.modal
      };
    });
  };
  //type new Quiz Name
  handleChange = (e) => {
    const inputValue = e.target.value;
    this.setState({
      quizName: inputValue
    });
  };
  // add a new Quiz Name to API
  handleSubmit = () => {
    const { quizName } = this.state;
    if (quizName) {
      const name = quizName;
      axios.post(`https://632803c09a053ff9aaae7001.mockapi.io/quizzes`, {
        name
      });
      setTimeout(() => {
        this.setState((prevState) => {
          return {
            modal: !prevState.modal,
            quizName: "",
            submitted: !prevState.submitted
          };
        });
      }, 1000);
    }
  };
  // delete a new Quiz Name from API
  handleDelete = (quizID) => {
    axios.delete(
      `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizID}`
    );
    setTimeout(() => {
      this.setState((prevState) => {
        return {
          submitted: !prevState.submitted
        };
      });
    }, 1000);
  };
  // edit a Quiz Name
  handleEdit = (quizID, quizName) => {
    if (quizName) {
      const name = quizName;
      axios.put(
        `https://632803c09a053ff9aaae7001.mockapi.io/quizzes/${quizID}`,
        {
          name
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
  render() {
    const { quizzes } = this.state;
    return (
      <div className="app">
        <h2 className="greeting">Hello, {this.props.userName}!</h2>
        <h1>Quizzes</h1>
        <ul>
          {quizzes.map((quiz, index) => {
            return (
              <li key={index} className="list-item mb-3">
                <Link className="my-anchor" to={`/questions/${quiz.id}`}>
                  {quiz.name}
                </Link>
                <div className="buttons-group">
                  <BtnEdit
                    quizname={quiz.name}
                    quizID={quiz.id}
                    text="Edit"
                    handleClick={this.handleEdit}
                    handleChange={this.handleChange}
                  />
                  <BtnDelete
                    quizID={quiz.id}
                    text="Delete"
                    handleClick={this.handleDelete}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div className="footer">
          <BtnSubmit
            quizname={this.state.quizName}
            modal={this.state.modal}
            text="Create a Quiz"
            toggle={this.toggle}
            handleChange={this.handleChange}
            handleClick={this.handleSubmit}
          />
          <Button onClick={this.props.handleLogout}>Logout</Button>
        </div>
      </div>
    );
  }
}
export default Quizzes;

// HW Sep 30, 2022

// 1. Add an ability to add new quiz
//    POST https://6324f8454cd1a2834c37ee19.mockapi.io/quizes
//    {
//       name: "some name"
//    }
// 2. Add an ability to add new questions with answers
//    POST https://6324f8454cd1a2834c37ee19.mockapi.io/quizes/1/questions
//    {
//       questionText: "some name",
//       quizId: "" ?,
//    }
//    try sending answerOptions to create answers instead

//    POST https://6324f8454cd1a2834c37ee19.mockapi.io/quizes/1/questions/1/answers
//    {
//       answerText: "",
//       isCorrect: true or false,
//    }
// 3. (Bonus) Add an ability to update and delete quizzes/questions/answers
// 4. (Bonus) Add an ability to login
