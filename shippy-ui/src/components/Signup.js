import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Email from "./Email";
import Name from "./Name";
import Password from "./Password";

class Signup extends React.Component {
  render() {
    return (
      <Container className="Login">
        <Form>
          <Name />
          <Email/>
          <Password />
          <Button onClick={this.login}>Login</Button>
        </Form>
      </Container>
    );
  }
}

export default Signup;
