import React, { useState } from "react";
import Item from "./Item";

const ItemList = ({ items, setItems }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleDelete = async (id) => {
    const deleteUrl = https://${import.meta.env.VITE_API_URI}/doors/${id};
    try {
      const response = await fetch(deleteUrl, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditedName(item.name);
  };

  const handleSaveEdit = async () => {
    const editUrl = https://${import.meta.env.VITE_API_URI}/doors/${editingItem.id};
    try {
      const response = await fetch(editUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingItem, name: editedName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setEditingItem(null);
      setEditedName("");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditedName("");
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>

      {editingItem && (
        <div>
          <h3>Edit Item</h3>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ItemList;