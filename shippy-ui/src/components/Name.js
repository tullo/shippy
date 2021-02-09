import React from "react";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

class Name extends React.Component {
  render() {
    return (
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <FormControl type="text" placeholder="Name" onChange={this.setName} />
      </FormGroup>
    );
  }
}

export default Name;
