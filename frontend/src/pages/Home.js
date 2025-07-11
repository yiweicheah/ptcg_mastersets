import PokedexProgress from "../components/home/PokedexProgress";
import LoginFirst from "../components/user/LoginFirst";

const Home = ({
  user,
  pokedexCollection,
  view,
  setView,
  listGen,
  setListGen,
}) => {
  return (
    <div className="page-div">
      {user ? (
        <div>
          <PokedexProgress
            pokedexCollection={pokedexCollection}
            view={view}
            setView={setView}
            listGen={listGen}
            setListGen={setListGen}
          />
        </div>
      ) : (
        <LoginFirst />
      )}
    </div>
  );
};

export default Home;
