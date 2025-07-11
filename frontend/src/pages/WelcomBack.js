import { Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeBack = ({ userInfo }) => {
  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [count, navigate]);

  return (
    <div className="page-div">
      <Title>Welcome Back, {userInfo?.displayName}!</Title>
      <Text>You'll be redirected in {count}...</Text>
      {count < 1 ? (
        <a href="/">Click here if you have not been redirected</a>
      ) : null}
    </div>
  );
};

export default WelcomeBack;
