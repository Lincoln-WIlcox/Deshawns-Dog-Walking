import { getWalkers } from "./apiManager";
import { useEffect, useState } from "react";

const Walkers = () =>
{
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  useEffect(() =>
  {
    getWalkers()
      .then(setGreeting)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }, []);

  return <p>{greeting.message}</p>;
}

export default Walkers