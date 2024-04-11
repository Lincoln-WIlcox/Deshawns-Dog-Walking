export const getDogs = async () =>
{
  return fetch("/api/dogs").then(res => res.json())
}

export const getWalkers = () =>
{
  return fetch("/api/walkers").then(res => res.json())
}

export const getCities = () =>
{
  return fetch("/api/cities").then(res => res.json())
}

export const getWalkersByCity = (cityId) =>
{
  return fetch(`/api/walkers?cityId=${cityId}`).then(res => res.json())
}

export const addDog = (dog) =>
{
  return fetch("/api/dogs",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dog)
    }
  ).then(res => res.json())
}

export const addCity = (city) =>
{
  return fetch("/api/cities",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(city)
    }
  ).then(res => res.json())
}

export const deleteDog = (dogId) =>
{
  return fetch(`/api/dogs/${dogId}`,
    {
      method: "DELETE"
    }
  )
}