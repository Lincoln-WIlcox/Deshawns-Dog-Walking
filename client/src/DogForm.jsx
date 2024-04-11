import { useEffect, useState } from "react"
import { addDog, getCities } from "./apiManager"


const DogForm = ({ onDogSubmitted }) =>
{
    const [name, setName] = useState("")
    const [cityId, setCityId] = useState(0)
    const [cities, setCities] = useState([])

    useEffect(
        () =>
        {
            getCities().then(setCities)
        }, []
    )

    const submitDog = () =>
    {
        if(dogIsValid())
        {
            const dog =
            {
                name: name,
                cityId: cityId,
                walkerId: 0
            }

            addDog(dog).then(onDogSubmitted)
        } else
        {
            window.alert("dog form is not filled")
        }

        setName("")
        setCityId(0)
    }

    const dogIsValid = () =>
    {
        return name && cityId
    }

    return <div>
        <form>
            <input type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
            <div>
                {
                    cities.map(
                        (city) =>
                            <div key={city.id}>
                                <input type="radio" value={city.id} id={city.id} name="city" checked={cityId == city.id ? "checked" : ""} onChange={(event) => setCityId(parseInt(event.target.value))} />
                                <label htmlFor={city.id} >{city.name}</label>
                            </div>
                    )
                }
            </div>
        </form>
        <button onClick={submitDog}>submit</button>
    </div>
}

export default DogForm