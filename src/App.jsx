import React from 'react';
import { SettingsProvider } from './Context/Settings';
import Header from './Components/Header/index';
import ToDo from './Components/ToDo/ToDo';

const App = () => {
  return (
    <>
      <SettingsProvider>
        <Header />
        <ToDo />
        <Footer />
      </SettingsProvider>
    </>
  )
};

export default App;