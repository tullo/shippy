import React from "react";
import _ from "lodash";

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
      <div className="consignment-screen">
        <div className="consignment-form container">
          <br />
          <div className="form-group">
            <textarea
              onChange={this.setDescription}
              className="form-control"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="form-group">
            <input
              onChange={this.setWeight}
              type="number"
              placeholder="Weight"
              className="form-control"
            />
          </div>
          <div className="form-control">Add containers...</div>
          <br />
          <button onClick={this.create} className="btn btn-primary">
            Create
          </button>
          <br />
          <hr />
        </div>
        {consignments && consignments.length > 0 ? (
          <div className="consignment-list">
            <h2>Consignments</h2>
            {consignments.map((item) => (
              <div key={Math.random().toString(36).substr(2, 9)}>
                <p>Vessel id: {item.vessel_id}</p>
                <p>Consignment id: {item.id}</p>
                <p>Description: {item.description}</p>
                <p>Weight: {item.weight}</p>
                <hr />
              </div>
            ))}
          </div>
        ) : (
            false
          )}
      </div>
    );
  }
}

export default CreateConsignment;
