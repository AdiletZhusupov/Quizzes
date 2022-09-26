import { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

class Login extends Component {
  render() {
    return (
      <div className="login">
        {this.props.fieldsEmpty && (
          <div className="error">Please fill the required fields first!</div>
        )}
        {this.props.userNotFound && (
          <div className="error">User not found in our system!</div>
        )}
        <Form onSubmit={this.props.handleFormSubmit}>
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          <Button>Submit</Button>
        </Form>
        <h6 className="important-info mt-3">
          *Please find the users' info in <strong>"Users/users.js"</strong>
        </h6>
      </div>
    );
  }
}
export default Login;
