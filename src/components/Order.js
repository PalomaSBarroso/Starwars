import React, { useState, useContext } from 'react';
import starWars from '../context/starWars';

function Order() {
  const { planetsList, selectPlanetsList } = useContext(starWars);

  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [orderOption, defineSelect] = useState(
    { column: 'population', sort: '' },
  );

  const orderingTheUnknow = () => {
    const { column } = orderOption;
    const unknownList = planetsList.filter((planet) => planet[column] === 'unknown');
    const withoutUnknown = planetsList
      .filter((planet) => planet[column] !== 'unknown');
    const rising = withoutUnknown.sort((a, b) => a[column] - b[column]);
    return [...rising, ...unknownList];
  };
  // filtra os planetas que possuem a propriedade 'unknown' e retorna de forma ordenada

  const orderList = () => {
    const { column, sort } = orderOption;
    const descendant = planetsList
      .sort((a, b) => b[column] - a[column]);
    switch (sort) {
    case 'RISING':
      selectPlanetsList(orderingTheUnknow());
      break;
    default:
      selectPlanetsList([...descendant]);
    }
  };
    // é executada quando o usuário clica no botão 'Ordenar' e ordena a lista de planetas de acordo com a opção selecionada

  return (
    <div>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => defineSelect({
          ...orderOption, column: target.value }) }
      >
        {
          options.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))
        }
      </select>
      <input
        type="radio"
        name="typeOrder"
        value="RISING"
        data-testid="column-sort-input-asc"
        onChange={ ({ target }) => defineSelect({
          ...orderOption, sort: target.value }) }
      />
      Ascendente
      <input
        type="radio"
        name="typeOrder"
        data-testid="column-sort-input-desc"
        onChange={ ({ target }) => defineSelect({
          ...orderOption, sort: target.value }) }
      />
      Descendente
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ orderList }
      >
        {' '}
        Ordenar
      </button>
    </div>
  );
}

export default Order;
