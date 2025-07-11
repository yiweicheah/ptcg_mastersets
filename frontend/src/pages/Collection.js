import "./Pages.css";

import Pokedex from "../components/masterset/Pokedex";
import LoginFirst from "../components/user/LoginFirst";

const Collection = ({
  pokedexCollection,
  setPokedexCollection,
  user,
  view,
  setView,
  listGen,
  setListGen,
}) => {
  return (
    <div className="page-div">
      {user ? (
        <Pokedex
          pokedexCollection={pokedexCollection}
          setPokedexCollection={setPokedexCollection}
          user={user}
          view={view}
          setView={setView}
          listGen={listGen}
          setListGen={setListGen}
        />
      ) : (
        <LoginFirst />
      )}
    </div>
  );
};

export default Collection;
