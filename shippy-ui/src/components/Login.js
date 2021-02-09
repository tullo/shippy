import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Email from "./Email";
import Password from "./Password";

class Login extends React.Component {
  render() {
    return (
      <Container className="Login">
        <Form>
          <Email />
          <Password />
          <Button onClick={this.login}>Login</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
