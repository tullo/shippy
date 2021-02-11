import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
function Email(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="email">Email</FormLabel>
      <FormControl id="email" type="email" placeholder="inbox@company.com"
        value={props.email}
        onChange={props.onChange}
      />
    </FormGroup>
  );
}

export default Email;
