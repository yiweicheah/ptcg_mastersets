import { IconCardsFilled, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import "./HeaderDrawers.css";

const NavDrawer = ({ closeBurger }) => {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    closeBurger();
  };

  return (
    <div className="cont-div nav">
      <div className="nav-link-div" onClick={() => handleNavClick("/")}>
        <IconHome className="nav-link-icon" />
        Home
      </div>
      <div
        className="nav-link-div"
        onClick={() => handleNavClick("/collection")}
      >
        <IconCardsFilled className="nav-link-icon" />
        Collections
      </div>
    </div>
  );
};

export default NavDrawer;
