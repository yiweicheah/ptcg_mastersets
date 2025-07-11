import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";

import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

import { auth } from "./services/firebase";

import Home from "./pages/Home";
import UserAuth from "./pages/UserAuth";
import WelcomeBack from "./pages/WelcomBack";
import User from "./pages/User";
import Collection from "./pages/Collection";
import Header from "./components/headerFooter/Header";
import { fbGet, fbUpdate } from "./services/content";
import { Title } from "@mantine/core";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const [loginLoading, setLoginLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [pokedexCollection, setPokedexCollection] = useState({});
  const [view, setView] = useState("list");
  const [listGen, setListGen] = useState("1");
  //get user info
  useEffect(() => {
    if (user) {
      fbGet({
        collectionName: "usersInfo",
        documentName: user.uid,
      }).then((res) => {
        if (res) {
          setUserInfo(res);
        } else {
          const userData = {
            displayName: user.displayName,
            email: user.email,
            profilePhoto:
              "https://res.cloudinary.com/dwectnni1/image/upload/v1750844335/pokedexMaster/profilePhotos/default_bjw7sc.png",
            phone: user.phoneNumber,
          };

          fbUpdate({
            collectionName: "usersInfo",
            documentName: user.uid,
            data: userData,
          }).then((res) => {
            setUserInfo(res);
          });
        }
      });
    }
  }, [user]);

  // //get user collection
  // useEffect(() => {
  //   if (user) {
  //     fbGet({
  //       collectionName: "usersCollection",
  //       documentName: user.uid,
  //     }).then((res) => {
  //       if (res) {
  //         setpokedexCollection(res);
  //       } else {
  //         fbUpdate({
  //           collectionName: "usersCollection",
  //           documentName: user.uid,
  //           data: { pokedex: {} },
  //         }).then((res) => {
  //           setpokedexCollection(res);
  //         });
  //       }
  //     });
  //   }
  // }, [user]);

  //get Pokedex collection
  useEffect(() => {
    if (user) {
      fbGet({
        collectionName: `usersCollection/${user?.uid}/collections`,
        documentName: "pokedex",
      }).then((res) => {
        if (res) {
          setPokedexCollection(res);
        } else {
          console.log("Proceed to create new database...");

          fbGet({
            collectionName: `usersCollection`,
            documentName: user?.uid,
          }).then((res) => {
            if (res) {
              console.log("Old database found. Copying...");
              const dataToPush = res.pokedex;
              fbUpdate({
                collectionName: `usersCollection/${user?.uid}/collections`,
                documentName: "pokedex",
                data: dataToPush,
              });

              setPokedexCollection(dataToPush);
            } else {
              console.log("No old database found. Creating a new one...");
              fbUpdate({
                collectionName: `usersCollection/${user?.uid}/collections`,
                documentName: "pokedex",
                data: {},
              });

              setPokedexCollection({});
            }
          });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoginLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app-div">
      <Header user={user} userInfo={userInfo} />
      <div className="app-body">
        {loginLoading ? (
          <div className="login-loading-div">
            <img
              src="https://res.cloudinary.com/dwectnni1/image/upload/v1729064001/TimmyCards/Logo/running-pikachu-transparent-snivee_iyjo0w.gif"
              alt="loader"
              className="login-loading-img"
            />
            <Title className="login-loading-txt">Loading...</Title>
          </div>
        ) : null}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                user={user}
                pokedexCollection={pokedexCollection}
                view={view}
                setView={setView}
                listGen={listGen}
                setListGen={setListGen}
              />
            }
          />
          <Route exact path="/user-auth" element={<UserAuth user={user} />} />
          <Route
            exact
            path="/welcome"
            element={<WelcomeBack userInfo={userInfo} />}
          />
          <Route exact path="/user" element={<User user={user} />} />
          <Route
            exact
            path="/collection"
            element={
              <Collection
                pokedexCollection={pokedexCollection}
                setPokedexCollection={setPokedexCollection}
                user={user}
                view={view}
                setView={setView}
                listGen={listGen}
                setListGen={setListGen}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
