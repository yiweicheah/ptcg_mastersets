import { Button, Title } from "@mantine/core";
import { IconLogin2 } from "@tabler/icons-react";

import "./Login.css";
import { useNavigate } from "react-router-dom";

const LoginFirst = () => {
  const navigate = useNavigate();

  return (
    <div className="login-first-div">
      <Title>Please login first</Title>
      <Button
        rightSection={<IconLogin2 />}
        className="login-page-btn"
        onClick={() => navigate("/user-auth")}
      >
        Go to Login Page
      </Button>
    </div>
  );
};

export default LoginFirst;
