import { useEffect, useState } from "react";
import { fbGet, fbUpdate, tcgApiGetCards } from "../../services/content";
import { Loader } from "@mantine/core";
import "./Pokedex.css";
import { IconPokeball, IconTrash } from "@tabler/icons-react";

const AddCard = ({
  selectedPokemon,
  pokedexCollection,
  setPokedexCollection,
  user,
  closeModal,
}) => {
  const [foundCards, setFoundCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPokemon) {
      setLoading(true);
      const params = {
        q: `name:"${selectedPokemon.name
          .replace(/^Mr\.\s*/, "")
          .replace(/(^Mr\.\s*|[\u2640\u2642])/g, "")
          .trim()}"`,
        orderBy: "-set.releaseDate",
      };

      tcgApiGetCards({ params }).then((res) => {
        setFoundCards(res.data);
        setLoading(false);
      });
    }
  }, [selectedPokemon]);

  const handleCardClick = async (card) => {
    const data = { ...pokedexCollection };

    const dataToUpdate = {
      cardId: card.id,
      cardName: card.name,
      pokemonName: selectedPokemon.name,
      gen: selectedPokemon.gen,
      cardImg: card.images.small,
      setId: card.set.id,
      setName: card.set.name,
    };

    await fbUpdate({
      collectionName: `usersCollection/${user.uid}/collections`,
      documentName: "pokedex",
      data: { ...data, [selectedPokemon.id]: dataToUpdate },
    });

    const updated = await fbGet({
      collectionName: `usersCollection/${user.uid}/collections`,
      documentName: "pokedex",
    });

    setPokedexCollection(updated);

    closeModal();
  };

  const handleTrash = async () => {
    const data = { ...pokedexCollection };
    if (data[selectedPokemon.id]) {
      delete data[selectedPokemon.id];

      await fbUpdate({
        collectionName: "usersCollection",
        documentName: user.uid,
        data: data,
      });

      setPokedexCollection(data);
      closeModal();
    }
  };

  const cardClass = (card) => {
    if (
      Object.keys(pokedexCollection).includes(selectedPokemon.id?.toString())
    ) {
      if (pokedexCollection[selectedPokemon.id].cardId === card.id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="cont-div loader">
        <Loader />
      </div>
    );
  }

  return (
    <div className="cont-div add-card">
      <div className="add-grid-cont" onClick={handleTrash}>
        {Object.keys(pokedexCollection).includes(
          selectedPokemon.id?.toString()
        ) ? (
          <div className="add-img trash">
            <IconTrash size="100" color="#e63946" />
          </div>
        ) : null}
        {foundCards?.map((card, i) => (
          <div key={i} className="add-img-div">
            <IconPokeball
              size={100}
              className={
                cardClass(card) ? "add-img-tick" : "add-img-tick hidden"
              }
              color="#e63946"
            />
            <img
              src={card.images.small}
              alt=""
              style={{ objectFit: "contain", width: "150px" }}
              onClick={() => handleCardClick(card)}
              className="add-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCard;
