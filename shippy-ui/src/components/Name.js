import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

function Name(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="name">Name</FormLabel>
      <FormControl id="name" type="text" placeholder="Name"
        value={props.email}
        onChange={props.onChange}
      />
    </FormGroup>
  );
}

export default Name;
