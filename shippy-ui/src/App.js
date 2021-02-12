import React from "react";
import Container from "react-bootstrap/Container";
import "./App.css";
import CreateConsignment from "./components/CreateConsignment";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { loginUser, signupUser } from "./services/UserSerice.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      user: {
        authenticated: false,
        name: "",
        email: "",
        password: "",
      },
    };
    this.handleLogin = this.login.bind(this);
    this.handleSignup = this.signup.bind(this);
  }

  setEmail = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.email = e.target.value;
    this.setState({ user: user });
  };

  setPassword = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({ user: user });
  };

  setName = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.name = e.target.value;
    this.setState({ user: user });
  };

  renderAuthenticated = () => {
    return <CreateConsignment token={this.getToken()} />;
  };

  setToken = (token) => {
    localStorage.setItem("token", token);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  signup = (e) => {
    e.preventDefault();
    const user = this.state.user;
    let err = this.state.err;
    signupUser(user).then((res) => {
      if (res.user) {
        err = ""
        // TODO display login msg & logout button.
      } else {
        err = res.detail 
        const msg = "signup failed for '" + user.email +
          "', error code (" + res.code + ") '" + res.detail + "'";
        console.error(msg);
      }

      this.setState({ err: err, user: user });
    });
  };

  login = (e) => {
    e.preventDefault();
    const user = this.state.user;
    let err = this.state.err;
    loginUser(user).then((res) => {
      if (res.token) {
        user.authenticated = true;
        user.token = res.token;
        this.setToken(res.token);
      } else {
        user.authenticated = false;
        err = res.detail 
        const msg = "login failed for '" + user.email +
          "', error code (" + res.code + ") '" + res.detail + "'";
        console.error(msg);
      }

      this.setState({ err: err, user: user });
    });
  };

  isAuthenticated = () => {
    return (
      this.state.user.authenticated ||
      this.state.user.token ||
      this.state.user.token ||
      false
    );
  };

  renderLogin = () => {
    return (
      <Container className="Login-Signup">
        <Login
          email={this.state.user.email}
          password={this.state.user.password}
          onChangeEmail={this.setEmail}
          onChangePassword={this.setPassword}
          onSubmit={this.handleLogin}
        />
        <Signup
          name={this.state.user.name}
          email={this.state.user.email}
          password={this.state.user.password}
          onChangeName={this.setName}
          onChangeEmail={this.setEmail}
          onChangePassword={this.setPassword}
          onSubmit={this.handleSignup}
        />
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
          {this.isAuthenticated()
            ? this.renderAuthenticated()
            : this.renderLogin()}
        </Container>
      </Container>
    );
  }
}

export default App;
