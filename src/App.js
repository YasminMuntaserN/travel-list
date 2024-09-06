import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Socks", quantity: 12, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: true },

];

export default function App(){
  return(
    <div className="app">
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
  const [description , setDescription] =useState("");
  const [quantity , setQuantity] =useState(1);


  function handleSubmit(e)
  {
      // This method prevents the default behavior of the form submission. By default, submitting a form triggers a page reload or navigation to a new page
      e.preventDefault();

      if(!description) return;

      const newItem ={description , quantity , packed:false ,id:Date.now()};
      console.log(newItem);

      setDescription("");
      setQuantity(1);

  }

  return(
    <form className="add-form" onSubmit={handleSubmit} >
      <h3> What do you need for your trip ? </h3>
      <select value={quantity} 
      onChange={(e)=>{setQuantity(Number(e.target.value));}}>
        {
        Array.from({length:20} ,(_,i) =>1 + i).map(
          num =><option value={num} key={num}>{num}</option>
        )
        }

      </select>

      <input type="text" placeholder="Item..." value={description} 
      onChange={(e)=>{setDescription(e.target.value);}}/>
      <button >Add</button>
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
          {initialItems.map(item =><Item item={item} key={item.id}/>)}

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
