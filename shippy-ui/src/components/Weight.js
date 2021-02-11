import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

function Weight(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="weight">Weight</FormLabel>
      <FormControl id="weight" type="number" placeholder="55000"
        value={props.value}
        onChange={props.onChange} />
    </FormGroup>
  );
}

export default Weight;
