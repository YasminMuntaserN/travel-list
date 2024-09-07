import { useState } from "react";
import { Logo } from "./components/Logo.js";
import { Form } from "./components/Form.js";
import { PackingList } from "./components/PackingList.js";


export default function App() {
  // State for managing the list of items
  const [items, setItems] = useState([]);

  // Add a new item to the list
  function handleAddItem(newItem) {
    setItems(items => [...items, newItem]);
  }

  // Delete an item by id
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  // Toggle the 'packed' status of an item
  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    // Display a confirmation dialog to the user
    const confirmed = window.confirm('Are you sure you want to clear the list?');
    
    // If the user confirms, clear the list by setting items to an empty array
    if (confirmed) setItems([]);
  }
  
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList ={handleClearList}
      />
      <Stats items={items}  />
    </div>
  );
}





function Stats({ items }) {
  // Display a message if there are no items
  if (items.length === 0) {
    return (
      <div className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </div>
    );
  }

  const itemsNum = items.length; // Total number of items
  const packedItem = items.filter(item => item.packed).length; // Number of packed items
  const percentage = Math.round((packedItem / itemsNum) * 100); // Calculate percentage of packed items

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everything! Ready to go ✈️</em>
      ) : (
        <em>
          👜 You have {itemsNum} items on your list, and you already packed{" "}
          {packedItem} ({percentage}%)
        </em>
      )}
    </footer>
  );
}