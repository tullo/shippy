function ContainerList(props) {
  return (
    <ul>
      {props.containers.map((container) => (
        <li key={container.id}>
          Customer:{container.customer_id}, User:{container.user_id}, Origin:
          {container.origin}
        </li>
      ))}
    </ul>
  );
}

export default ContainerList;
