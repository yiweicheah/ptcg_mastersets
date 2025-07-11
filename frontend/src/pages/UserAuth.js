import { useNavigate } from "react-router-dom";

import "./Pages.css";
import Login from "../components/user/Login";
import { useEffect } from "react";

const UserAuth = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="page-div user-auth">
      <Login />
      {/* <img
        src="https://res.cloudinary.com/dwectnni1/image/upload/v1750840445/pokedexMaster/backgrounds/login-bg.png"
        alt=""
        className="login-bg"
      /> */}
    </div>
  );
};

export default UserAuth;
