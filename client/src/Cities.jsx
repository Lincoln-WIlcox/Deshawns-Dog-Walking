import CityForm from "./CityForm";
import { getCities } from "./apiManager";
import { useEffect, useState } from "react";

const Cities = () => 
{
  const [cities, setCities] = useState([]);

  const fetchAndSetCities = () =>
  {
    getCities()
      .then(setCities)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }

  useEffect(() =>
  {
    fetchAndSetCities()
  }, []);

  return <div>
    <CityForm onCityAdded={fetchAndSetCities} />
    {
      cities.map(
        (city) =>
          <p>{city.name}</p>
      )
    }
  </div>;
}

export default Cities