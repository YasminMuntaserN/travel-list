const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },

];

export default function App(){
  return(
    <div className="App">
    <Logo/>
    <Form/>
    <PackingList/>
    <Stats/>
    </div>
  );

}

function Logo()
{
  return(
      <h1>🌴 Far Away 👜</h1>
  );
}

function Form()
{
  return(
    <form className="add-form">
      <h3> What do you need for your trip ? </h3>
      <select>
        {
        Array.from({length:20} ,(_,i) =>1 + i).map(
          num =><option value={num} key={num}>{num}</option>
        )
        }

      </select>

      <input type="text" placeholder="Item..."/>
      <button>Add</button>
    </form>
  )
}

function Item({item}){
  return(
    <li>
        <span style={item.packed ? {textDecoration: "line-through"} :{}}>{item.quantity}{item.description}</span>
        <button>❌</button>
    </li>
  )
}

function PackingList()
{
  return (
    <div className="list"> 
        <ul>
          {initialItems.map(item =><Item item={item}/>)}

        </ul>
    </div>
  )
}

function Stats()
{
  return <footer class="stats">
    <em>
    👜 You have x items on your list , and you already packed x (x%)
    </em>
  </footer>
}
