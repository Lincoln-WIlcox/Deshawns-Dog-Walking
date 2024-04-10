import { getCities } from "./apiManager";
import { useEffect, useState } from "react";

const Cities = () => 
{
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  useEffect(() =>
  {
    getCities()
      .then(setGreeting)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }, []);

  return <p>{greeting.message}</p>;
}

export default Cities