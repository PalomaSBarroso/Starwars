import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <main>
        <Filters />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
