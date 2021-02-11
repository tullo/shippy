import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Email from "./Email";
import Password from "./Password";

function Login(props) {
  return (
    <Container className="Login">
      <Form onSubmit={props.onSubmit}>
        <Email email={props.email} onChange={props.onChangeEmail} />
        <Password password={props.password} onChange={props.onChangePassword} />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
