import CityForm from "./CityForm";
import { getCities } from "./apiManager";
import { useEffect, useState } from "react";

const Cities = () => 
{
  const [cities, setCities] = useState([]);

  useEffect(() =>
  {
    getCities()
      .then(setCities)
      .catch(() =>
      {
        console.log("API not connected");
      });
  }, []);

  return <div>
    <CityForm />
    {
      cities.map(
        (city) =>
          <p>{city.name}</p>
      )
    }
  </div>;
}

export default Cities