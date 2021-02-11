import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Email from "./Email";
import Name from "./Name";
import Password from "./Password";

function Signup(props) {
  return (
    <Container className="Signup">
      <Form onSubmit={props.onSubmit}>
        <Name name={props.name} onChange={props.onChangeName} />
        <Email email={props.email} onChange={props.onChangeEmail} />
        <Password password={props.password} onChange={props.onChangePassword} />
        <Button type="submit">Signup</Button>
      </Form>
    </Container>
  );
}

export default Signup;
