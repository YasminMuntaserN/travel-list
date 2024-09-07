import { useState } from "react";
import { Logo } from "./components/Logo.js";
import { Form } from "./components/Form.js";



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

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem ,onClearList }) {
  // State to keep track of the sorting method
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  // Sort items based on the selected sorting method
  if (sortBy === "input") sortedItems = items;

  // Sort by description alphabetically
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  // Sort by packed status (not packed first)
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));


  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        {/* Dropdown to select sorting method */}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
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