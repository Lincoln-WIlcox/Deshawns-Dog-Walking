import DogForm from "./DogForm";
import { getDogs } from "./apiManager";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';

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

  const onDeleteClicked = (dogId) =>
  {
    console.log("deleting " + dogId)
  }

  return <div>
    <DogForm onDogSubmitted={fetchAndSetDogs} />
    {
      dogs.map(
        dog =>
          <div key={dog.id}>
            <p>{dog.name}</p>
            <Popup trigger=
              {<button> view details </button>}
              position="right center">
              <div>lives in {dog.city.name}</div>
              <div>{dog.walker ? `walked by ${dog.walker.name}` : 'no walker assigned'}</div>
              <button onClick={(event) => { onDeleteClicked(dog.id) }}>delete</button>
            </Popup>
          </div>
      )
    }
  </div>;
}

export default Dogs