import { useState } from "react"
import { addCity } from "./apiManager"

const CityForm = ({ onCityAdded }) =>
{
    const [name, setName] = useState("")

    const onSubmitPressed = () =>
    {
        const city =
        {
            name: name
        }
        addCity(city).then(onCityAdded)
    }

    return <div>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        <button onClick={onSubmitPressed}>submit</button>
    </div>
}

export default CityForm