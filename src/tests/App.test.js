import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Mock from './Mock.test';
import userEvent from '@testing-library/user-event';

describe('', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(Mock),
    }));
    render(<App />);
  });

  it('', async () => {
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
    Mock.results.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    })
    const planetName = screen.getByTestId('name-filter');
    userEvent.type(planetName, 'tatooine');
    const planets = screen.getByTestId('planet-name');
    expect(planets).toHaveLength(1);
  });

  it('', async () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'igual a')
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '12');
    userEvent.click(buttonFilter);
    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(1);
  })

  it('', () => {
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.selectOptions(columnFilter, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'menor que')
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '7200');
    userEvent.click(buttonFilter);
    const planets = screen.getAllByTestId('planet-name');
    expect(planets).toHaveLength(1);
    const btnRemoveAllFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRemoveAllFilters);
    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2).toHaveLength(10);
    userEvent.selectOptions(columnFilter, 'population')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '1000000');
    userEvent.click(buttonFilter);
    const filtersSelected = screen.getByText('population maior que 1000000')
    expect(filtersSelected).toBeInTheDocument();
    const planet = screen.getAllByTestId('planet-name');
    expect(planet).toHaveLength(10);
  });

  it('', () => {
    const columnSort = screen.getByTestId('column-sort');
    const inputASC = screen.getByTestId('column-sort-input-asc');
    const buttonSort = screen.getByTestId('column-sort-button');
    const inputDESC = screen.getByTestId('column-sort-input-desc');
    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(inputASC);
    userEvent.click(buttonSort);
    userEvent.click(inputDESC);
    userEvent.click(buttonSort);
    const planets = screen.getAllByTestId('planet-name').map((el) => el.innerHTML);
    const namePlanets = Mock.results.sort((a, b) => Number(b.diameter) - Number(b.diameter));
    const namePlanet = Mock.results.sort((a, b) => Number(a.diameter) - Number(a.diameter));
    const planetsOrder = namePlanets.map(({ name }) => name);
    const planetsOrder2 = namePlanet.map(({ name }) => name);
    expect(planets).toEqual(planetsOrder2);
    expect(planets).toEqual(planetsOrder);
  });
})
