const URL = 'https://swapi.dev/api/';

export const getStarships = async (query: string) => {
  try {
    const response = await fetch(`${URL}starships/?search=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
