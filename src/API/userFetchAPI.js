import { useEffect, useState } from 'react';

function useFetchAPI() {
  const [planetsList, selectPlanetsList] = useState([]);
  const [listSource, defineListSource] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();

        const filterPlanets = results.filter((result) => delete result.residents);
        selectPlanetsList(filterPlanets);
        defineListSource(filterPlanets);
      } catch (error) {
        // console.log(error.message);
      }
    };
    getPlanets();
  }, []);

  return { planetsList, selectPlanetsList, listSource };
}

export default useFetchAPI;
