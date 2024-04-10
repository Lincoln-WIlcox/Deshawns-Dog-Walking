import { getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

const Dogs = () => 
{
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  useEffect(() =>
  {
    getGreeting()
      .then(setGreeting)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }, []);

  return <p>{greeting.message}</p>;
}

export default Dogs