import { useEffect, useState } from "react";
import { pokedex } from "../../data/pokedex";
import grid3 from "../../icons/grid3.png";
import grid4 from "../../icons/grid4.png";
import {
  Center,
  Flex,
  Grid,
  Group,
  Pagination,
  SegmentedControl,
  Select,
  Text,
} from "@mantine/core";
import { useSwipeable } from "react-swipeable";

import "./Pokedex.css";
import FadeIn from "../../functions/FadeIn";
import SwipeFade from "../../functions/SwipeFade";

const GridView = ({ openModal, pokedexCollection, modalOpened }) => {
  const [gridSize, setGridSize] = useState("3");
  const [pokemonsToShow, setPokemonsToShow] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState(null);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [swipeDirection, setSwipeDirection] = useState(null);

  //get total pages
  useEffect(() => {
    const total = Math.ceil(pokedex.length / (3 * gridSize));

    setTotalPages(total);
  }, [gridSize]);

  //set page content according to page size
  useEffect(() => {
    if (gridSize === "3") {
      const toShow = pokedex.slice((page - 1) * 9, page * 9);
      setPokemonsToShow(toShow);
    }

    if (gridSize === "4") {
      const toShow = pokedex.slice((page - 1) * 12, page * 12);
      setPokemonsToShow(toShow);
    }

    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, gridSize, totalPages]);

  //set select data for all pokemon
  let searchData = [];
  pokedex.forEach((pokemon) => {
    const dataToPush = {
      value: pokemon.id.toString(),
      label: pokemon.name,
    };

    searchData.push(dataToPush);
  });

  //change handler for grid size change
  const handleSizeChg = (e) => {
    setGridSize(e);
    if (searchPokemon) {
      const pokemonPage = Math.ceil(
        Number(searchPokemon) / (e === "3" ? 9 : 12)
      );
      setPage(pokemonPage);
    }
  };

  //handler for search function
  const handleSearch = (e) => {
    setSearchPokemon(e);
    if (e) {
      const pokemonPage = Math.ceil(Number(e) / (gridSize === "3" ? 9 : 12));
      setPage(pokemonPage);
    } else {
      const currentPage = page;
      setPage(currentPage);
    }
  };

  //handler for page change
  const handlePageChg = (e) => {
    if (page < e) {
      setSwipeDirection("left");
    } else if (page > e) {
      setSwipeDirection("right");
    }
    setPage(e);
  };

  //handler for page change when swiping on mobile view
  const handleSwipe = useSwipeable({
    onSwipedLeft: () => {
      if (!modalOpened && page < totalPages) {
        setPage((p) => p + 1);
        setSwipeDirection("left");
      }
    },
    onSwipedRight: () => {
      if (!modalOpened && page > 1) {
        setPage((p) => p - 1);
        setSwipeDirection("right");
      }
    },
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="cont-div grid-view">
      <Flex
        gap="md"
        justify="space-between"
        align="stretch"
        direction={{ base: "column", sm: "row" }} // ✅ stack on mobile
        style={{ maxWidth: "720px", margin: "auto", marginTop: "16px" }}
      >
        <Group justify="left">
          <Select
            data={searchData}
            value={searchPokemon}
            onChange={(e) => handleSearch(e)}
            allowDeselect
            searchable
            placeholder="Search for Pokémon"
          />
          <SegmentedControl
            value={gridSize}
            onChange={(e) => handleSizeChg(e)}
            data={[
              {
                value: "3",
                label: (
                  <Center style={{ gap: 10 }}>
                    <img src={grid3} alt="3x3" style={{ width: "16px" }} />
                  </Center>
                ),
              },
              {
                value: "4",
                label: (
                  <Center style={{ gap: 10 }}>
                    <img src={grid4} alt="4x3" style={{ width: "16px" }} />
                  </Center>
                ),
              },
            ]}
          />
        </Group>
        <Group justify="right">
          {/* <Text size="sm">{`Showing ${
            Number(gridSize) * 3 * (page - 1) + 1
          } – ${Math.min(pokedex.length, Number(gridSize) * 3 * page)} of ${
            pokedex.length
          }`}</Text> */}
          <Text size="sm">{`Showing page ${page} of ${totalPages}`}</Text>
          <Pagination
            total={totalPages}
            value={page}
            onChange={(e) => handlePageChg(e)}
            withPages={false}
            withEdges
          />
        </Group>
      </Flex>
      <div {...handleSwipe} style={{ overflow: "hidden" }}>
        <SwipeFade swipeDirection={swipeDirection} key={page}>
          <Grid gutter="sm" className="grid-view-grid">
            {pokemonsToShow?.map((pokemon, i) => (
              <Grid.Col
                key={i}
                span={gridSize === "3" ? 4 : 3}
                className="grid-view-col"
                onClick={() => openModal(pokemon)}
              >
                {pokedexCollection.hasOwnProperty(pokemon.id) ? (
                  <div className="grid-col-div">
                    <img
                      src={pokedexCollection[pokemon.id]?.cardImg}
                      alt={pokemon.id}
                      className="grid-card"
                    />
                    <div className="grid-txt-div">
                      <Text className="grid-txt">
                        #{pokemon.id} {pokemon.name}
                      </Text>
                    </div>
                  </div>
                ) : (
                  <div className="grid-col-div not-added">
                    <img
                      src={`https://res.cloudinary.com/dwectnni1/image/upload/v1729145737/TimmyCards/Pokemon/Sprites/${pokemon.id}.png`}
                      alt={pokemon.name}
                      className="grid-sprite"
                    />
                    <div className="grid-txt-div">
                      <Text className="grid-txt">
                        #{pokemon.id} {pokemon.name}
                      </Text>
                    </div>
                  </div>
                )}
              </Grid.Col>
            ))}
          </Grid>
        </SwipeFade>
      </div>
      {/* <Pagination
        total={totalPages}
        siblings={1}
        value={page}
        onChange={(e) => setPage(e)}
        withEdges
      /> */}
    </div>
  );
};

export default GridView;
