import { useState } from "react";
import { Item } from "./components/Item.js";

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