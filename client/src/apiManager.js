export const getGreeting = async () =>
{
  const response = await fetch("/api/hello")
  return response.json()
}

export const getWalkers = async () =>
{
  const response = await fetch("/api/walkers")
  return response.json()
}

export const getCities = async () =>
{
  const response = await fetch("/api/cities")
  return response.json()
}