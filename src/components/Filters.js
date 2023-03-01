import React, { useContext, useEffect } from 'react';
import starWars from '../context/starWars';

function Filters() {
  const {
    selectPlanetsList,
    filterColumn,
    filterPlanetName,
    handleNamePlanets,
    listSource,
    filterByNumericValue,
    defineFilterNumericValue,
    defineFilterColumn,
    allFilters,
    defineAllFilters,
    handleAllFilters,
  } = useContext(starWars);

  const eraseFilters = ({ target: { id } }) => {
    defineAllFilters(allFilters.filter((option) => option.column !== id));
    defineFilterColumn([...filterColumn, id]);
  };
  // usada para remover um filtro específico selecionado pelo usuário

  const eraseAllFilters = () => {
    defineAllFilters([]);
    defineFilterColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };
  // usado para remover todos os filtros aplicados e resetar para os valores padrão

  useEffect(() => {
    if (!allFilters.length) return selectPlanetsList(listSource);
    let filtering = listSource;
    allFilters.forEach((filter) => {
      const { column, comparison, numericValue } = filter;
      if (comparison === 'maior que') {
        filtering = filtering
          .filter((item) => Number(item[column]) > Number(numericValue));
      } if (comparison === 'menor que') {
        filtering = filtering
          .filter((item) => Number(item[column]) < Number(numericValue));
      } if (comparison === 'igual a') {
        filtering = filtering
          .filter((item) => Number(item[column]) === Number(numericValue));
      }
      selectPlanetsList(filtering);
    });
  }, [allFilters, listSource, selectPlanetsList]);
  // para atualizar a lista de planetas selecionados de acordo com os filtros aplicados pelo usuário. A função é executada sempre que há mudanças nos valores de  allFilters, listSource ou selectPlanetsList

  const displayFilters = () => {
    defineAllFilters([...allFilters, filterByNumericValue]);
    defineFilterColumn(filterColumn
      .filter((columns) => columns !== filterByNumericValue.column));
    defineFilterNumericValue({
      column: filterColumn[0],
      comparison: 'maior que',
      numericValue: '0',
    });
  };
  // responsável por adicionar um novo filtro ao array e atualizar as opções de coluna disponíveis, removendo a coluna selecionada e definindo os valores padrão para os o novo filtro

  return (
    <main>

      <h1>Star Wars Planets Search</h1>
      <div>
        <input
          data-testid="name-filter"
          name="name"
          placeholder="Planet name"
          type="text"
          onChange={ handleNamePlanets }
          value={ filterPlanetName }
        />
      </div>
      <header>
        <div>
          Selecione a coluna
          <select
            data-testid="column-filter"
            name="column"
            onChange={ handleAllFilters }
            value={ filterByNumericValue.column }
          >
            {filterColumn.map((columns) => (
              <option value={ columns } key={ columns }>
                {columns}
              </option>
            ))}
          </select>
        </div>

        <div>
          Selecione o operador
          <select
            data-testid="comparison-filter"
            name="comparison"
            onChange={ handleAllFilters }
            value={ filterByNumericValue.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>

        <div>
          <input
            data-testid="value-filter"
            name="numericValue"
            type="text"
            onChange={ handleAllFilters }
            value={ filterByNumericValue.numericValue }
          />
        </div>

        <div>
          <button
            data-testid="button-filter"
            onClick={ displayFilters }
            type="submit"
          >
            Filtrar
          </button>
        </div>

        {allFilters.length > 0 && allFilters
          .map(({ column, comparison, numericValue }) => (
            <div
              data-testid="filter"
              key={ column }
            >
              <span>{ `${column} ${comparison} ${numericValue}` }</span>
              <button
                type="button"
                id={ column }
                onClick={ eraseFilters }
              >
                Undefine filter
              </button>
            </div>
          ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ eraseAllFilters }
        >
          Remover todos os filtros
        </button>
      </header>
    </main>
  );
}

export default Filters;
