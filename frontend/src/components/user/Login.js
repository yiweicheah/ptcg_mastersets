import { Button, Text, Title } from "@mantine/core";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

import "./Login.css";
import { loginWithProviders } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = async (provider) => {
    await loginWithProviders({ provider });
    navigate("/welcome");
  };

  return (
    <div className="comp-div login">
      <div className="login-box">
        <Title className="comp-title login">Login/Register</Title>
        <Text className="comp-txt login">
          Login to save your own collections
        </Text>
        <Button
          leftSection={<IconBrandGoogleFilled />}
          onClick={() => handleLoginClick("google")}
          color="white"
          className="login-btn"
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
