import React from "react";
import CreateConsignment from "./CreateConsignment";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
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
      <Container className="Login-Signup">
        <Container className="Login">
          <Form>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl type="email" placeholder="inbox@company.com" onChange={this.setEmail} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl type="password" placeholder="password" onChange={this.setPassword} />
            </FormGroup>
            <Button onClick={this.login}>Login</Button>
          </Form>
        </Container>
        <Container className="Signup">
          <Form>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl type="text" placeholder="Name" onChange={this.setName} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl type="email" placeholder="inbox@company.com" onChange={this.setEmail} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl type="password" placeholder="password" onChange={this.setPassword} />
            </FormGroup>
            <Button onClick={this.signup}>Login</Button>
          </Form>
        </Container>
      </Container>
    );
  };

  render() {
    return (
      <Container className="App">
        <Container className="App-header">
          <h2>Shippy</h2>
        </Container>
        <Container className="App-body">
          {this.state.authenticated
            ? this.renderAuthenticated()
            : this.renderLogin()}
        </Container>
      </Container>
    );
  }
}

export default App;
