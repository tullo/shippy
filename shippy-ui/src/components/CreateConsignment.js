import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Consignments from "./Consignments";
import ContainerForm from "./ContainerForm";
import ContainerList from "./ContainerList";
import Description from "./Description";
import Weight from "./Weight";
import { v4 as uuidv4 } from 'uuid';

class CreateConsignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleContainerChange = this.handleContainerChange.bind(this);
    this.handleContainerSubmit = this.handleContainerSubmit.bind(this);
  }

  getInitialState = () => ({
    containers: [],
    container: {
      customer_id: "",
      user_id: "",
      origin: "",
    },
    consignment: {
      containers: [],
      created: false,
      description: "",
      weight: 55000,
    },
    consignments: [],
  });

  resetState = (consignments) => {
    let state = this.getInitialState();
    state.consignments = consignments;
    this.setState(state);
  };

  handleContainerChange(e) {
    e.preventDefault();
    const container = this.state.container;
    if (e.target.id === "customer-id") {
      container.customer_id = e.target.value;
      this.setState({
        container: container,
      });
    }
    if (e.target.id === "user-id") {
      container.user_id = e.target.value;
      this.setState({
        container: container,
      });
    }
    if (e.target.id === "origin") {
      container.origin = e.target.value;
      this.setState({
        container: container,
      });
    }
  }

  handleContainerSubmit(e) {
    e.preventDefault();
    if (
      this.state.container.customer_id.length === 0 ||
      this.state.container.user_id.length === 0 ||
      this.state.container.origin.length === 0
    ) {
      return;
    }

    const container = this.state.container;
    const newItem = {
      id: uuidv4(),
      customer_id: container.customer_id,
      user_id: container.user_id,
      origin: container.origin,
    };

    container.customer_id = "";
    container.user_id = "";
    container.origin = "";

    this.setState((state) => ({
      containers: [...state.containers, newItem],
      container: container,
    }));
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    /*
    fetch(
      `http://localhost:8080/shippy.service.consignment/shippingService/getConsignments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    )
      .then((req) => req.json())
      .then((res) => {
        this.setState({
          consignments: res.consignments,
        });
      });
    */
  }

  create = (e) => {
    e.preventDefault();
    // omit filters specified keys from object argument.
    const omit = (keys, obj) =>
      Object.fromEntries(
        Object.entries(obj).filter(([k]) => !keys.includes(k))
      );
    const { consignments, containers, consignment } = this.state;
    const token = localStorage.getItem("token");
    // TODO remove me
    const jwt = token ? token : "xyz";
    if (
      containers.length === 0 ||
      consignment.description.length === 0 ||
      consignment.weight === 0 ||
      jwt.length === 0
    ) {
      console.log(
        "aborted create: ",
        "weight",
        consignment.weight,
        "description",
        consignment.description.length,
        "description",
        containers.length
      );

      return;
    }

    consignment.id = uuidv4();
    consignment.containers = [...containers];
    // filter out created property.
    const filteredConsignment = omit(["created","id"], consignment);
    const payload = { ...filteredConsignment, containers };
    this.resetState([...consignments, consignment]);

    // console.log("payload", JSON.stringify(payload));

    /*
    fetch(
      `http://localhost:8080/shippy.service.consignment/shippingService/createConsignment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(_.omit(consignment, [...omitted])),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          created: res.created,
          consignments: [...this.state.consignments, consignment],
        });
      });
    */
  };

  setDescription = (e) => {
    e.preventDefault();
    const consignment = this.state.consignment;
    consignment.description = e.target.value;
    this.setState({
      consignment: consignment,
    });
  };

  setWeight = (e) => {
    e.preventDefault();
    const consignment = this.state.consignment;
    consignment.weight = e.target.value;
    this.setState({
      consignment: consignment,
    });
  };

  render() {
    const { consignments } = this.state;
    return (
      <Container className="Consignments">
        <Container className="Consignment-form">
          <Description
            value={this.state.consignment.description}
            onChange={this.setDescription}
          />
          <Weight
            value={this.state.consignment.weight}
            onChange={this.setWeight}
          />
          <h5>Containers</h5>
          {<ContainerList containers={this.state.containers} />}
          <ContainerForm
            customerId={this.state.container.customer_id}
            origin={this.state.container.origin}
            userId={this.state.container.user_id}
            onChange={this.handleContainerChange}
            onSubmit={this.handleContainerSubmit}
          ></ContainerForm>
          <Button onClick={this.create}>Create</Button>
        </Container>
        {consignments && consignments.length > 0 ? 
          (<Consignments consignments={consignments} />) : (false)}
      </Container>
    );
  }
}

export default CreateConsignment;
