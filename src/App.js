import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => 1 + i).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({items}) {
    if(items.length === 0){
      return(<div className="stats">
        <em>
            start adding some items to your packing list 🚀
        </em>
        </div>) 
  }
  const itemsNum = items.length;
  const packedItem = items.filter(item => item.packed).length;
  const percentage = Math.round((packedItem /itemsNum) *100);
  return (
    <footer className="stats">
      {
      percentage === 100 ?
      (<em>
        You got everything ! Ready to go ✈️
      </em>)
      :
      (<em>
        👜 You have {itemsNum} items on your list, and you already packed {packedItem} ({percentage}%)
      </em>) 
      }
    </footer>
  );
}
