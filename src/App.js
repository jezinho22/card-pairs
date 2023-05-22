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
    console.log(card.matched +  " matched")
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

// whenever a card is clicked, check if one and two match
// and reset for next turn
useEffect(() => {
  if (choiceOne && choiceTwo){
    if(choiceOne.name === choiceTwo.name){
      console.log("It's a match!")
      // previously is the previous state for cards
      // setCards will set to previous state withs something done to it
      setCards(oldCards => {
        return oldCards.map(card =>{
          // the two cards which match choiceOne.name
          // need to change to matched:true
          if(card.name === choiceOne.name){
            return {...card, matched:true}
          } else {
            return card}
          })
          })
      // reset cards
      tryAgain();

    } else {
      console.log("No match")
      // reset cards
      tryAgain()
    
    }
  }
}, [choiceOne, choiceTwo])

// reset for next try
function tryAgain(){
  console.log(choiceOne.matched)
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

  return (
    <div className="App">
      <h1>
Card Pairs Game
      </h1>
      <button onClick={setUpCards}/>
      <div className = "card-display-area">

    {cards.map((card)=>{
      return <Card  card={card} 
                    handleClick={handleClick} 
                    flipped={card.matched || choiceOne === card || choiceTwo === card}
                    />
    })}
    
      </div>
    </div>
  );
}

export default App;
