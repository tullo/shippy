import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

function Origin(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="origin">Origin</FormLabel>
      <FormControl id="origin" placeholder="Sheffield, United Kingdom"
        value={props.value} onChange={props.onChange} />
    </FormGroup>
  );
}

export default Origin;
