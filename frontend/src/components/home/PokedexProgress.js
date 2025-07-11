import { Card, Grid, Loader, Progress, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { genRange } from "../../data/pokedex";
import "./Progress.css";
import { useNavigate } from "react-router-dom";

const PokedexProgress = ({ pokedexCollection, setView, setListGen }) => {
  const navigate = useNavigate();

  const [totalAdded, setTotalAdded] = useState(0);
  const [genProgress, setGenProgress] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (Object.keys(pokedexCollection).length > 0) {
      const addedIds = Object.keys(pokedexCollection);
      const totalCount = addedIds.length;

      setTotalAdded(totalCount);

      const genCounts = Object.values(pokedexCollection).reduce((acc, item) => {
        acc[item.gen] = (acc[item.gen] || 0) + 1;
        return acc;
      }, {});

      setGenProgress((prev) => ({ ...prev, ...genCounts }));
      setLoading(false);
    }
  }, [pokedexCollection]);

  const handleGenClick = (gen) => {
    setListGen(gen);
    setView("list");
    navigate("/collection");
  };

  if (loading) {
    return (
      <div className="comp-div">
        <Loader />
      </div>
    );
  }

  return (
    <div className="comp-div dex-progress">
      <div className="dex-title-div">
        <div>
          <Title>Pokedéx</Title>
          <Title>Masterset</Title>
        </div>
        <div className="to-dex-div">
          <Title>
            {totalAdded}/{genRange.total}
          </Title>
        </div>
      </div>
      <Progress.Root className="dex-progress-bar" size="lg" color="black">
        <Progress.Section
          value={(totalAdded / genRange.total) * 100}
          color="#e63946"
        />
      </Progress.Root>
      <Grid className="dex-progress-grid">
        {Object.values(genProgress).map((val, i) => (
          <Grid.Col span="4" key={i}>
            <Card
              onClick={() => handleGenClick(i + 1)}
              className="dex-progress-card"
              radius="10"
            >
              <Card.Section>
                <img
                  src={`https://res.cloudinary.com/dwectnni1/image/upload/c_thumb,w_300,g_face/v1751010339/pokedexMaster/regions/${
                    genRange[i + 1]?.region
                  }.webp`}
                  alt={genRange[i + 1]?.region}
                  className="gen-region-img"
                />
                <div className="dex-progress-card-txt">
                  <Title ta="center" size="xl">
                    GEN {genRange[i + 1]?.gen}
                  </Title>
                  <Title ta="center" size="md">
                    {val} / {genRange[i + 1]?.total}
                  </Title>
                </div>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default PokedexProgress;
