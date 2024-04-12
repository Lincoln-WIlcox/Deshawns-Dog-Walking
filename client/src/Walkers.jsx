import Popup from "reactjs-popup";
import WalkerDetails from "./WalkerDetails";
import { getCities, getDogs, getWalkers, getWalkersByCity, putDog } from "./apiManager";
import { Fragment, useEffect, useState } from "react";

const Walkers = () =>
{
  const [allWalkers, setAllWalkers] = useState([])
  const [filteredWalkers, setFilteredWalkers] = useState([])
  const [cities, setCities] = useState([])
  const [filterCityId, setFilterCityId] = useState(0)
  const [dogs, setDogs] = useState([])

  const fetchAndSetWalkers = () =>
  {
    getWalkers()
      .then(setAllWalkers)
      .catch(() =>
      {
        console.log("API not connected")
      })
  }

  const fetchAndSetDogs = () =>
  {
    getDogs().then(setDogs)
  }

  useEffect(
    () =>
    {
      fetchAndSetWalkers()
      getCities().then(setCities)
      fetchAndSetDogs()
    }, [])

  useEffect(
    () =>
    {
      if(filterCityId == 0)
      {
        setFilteredWalkers(allWalkers)
      } else
      {
        getWalkersByCity(filterCityId).then(
          (walkersByCity) => setFilteredWalkers(walkersByCity)
        )
      }
    }, [filterCityId, allWalkers]
  )

  const onAddingDog = (walkerId, dog) =>
  {
    dog.walkerId = walkerId
    putDog(dog).then(fetchAndSetDogs)
  }

  return <div>
    <div>
      <input type="radio" name="city" value={0} onChange={(event) => setFilterCityId(parseInt(event.target.value))} checked={filterCityId == 0 ? "checked" : ""} />
      <label htmlFor="city">no filter</label>
    </div>
    {
      cities.map(
        (city) =>
          <div key={"city" + city.id}>
            <input type="radio" name="city" value={city.id} onChange={(event) => setFilterCityId(parseInt(event.target.value))} checked={filterCityId == city.id ? "checked" : ""} />
            <label htmlFor="city">{city.name}</label>
          </div>
      )
    }
    {
      filteredWalkers.map(
        (walker) =>
          <Fragment key={walker.id}>
            <p key={"walker" + walker.id}>{walker.name}</p>
            <div>
              <Popup trigger=
                {<button> view details </button>}
                position="right center">
                <WalkerDetails walker={walker} onWalkersChanged={fetchAndSetWalkers} />
              </Popup>
            </div>

            <Popup
              trigger={<button> add dog </button>}
              position="right center">
              {
                dogs.filter(dog => dog.walkerId != walker.id && walker.cities.find(city => city.Id == dog.CityId)).
                  map(dog =>
                    <button onClick={() => onAddingDog(walker.id, dog)} >{dog.name}</button>
                  )
              }
            </Popup>
          </Fragment>
      )
    }
  </div>;
}

export default Walkers