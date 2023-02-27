import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWars from './starWars';
import useFetchAPI from '../API/userFetchAPI';

function Provider({ children }) {
  const { planetsList, selectPlanetsList, getPlanets, listSource } = useFetchAPI();
  // a função useFetchAPI é responsável por fazer a requisição da API e retornar os valores necessários para o contexto

  const [filterPlanetName, defineFilterPlanetName] = useState([]);

  const [filterColumn, defineFilterColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [filterComparison, defineFilterComparison] = useState('maior que');

  const [values, defineValues] = useState(0);

  const [filterByNumericValue, defineFilterNumericValue] = useState({
    column: filterColumn[0],
    comparison: 'maior que',
    numericValue: 0,
  });

  const [allFilters, defineAllFilters] = useState([]);

  const filteringPlanets = filterPlanetName.length > 0 ? planetsList
    .filter((planet) => planet.name.includes(filterPlanetName)) : planetsList;
    // a funçao filteringPlanets filtra a lista de planetas pelo nome

  const handleNamePlanets = useMemo(
    () => (
      { target: { value } },
    ) => defineFilterPlanetName(value),
    [],
  );
  // a função handleNamePlanets é responsável por definir o estado filterPlanetName com o valor e é envolta em um useMemo para evitar renderizações desnecessárias

  const handleAllFilters = useMemo(
    () => (
      { target: { name, value } },
    ) => defineFilterNumericValue(
      { ...filterByNumericValue, [name]: value },
    ),
    [filterByNumericValue],
  );
  // a função handleAllFilters é responsável por definir o estado filterByNumericValue com os valores e é envolta em um useMemo para evitar renderizações desnecessárias

  const memoItems = useMemo(() => ({
    planetsList,
    getPlanets,
    selectPlanetsList,
    filterPlanetName,
    defineFilterPlanetName,
    filteringPlanets,
    handleNamePlanets,
    allFilters,
    defineAllFilters,
    filterColumn,
    defineFilterColumn,
    filterComparison,
    defineFilterComparison,
    values,
    defineValues,
    filterByNumericValue,
    defineFilterNumericValue,
    handleAllFilters,
    listSource,
  }
  ), [
    planetsList,
    getPlanets,
    selectPlanetsList,
    filterPlanetName,
    defineFilterPlanetName,
    filteringPlanets,
    handleNamePlanets,
    allFilters,
    defineAllFilters,
    filterColumn,
    defineFilterColumn,
    filterComparison,
    defineFilterComparison,
    values,
    defineValues,
    filterByNumericValue,
    defineFilterNumericValue,
    handleAllFilters,
    listSource,
  ]);
  // a memoItems é responsável por definir os valores que serão passados para o Provider

  return (
    <starWars.Provider value={ memoItems }>
      { children }
    </starWars.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
// O provider é exportado como padrão para ser usado em outros arquivos

export default Provider;
