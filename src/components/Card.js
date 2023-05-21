import "../css/Card.css"

function Card({card}) {
  return (
    <div className="Card" name={card.name}>
        { card.pair == "image" && <img src={card.image_url} alt={card.name}></img>}
        {card.pair == "text" && <p>{card.name}</p>}

    </div>
  );
}

export default Card;