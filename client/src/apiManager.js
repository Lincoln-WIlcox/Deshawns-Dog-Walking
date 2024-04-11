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

export const addDog = (dog) =>
{
  return fetch("/api/dog",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dog)
    }
  ).then(res => res.json())
}