import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './context/Provider';
import Order from './components/Order';

function App() {
  return (
    <Provider>
      <Filters />
      <Order />
      <Table />
    </Provider>
  );
}

export default App;
