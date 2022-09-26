import { Component } from "react";
import App2 from "./App2";
import Login from "./components/Login/Login";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      userName: "",
      userNotFound: false,
      fieldsEmpty: false
    };
  }
  componentDidMount() {
    const sessionStorageToken = sessionStorage.getItem("token");
    const sessionStorageUser = sessionStorage.getItem("user");

    if (sessionStorageToken && sessionStorageUser) {
      this.setState({
        token: sessionStorageToken,
        userName: sessionStorageUser
      });
    }
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;
    const credentials = {
      email: emailValue,
      password: passwordValue
    };
    if (emailValue && passwordValue) {
      this.authenticateUser(credentials);
    } else {
      this.setState({ fieldsEmpty: true });
      setTimeout(() => {
        this.setState({ fieldsEmpty: false });
      }, 3000);
    }
  };
  authenticateUser = async (creds) => {
    const { email, password } = creds;
    const url = "https://63307ee6f5fda801f8e1cf95.mockapi.io/api/v1/users";
    const resp = await fetch(url);
    const data = await resp.json();
    const user = data.find(
      (userInfo) => userInfo.email === email && userInfo.password === password
    );
    if (user) {
      const generatedToken = uuidv4();
      sessionStorage.setItem("token", generatedToken);
      sessionStorage.setItem("user", user.fname);
      this.setState({ token: generatedToken, userName: user.fname });
    } else {
      this.setState({ userNotFound: true });
      setTimeout(() => {
        this.setState({ userNotFound: false });
      }, 3000);
    }
  };
  handleLogout = () => {
    sessionStorage.clear();
    this.setState({
      token: null,
      userName: ""
    });
  };
  // console.log()
  render() {
    const { token, fieldsEmpty, userNotFound, userName } = this.state;
    return (
      <div className="App">
        {token ? (
          <App2 userName={userName} handleLogout={this.handleLogout} />
        ) : (
          <Login
            handleFormSubmit={this.handleFormSubmit}
            userNotFound={userNotFound}
            fieldsEmpty={fieldsEmpty}
          />
        )}
      </div>
    );
  }
}
export default App;
