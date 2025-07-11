import { useEffect, useState } from "react";
import { genRange, pokedex } from "../../data/pokedex";
import {
  Center,
  Progress,
  SegmentedControl,
  Select,
  Text,
} from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const ListView = ({ pokedexCollection, openModal, listGen, setListGen }) => {
  const [addedGenLen, setAddedGenLen] = useState(0);
  const [filteredAdded, setFilteredAdded] = useState("show");

  useEffect(() => {
    const addedIds = Object.keys(pokedexCollection);
    const totalAddedInGen = addedIds.filter(
      (id) =>
        id >= genRange[Number(listGen)].min &&
        id <= genRange[Number(listGen)].max
    ).length;

    setAddedGenLen(totalAddedInGen);
  }, [listGen, pokedexCollection]);

  const genSelectData = [
    { label: "Gen I", value: "1" },
    { label: "Gen II", value: "2" },
    { label: "Gen III", value: "3" },
    { label: "Gen IV", value: "4" },
    { label: "Gen V", value: "5" },
    { label: "Gen VI", value: "6" },
    { label: "Gen VII", value: "7" },
    { label: "Gen VIII", value: "8" },
    { label: "Gen IX", value: "9" },
  ];

  let listToShow = pokedex.filter((pokemon) => pokemon.gen === Number(listGen));

  const filterAdded = {
    show: listToShow,
    hide: listToShow.filter(
      (pokemon) =>
        !Object.keys(pokedexCollection)?.includes(pokemon.id.toString())
    ),
  };

  return (
    <div className="comp-div list-view">
      <div className="list-gen-progress-div">
        <Select
          data={genSelectData}
          value={listGen}
          onChange={(e) => setListGen(e)}
          allowDeselect={false}
        />
        <Progress
          value={(addedGenLen / listToShow.length) * 100}
          className="list-gen-progress"
        />
      </div>
      <div className="view-ctrl">
        <Text style={{ marginRight: "5px" }}>Show/Hide Added:</Text>
        <SegmentedControl
          label="Show/Hide Added"
          value={filteredAdded}
          onChange={(e) => setFilteredAdded(e)}
          defaultValue="show"
          data={[
            {
              value: "show",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconEye size="16" />
                </Center>
              ),
            },
            {
              value: "hide",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconEyeOff size="16" />
                </Center>
              ),
            },
          ]}
        />
      </div>
      {filterAdded[filteredAdded]?.map((pokemon, i) => (
        <div
          key={i}
          onClick={() => openModal(pokemon)}
          className="pokemon-list-div"
        >
          <img
            src={`https://res.cloudinary.com/dwectnni1/image/upload/v1729145737/TimmyCards/Pokemon/Sprites/${pokemon.id}.png`}
            alt={pokemon.id}
            className="list-sprite"
          />
          {Object.keys(pokedexCollection)?.includes(pokemon.id.toString()) ? (
            <Text className="list-pokemon added">
              #{pokemon.id} {pokedexCollection[pokemon.id]?.cardName} (
              {pokedexCollection[pokemon.id]?.setName})
            </Text>
          ) : (
            <Text>
              #{pokemon.id} {pokemon.name}
            </Text>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListView;
