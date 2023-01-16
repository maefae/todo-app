import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from './Components/ToDo/ToDo';
import Header from './Components/Header'
import { When } from 'react-if';
import SettingsForm from './Components/SettingsForm/SettingsForm'
import { AuthContext } from './Context/Auth/index';
import { useContext } from 'react';
import Footer from './Components/Footer/footer';

export default function App() {
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <>
      <BrowserRouter>
        <Header />
        <When condition={isLoggedIn}>
          <Routes>
            <Route path='/' element={<ToDo />} />
            <Route path="/settings" element={<SettingsForm />} />
          </Routes>
        </When>
        <Footer />
      </BrowserRouter>
    </>
  );
}