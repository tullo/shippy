import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Email from "./Email";
import Password from "./Password";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = props.onSubmit
 }    

  render() {
    return (
      <Container className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Email />
          <Password />
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
