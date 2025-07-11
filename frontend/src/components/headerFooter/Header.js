import { Burger, Drawer } from "@mantine/core";
import "./Header.css";
import { IconUserFilled, IconX } from "@tabler/icons-react";
import { useState } from "react";
import UserDrawer from "../../containers/header/UserDrawer";
import NavDrawer from "../../containers/header/NavDrawer";

const Header = ({ user, userInfo }) => {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const [userOpened, setUserOpened] = useState(false);

  const openBurger = () => {
    setBurgerOpened(true);
    setUserOpened(false);
  };
  const closeBurger = () => setBurgerOpened(false);

  const openUser = () => {
    setUserOpened(true);
    setBurgerOpened(false);
  };
  const closeUser = () => setUserOpened(false);

  return (
    <div className="header-div">
      <Drawer
        opened={burgerOpened}
        onClose={closeBurger}
        closeButtonProps={{
          icon: <IconX size={40} stroke={1.5} />,
        }}
      >
        <NavDrawer closeBurger={closeBurger} />
      </Drawer>
      <Drawer
        opened={userOpened}
        onClose={closeUser}
        position="right"
        closeButtonProps={{
          icon: <IconX size={40} stroke={1.5} />,
        }}
      >
        <UserDrawer user={user} userInfo={userInfo} closeUser={closeUser} />
      </Drawer>
      <div className="header-content-div">
        <Burger
          className="header-icon left"
          color="white"
          opened={burgerOpened}
          onClick={openBurger}
        />
        <IconUserFilled
          className="header-icon right"
          color="white"
          onClick={openUser}
        />
      </div>
    </div>
  );
};

export default Header;
