import "../css/FlipCard.css"
import logo from "../resources/TECHED_LOGO.png"

function FlipCard({card, handleClick, cardClassName}) {

  return (

    <div className={cardClassName} onClick={()=>handleClick(card)} >
   
    <div className="flip-card-front">
        {card.pair === "image" ? <img src={card.image_url} alt={`Front of ${card.name}'s card`}/> : <p>{card.name}</p>}
    </div>  

    <div className="flip-card-back" >
        <img src={logo}
            alt='card back' />
    </div>

</div>
  );
}

export default FlipCard;