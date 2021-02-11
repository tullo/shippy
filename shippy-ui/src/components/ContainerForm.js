import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import CustomerID from "./CustomerID";
import Origin from "./Origin";
import UserID from "./UserID";

function ContainerForm(props) {
  return (
    <Container className="Login">
      <Form inline='true' onSubmit={props.onSubmit}>
        <CustomerID onChange={props.onChange} value={props.customerId} />
        <UserID onChange={props.onChange} value={props.userId} />
        <Origin onChange={props.onChange} value={props.origin} />
        <Button type='submit' variant="success">Add</Button>
      </Form>
    </Container>
  );
}

export default ContainerForm;
