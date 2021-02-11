import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Email from "./Email";
import Name from "./Name";
import Password from "./Password";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = props.onSubmit;
  }

  render() {
    return (
      <Container className="Signup">
        <Form onSubmit={this.handleSubmit}>
          <Name />
          <Email />
          <Password />
          <Button type="submit">Signup</Button>
        </Form>
      </Container>
    );
  }
}

export default Signup;
