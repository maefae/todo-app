import React from 'react';
import ToDo from './Components/ToDo/ToDo';
import Header from './Components/Header'

export default class App extends React.Component {
  render() {
    return (
      <>
      <Header />
      <ToDo />
      </>
    );
  }
}