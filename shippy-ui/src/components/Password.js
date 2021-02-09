import React from "react";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

class Password extends React.Component {
  render() {
    return (
      <FormGroup>
        <FormLabel>Password</FormLabel>
        <FormControl
          type="password"
          onChange={this.setPassword}
        />
      </FormGroup>
    );
  }
}

export default Password;
