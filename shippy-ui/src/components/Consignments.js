import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ContainerTable from "./ContainerTable";

function Consignments(props) {
  return (
    <Container className="Consignment-list">
      <h4>Consignments</h4>
      {props.consignments.map((c) => (
        <Card
          className="mb-2"
          style={{
            backgroundColor: "rgba(40, 44, 52, 0.07)",
            marginBottom: ".5rem",
          }}
          text="black"
          key={c.id}
        >
          <Card.Header>Consignment</Card.Header>
          <Card.Body>
            <Card.Text>{c.description}</Card.Text>
            <p>Weight: {c.weight}</p>
            <Card.Link
              href={"/shippy.service.vessel/vesselService/get?id=" + c.vessel_id}>
              Vessel: {c.vessel_id}
            </Card.Link>
            {c.containers && c.containers.length > 0 ? (
              <ContainerTable containers={c.containers} />
            ) : (
              false
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Consignments;
