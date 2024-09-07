export default function Stats({ items }) {
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