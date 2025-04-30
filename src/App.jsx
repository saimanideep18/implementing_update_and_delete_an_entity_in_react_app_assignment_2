import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";

const API_URI = https://${import.meta.env.VITE_API_URI}/doors;

function App() {
  const [items, setItems] = useState([]);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return <ItemList items={items} setItems={setItems} />;
}

export default App;