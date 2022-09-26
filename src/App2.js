import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Quizzes from "./components/Quizzes/Quizzes";
import Questions from "./components/Quizzes/Questions";
import EditQuestions from "./components/Quizzes/EditQuestions";

export default function App2(props) {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Quizzes
              userName={props.userName}
              handleLogout={props.handleLogout}
            />
          )}
        ></Route>
        <Route exact path="/questions/:id" component={Questions}></Route>
        <Route
          exact
          path="/quiz/:id/EditQuestions/:id"
          component={EditQuestions}
        ></Route>
      </Switch>
    </Router>
  );
}

//component={() => <App myProp={someValue}/>}  ---> use this to pass props
