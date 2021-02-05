import React from "react";
import CreateConsignment from "./CreateConsignment";
import "./App.css";

class App extends React.Component {
  state = {
    authenticated: false,
    email: "",
    password: "",
    err: "",
  };

  setEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  setPassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  renderAuthenticated = () => {
    return <CreateConsignment token={this.state.token} />;
  };

  setToken = (token) => {
    localStorage.setItem("token", token);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  signup = () => {
    fetch(`http://localhost:8080/shippy.service.user/userService/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          token: res.token.token,
          authenticated: true,
        });
        localStorage.setItem("token", res.token.token);
      })
      .catch((err) => this.setState({ err, authenticated: false }));
  };

  login = () => {
    fetch(`http://localhost:8080/shippy.service.user/userService/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          token: res.token,
          authenticated: true,
        });
      })
      .catch((err) => this.setState({ err, authenticated: false }));
  };

  isAuthenticated = () => {
    return this.state.token || this.getToken() || false;
  };

  renderLogin = () => {
    return (
      <div className="App-intro container">
        <br />
        <div className="Login">
          <div className="form-group">
            <input
              type="email"
              onChange={this.setEmail}
              placeholder="E-Mail"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={this.setPassword}
              placeholder="Password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" onClick={this.login}>
            Login
          </button>
          <br />
          <br />
        </div>
        <div className="Sign-up">
          <div className="form-group">
            <input
              type="input"
              onChange={this.setName}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={this.setEmail}
              placeholder="E-Mail"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={this.setPassword}
              placeholder="Password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" onClick={this.signup}>
            Sign-up
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Shippy</h2>
        </div>
        <div>
          {this.state.authenticated
            ? this.renderAuthenticated()
            : this.renderLogin()}
        </div>
      </div>
    );
  }
}

export default App;
