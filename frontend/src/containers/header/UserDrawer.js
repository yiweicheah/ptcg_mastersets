import { Button, Text } from "@mantine/core";
import "./HeaderDrawers.css";
import { logout } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { IconLogout2 } from "@tabler/icons-react";

const UserDrawer = ({ user, userInfo, closeUser }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    closeUser();
    navigate("/user-auth");
  };

  const handleLogout = () => {
    logout();
    closeUser();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="cont-div user-drawer">
        <div className="cont-div user-drawer">
          <Text className="user-drawer-name">Please Login First</Text>
          <Button
            onClick={handleLogin}
            className="logout-btn"
            color="blue"
            leftSection={<IconLogout2 color="white" />}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cont-div user-drawer">
      <div className="profile-photo-box">
        <img src={userInfo?.profilePhoto} alt="profile-photo" />
      </div>
      <Text className="user-drawer-name">{userInfo?.displayName}</Text>
      <Button
        onClick={handleLogout}
        className="logout-btn"
        color="red"
        leftSection={<IconLogout2 color="white" />}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserDrawer;
