import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";

function CustomerID(props) {
  return (
    <FormGroup>
      <FormLabel htmlFor="customer-id">Customer ID</FormLabel>
      <FormControl id="customer-id" placeholder="cust001" value={props.value} onChange={props.onChange}/>
    </FormGroup>
  );
}

export default CustomerID;
