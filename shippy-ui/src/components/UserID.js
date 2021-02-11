import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

function UserID(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="user-id">User ID</FormLabel>
      <FormControl id="user-id" placeholder="user001" value={props.value} onChange={props.onChange} />
    </FormGroup>
  );
}

export default UserID;
