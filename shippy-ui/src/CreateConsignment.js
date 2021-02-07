import React from "react";
import _ from "lodash";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

class CreateConsignment extends React.Component {
  state = {
    created: false,
    description: "",
    weight: 0,
    containers: [
      { "customer_id": "cust001", "user_id": "user001", "origin": "Manchester, United Kingdom" },
      { "customer_id": "cust002", "user_id": "user001", "origin": "Derby, United Kingdom" },
      { "customer_id": "cust005", "user_id": "user001", "origin": "Sheffield, United Kingdom" }
    ],
    consignments: [],
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/shippy.service.consignment/shippingService/getConsignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((req) => req.json())
      .then((res) => {
        this.setState({
          consignments: res.consignments,
        });
      });
  }

  create = () => {
    const omitted = ["created", "consignments"]
    const consignment = this.state;
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/shippy.service.consignment/shippingService/createConsignment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(_.omit(consignment, [...omitted])),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          created: res.created,
          consignments: [...this.state.consignments, consignment],
        });
      });
  };

  addContainer = (e) => {
    this.setState({
      containers: [...this.state.containers, e.target.value],
    });
  };

  setDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  setWeight = (e) => {
    this.setState({
      weight: Number(e.target.value),
    });
  };

  render() {
    const { consignments } = this.state;
    return (
      <Container className="Consignments">
        <Container className="Consignment-form">
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" placeholder="This is a test consignment" rows={2}
              onChange={this.setDescription}>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Weight</FormLabel>
            <FormControl type="number" placeholder="55000"
              onChange={this.setWeight} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Containers</FormLabel>
            <FormControl type="text" placeholder="Add containers..." readOnly />
          </FormGroup>
          <Button onClick={this.create} className="btn btn-primary">Create</Button>
        </Container>
        {consignments && consignments.length > 0 ? (
          <Container className="Consignment-list">
            <h4>Consignments</h4>
            {consignments.map((item) => (
              <Card className="mb-2"
                style={{ backgroundColor: 'rgba(40, 44, 52, 0.07)', marginBottom: '.5rem' }}
                text='black'
                key={Math.random().toString(36).substr(2, 9)}
              >
                <Card.Header>Consignment {item.id}:{Math.random().toString(36).substr(2, 9)}</Card.Header>
                <Card.Body>
                  <Card.Text>{item.description}</Card.Text>
                  <p>Weight: {item.weight}</p>
                  <Card.Link href={'/shippy.service.vessel/vesselService/get?id=' + item.vessel_id}>Vessel: {item.vessel_id}</Card.Link>
                  {item.containers && item.containers.length > 0 ? (
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
                          {item.containers.map((item) => (
                            <tr key={Math.random().toString(36).substr(2, 9)}>
                              <td>{item.customer_id}</td>
                              <td>{item.user_id}</td>
                              <td>{item.origin}{Math.random().toString(36).substr(2, 9)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Container>
                  ) : (false)}
                </Card.Body>
              </Card>
            ))}
          </Container>
        ) : (
            false
          )}
      </Container>
    );
  }
}

export default CreateConsignment;
