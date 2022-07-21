import { useState } from "react";
import "./Card.css";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";

const Card = ({
  name,
  phone,
  email,
  img,
  favoured,
  updateFavourite,
  index,
}) => {
  const [isFavoured, setIsFavoured] = useState(favoured);
  const toggleFavourite = () => {
    setIsFavoured(!isFavoured);
    updateFavourite(index, !isFavoured);
  };
  return (
    <article className="card">
      <div className="card-header">
        <img alt={img.alt} src={img.url} className="card-img" />
        <button className="heart" onClick={toggleFavourite}>
          {isFavoured ? (
            <img src={heartFilled} alt="Filled heart" />
          ) : (
            <img src={heartOutlined} alt="Outlined heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
