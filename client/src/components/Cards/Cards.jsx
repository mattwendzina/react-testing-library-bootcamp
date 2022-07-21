import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ cats, setCats }) => {
  const updateFavourite = (index, favourite) => {
    const updatedCats = [...cats];
    updatedCats[index].favourite = favourite;
    setCats(updatedCats);
  };

  return (
    <div className="pet-cards-container">
      {cats.map((cat, idx) => (
        <Card
          key={cat.id}
          name={cat.name}
          phone={cat.phone}
          email={cat.email}
          img={cat.img}
          favoured={cat.favoured}
          updateFavourite={updateFavourite}
          index={idx}
        />
      ))}
    </div>
  );
};

export default Cards;
