import { getDogs } from "./apiManager";
import { useEffect, useState } from "react";

const Dogs = () => 
{
  const [dogs, setDogs] = useState([]);

  useEffect(() =>
  {
    getDogs()
      .then(setDogs)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }, []);

  return <div>
    {
      dogs.map(
        dog =>
          <p key={dog.id}>{dog.name}</p>
      )
    }
  </div>;
}

export default Dogs