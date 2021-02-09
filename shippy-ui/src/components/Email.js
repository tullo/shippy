import React from "react";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

class Email extends React.Component {
  render() {
    return (
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <FormControl
          type="email"
          placeholder="inbox@company.com"
          onChange={this.setEmail}
        />
      </FormGroup>
    );
  }
}

export default Email;
