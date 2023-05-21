import { useState, useEffect } from 'react';
import './App.css';
import teamData from "./resources/data.json"
import Card from './components/Card';

function App() {
  const [cards, setcards] = useState([])
function setUpCards(){
  const cards = teamData;
  const cardsSplit = teamData.map((obj)=> {
  return ([{...obj, pair:"image"},{...obj, pair:"text"}])})
  const cardsCombined = cardsSplit.reduce((combined, arr)=>[...combined, ...arr])
  const cardsShuffled = cardsCombined.sort((a,b) => 0.5 - Math.random())
  setcards(cardsShuffled)
  }
  
  useEffect(() => {
setUpCards()
  }, [])

//   function renderCard(card){
// if(card.pair == "image"){
//   return ()
// }
//   }

  return (
    <div className="App">
      <h1>
Card Pairs Game
      </h1>
    {cards.map((card)=>{
      return <Card card={card} />
    })}
      
    </div>
  );
}

export default App;
