const Item = ({ item, onDelete, onEdit }) => {
    return (
      <li>
        {item.name}{" "}
        <button onClick={() => onDelete(item.id)}>Delete</button>
        <button onClick={() => onEdit(item)}>Edit</button>
      </li>
    );
  };
  
  export default Item;