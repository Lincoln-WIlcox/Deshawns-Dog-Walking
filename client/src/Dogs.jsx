import DogForm from "./DogForm";
import { getDogs } from "./apiManager";
import { useEffect, useState } from "react";

const Dogs = () => 
{
  const [dogs, setDogs] = useState([]);

  const fetchAndSetDogs = () =>
  {
    getDogs()
      .then(setDogs)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }

  useEffect(() =>
  {
    fetchAndSetDogs()
  }, []);

  return <div>
    <DogForm onDogSubmitted={fetchAndSetDogs} />
    {
      dogs.map(
        dog =>
          <p key={dog.id}>{dog.name}</p>
      )
    }
  </div>;
}

export default Dogs