import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from 'uuid';
import { createConsignment, getConsignments } from "../services/ConsignmentService";
import Consignments from "./Consignments";
import ContainerForm from "./ContainerForm";
import ContainerTable from "./ContainerTable";
import Description from "./Description";
import Weight from "./Weight";

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
    err: ""
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

  isEmptyObject(value) {
    return Object.keys(value).length === 0 && value.constructor === Object;
  }
  
  componentDidMount() {
    getConsignments(this.props.token).then((res) => {
      if (this.isEmptyObject(res)) {
        return
      }
      else if (res.consignments) {
        res.consignments.forEach(function (consignment) {
          consignment.containers.forEach(function (container) {
            if (container.id === undefined || container.id === 0) container.id = uuidv4();
          });
        });
        this.setState({ consignments: res.consignments, err: "" });
      } else {
        this.setState({ err: res.detail });
        const msg = "consignment retrieval failed ==> error code ("
          + res.code + ") '" + res.detail + "'";
        console.error(msg);
      }
    });
  }

  create = (e) => {
    e.preventDefault();

    // omit filters specified keys from object argument.
    const omit = (keys, obj) => Object.fromEntries(
      Object.entries(obj).filter(([k]) => !keys.includes(k))
    );
    const { consignments, containers, consignment } = this.state;
 
    if ( containers.length === 0 ||
      consignment.description.length === 0 ||
      consignment.weight === 0
    ) {
      console.warn("aborted consignment creation: ",
        "weight", consignment.weight,
        "description", consignment.description.length,
        "containers", containers.length
      );

      return;
    }

    consignment.id = uuidv4();
    consignment.containers = [...containers];

    // filter out created property.
    const filteredConsignment = omit(["created", "id"], consignment);
    const payload = { ...filteredConsignment, containers };

    createConsignment(this.props.token, payload).then((res) => {
      if (res.created) {
        this.resetState([...consignments, res.consignment]);
      } else {
        this.setState({ err: res.detail });
        const msg = "consignment creation failed ==> error code ("
          + res.code + ") '" + res.detail + "'";
        console.error(msg);
      }
    });
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
          <ContainerTable containers={this.state.containers} />
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
