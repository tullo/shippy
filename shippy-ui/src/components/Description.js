import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

function Description(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="desc">Description</FormLabel>
      <FormControl id="desc"
        as="textarea" placeholder="This is a test consignment" rows={2}
        value={props.value}
        onChange={props.onChange}
      />
    </FormGroup>
  );
}

export default Description;
