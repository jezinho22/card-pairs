import { useState, useEffect } from 'react';
import './App.css';
import teamData from "./resources/data.json"
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [tries, setTries] = useState(0)

// add card to state of choice one, or if it's full then choice two
  function handleClick(card){
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

// whenever a card is clicked, check if one and two match
// and reset for next turn
useEffect(() => {
  if (choiceOne && choiceTwo){
    if(choiceOne.name === choiceTwo.name){
      console.log(choiceOne.name)
      // previously is the previous state for cards
      // setCards will set to previous state withs something done to it
      setCards(previously => {
        return previously.map(card =>{
          // there are two cards which match choiceOne.name
          // this will change only those two to say matched
          if(card.name === choiceOne.name){
          return {...card, matched:true}
        }})
      })
      tryAgain()
    } else {
      console.log("Uh uh uh. No match there!")
      tryAgain()
    }
  }
}, [choiceOne, choiceTwo])


// reset for next try
function tryAgain(){
  setTries(tries + 1)
  setChoiceOne(null)
  setChoiceTwo(null)
}


  function setUpCards(){
    const cards = teamData;
    const shuffledCards = teamData
      .map((obj)=> [{...obj, pair:"image", id:Math.random(), matched:false},
                    {...obj, pair:"text", id:Math.random(), matched:false}])
      .reduce((combined, arr)=>[...combined, ...arr])
      .sort((a,b) => 0.5 - Math.random())
    setCards(shuffledCards)
    }
  

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
      <button onClick={setUpCards}/>
      <div className = "card-display-area">

    {cards.map((card)=>{
      return <Card card={card} handleClick={handleClick} />
    })}
    
      </div>
    </div>
  );
}

export default App;
