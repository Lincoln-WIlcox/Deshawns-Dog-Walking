import { Fragment, useEffect, useState } from "react"
import { deleteWalker, getCities, getCitiesByWalker, putWalkerCities } from "./apiManager"

const WalkerDetails = ({ walker, onWalkersChanged }) =>
{
    const [cities, setCities] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [citiesForThisWalker, setCitiesForThisWalker] = useState([])

    useEffect(
        () =>
        {
            getCities().then(setCities)
            getCitiesByWalker(walker.id).then(setCitiesForThisWalker)
        }, []
    )

    useEffect(
        () =>
        {
            setSelectedCities(citiesForThisWalker)
        }, [citiesForThisWalker]
    )

    const onCheckboxChanged = (checked, cityId) =>
    {
        if(checked)
        {
            let newSelectedCities = [...selectedCities, cities.find(city => city.id == cityId)]
            setSelectedCities(newSelectedCities)
        } else
        {
            setSelectedCities(selectedCities.filter(selectedCity => selectedCity.id !== parseInt(cityId)))
        }
    }

    const onUpdateClicked = () =>
    {
        walker.cities = selectedCities
        putWalkerCities(walker).then(onWalkersChanged)
    }

    const onDeleteClicked = () =>
    {
        deleteWalker(walker.id).then(onWalkersChanged)
    }

    return <div>
        {
            cities.map(
                (city) =>
                    <Fragment key={city.id}>
                        <input type="checkbox" name={city.id} checked={selectedCities.find(selectedCity => selectedCity.id === city.id) ? "checked" : ""} value={city.id} onChange={(event) => onCheckboxChanged(event.target.checked, event.target.value)} />
                        <label htmlFor={city.id}>{city.name}</label>
                    </Fragment>
            )
        }
        <button onClick={onUpdateClicked}>Update</button>
        <button onClick={onDeleteClicked}>Delete</button>
    </div>
}

export default WalkerDetails