const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
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
    <div className="add-form">
      <h3> What do you need for your trip ? </h3>
    </div>
  )
}

function Item(){

}

function PackingList()
{
  return (
    // <div className="list"> LIST</div>
    <ul className="list">
      {initialItems.map(item =><Item item={item}/>)}

    </ul>
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
