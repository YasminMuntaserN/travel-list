import { useState } from "react";
import  Logo  from "./components/Logo.js";
import  Form  from "./components/Form.js";
import PackingList  from "./components/PackingList.js";
import  Stats  from "./components/Stats.js";



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
