import "../css/Card.css"
import logo from "../resources/TECHED_LOGO.png"

function Card({card, handleClick}) {
  return (
    <div className="Card" key={card.id} name={card.name}>
      <div className = "cardFront">
        {card.pair == "image" && <img src={card.image_url} alt={card.name}></img>}
        {card.pair == "text" && <p>{card.name}</p>}
       </div>
       <div className="cardBack">
        <img src={logo} alt="back of card" onClick={()=>handleClick(card)}></img>
      </div>
    </div>
  );
}

export default Card;