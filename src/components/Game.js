import teamData from "../resources/data.json"
import FlipCard from './FlipCard';
import { useState, useEffect } from 'react';


export default function Game() {

    const [cards, setCards] = useState([])
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [tries, setTries] = useState(0)
    const [finished, setFinished] = useState(false)
  
  // add card to state of choice one, or if it's full then choice two
    function handleClick(card){
      console.log(card.matched +  " matched")
      if (!choiceOne){
        setChoiceOne(card)
        // choice two if it's not second click on choice one
      } else if (!choiceTwo && choiceOne !== card) {
        setChoiceTwo(card)
      }
      }
function updateCards(){
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
  }


function checkFinished(){
        // check if all pairs found
        const b = cards.filter((card)=> card.matched === false); 
        console.log("checking if finished", b.length)
        // setstate hasn't completed so there's still two
        // non-matching cards   
        if (b.length === 2){
            console.log("Not finished yet!")
            setFinished(true)
        } else {
        // allow next try
        tryAgain();
        }
    }

  // whenever a card is clicked, check if one and two match
  // and reset for next turn
  useEffect(() => {  
    if (tries===0){
        setUpCards()
    }
    // if two cards chosen
    if (choiceOne && choiceTwo){  
      //compare two chosen cards and respond
      if(choiceOne.name === choiceTwo.name){
        console.log("It's a match!")
        updateCards()
        checkFinished()  
      } else {
        console.log("No match")
        // pause to show non-matching cards
        setTimeout(tryAgain, 1500)
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
    // const cards = teamData;
    const shuffledCards = teamData
    // set up two cards for each item
      .map((obj)=> [{...obj, pair:"image", id:Math.random(), matched:false},
                    {...obj, pair:"text", id:Math.random(), matched:false}])
      .reduce((combined, arr)=>[...combined, ...arr])
      .sort((a,b) => 0.5 - Math.random())
      console.log(shuffledCards)
    setCards(shuffledCards)
    setTries(0)
    setChoiceOne(null)
    setChoiceTwo(null)
    }

return (
  <div className="Game">

    <div className = "card-display-area">
        <div className="top-row">
            {/* feedback to user whether finished or not */}
            {finished ? <p style={{color:"yellow"}}>Hey, well done! You did it in {tries} tries!</p> : <p>You've had {tries} tries</p>}
            <button onClick={setUpCards}>Reset cards</button>    
        </div>
      {cards.map((card)=> <FlipCard  
                  card={card}
                  key={card.id}
                  handleClick={handleClick} 
                  /* necessary but messy nested ternary
                  if matched get animation, else if choice 1 or 2 get flip, else normal*/
                  cardClassName = {card.matched ? "card-container flip matched" : choiceOne === card || choiceTwo === card ? "card-container flip" : "card-container"}
                  />
      )}
    </div>
  </div>
    )
}
