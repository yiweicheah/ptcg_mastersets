import { useEffect, useState } from "react";
import ListView from "../../containers/pokedex/ListView";
import GridView from "../../containers/pokedex/GridView";
import {
  Center,
  Group,
  Modal,
  Progress,
  SegmentedControl,
  Text,
  Tooltip,
} from "@mantine/core";
import AddCard from "../../containers/pokedex/AddCard";
import { IconLayoutGrid, IconList } from "@tabler/icons-react";
import { genRange, pokedex } from "../../data/pokedex";

const Pokedex = ({
  pokedexCollection,
  setPokedexCollection,
  user,
  view,
  setView,
  listGen,
  setListGen,
}) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [totalPokedex, setTotalPokedex] = useState(0);

  useEffect(() => {
    if (Object.keys(pokedexCollection).length > 0) {
      const total = Object.keys(pokedexCollection).length;

      setTotalPokedex(total);
    }
  }, [pokedexCollection]);

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedPokemon("");
  };

  const views = {
    list: (
      <ListView
        pokedexCollection={pokedexCollection}
        openModal={openModal}
        closeModal={closeModal}
        listGen={listGen}
        setListGen={setListGen}
      />
    ),
    grid: (
      <GridView
        openModal={openModal}
        closeModal={closeModal}
        pokedexCollection={pokedexCollection}
      />
    ),
  };

  return (
    <div className="cont-div pokedex">
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        title="Add Card to Collection"
        size="100%"
      >
        <AddCard
          selectedPokemon={selectedPokemon}
          pokedexCollection={pokedexCollection}
          setPokedexCollection={setPokedexCollection}
          user={user}
          closeModal={closeModal}
        />
      </Modal>
      <div className="view-ctrl">
        <Text style={{ marginRight: "5px" }}>View:</Text>
        <SegmentedControl
          value={view}
          onChange={(e) => setView(e)}
          data={[
            {
              value: "list",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconList size="16" />
                </Center>
              ),
            },
            {
              value: "grid",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconLayoutGrid size="16" />
                </Center>
              ),
            },
          ]}
        />
      </div>

      <div>
        <div className="list-gen-progress-div">
          <Tooltip
            label={`${((totalPokedex / pokedex.length) * 100).toFixed(2)}%`}
          >
            <Progress
              value={(totalPokedex / genRange.total) * 100}
              className="list-gen-progress"
            />
          </Tooltip>
          <Text>
            Total Progress: {totalPokedex} / {pokedex.length}
          </Text>
        </div>
        <Group justify="center" grow></Group>
        {views[view] ?? (
          <ListView
            pokedexCollection={pokedexCollection}
            openModal={openModal()}
            closeModal={closeModal()}
            listGen={listGen}
            setListGen={setListGen}
          />
        )}
      </div>
    </div>
  );
};

export default Pokedex;
