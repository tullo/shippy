import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

function ContainerTable(props) {
  return (
    <Container className="Containers">
    <h5>Containers</h5>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Customer</th>
          <th>User</th>
          <th>Origin</th>
        </tr>
      </thead>
      <tbody>
        {props.containers.map((c) => (
          <tr key={c.id}>
            <td>{c.customer_id}</td>
            <td>{c.user_id}</td>
            <td>{c.origin}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
  );
}

export default ContainerTable;
