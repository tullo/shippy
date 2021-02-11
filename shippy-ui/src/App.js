import React from "react";
import Container from "react-bootstrap/Container";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateConsignment from "./components/CreateConsignment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      user: {
        authenticated: false,
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
    user.email= e.target.value
    this.setState({ user: user });
  };

  setPassword = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.password= e.target.value
    this.setState({ user: user });
  };

  setName = (e) => {
    e.preventDefault();
    console.log("setName"+e.target.value)
    const user = this.state.user;
    user.name= e.target.value
    this.setState({ user: user });
  };

  renderAuthenticated = () => {
    return (
      <CreateConsignment token={this.state.token} />
    );
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
    user.authenticated = true;
    console.log("signup",user)
    this.setState({ user: user });
    /*
    fetch(`http://localhost:8080/shippy.service.user/userService/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: {
          email: user.email,
          password: user.password,
          name: user.name,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        user.token = res.token.token;
        user.authenticated = true;
        this.setState({ user: user });
        localStorage.setItem("token", res.token.token);
      })
      .catch((err) => this.setState({ err, authenticated: false }));
      */
  };

  login = (e) => {
    e.preventDefault();
    const user = this.state.user;
    user.authenticated = true;
    console.log("login",user)
    this.setState({ user: user });
    /*
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
    */
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
        <Login email={this.state.user.email} password={this.state.user.password}
          onSubmit={this.handleLogin}
          onChangeEmail={this.setEmail} 
          onChangePassword={this.setPassword}/>
        <Signup name={this.state.user.name} email={this.state.user.email} password={this.state.user.password}
          onSubmit={this.handleSignup}
          onChangeName={this.setName} 
          onChangeEmail={this.setEmail} 
          onChangePassword={this.setPassword}
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
