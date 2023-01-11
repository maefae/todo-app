import React, { useState } from 'react';

export const SettingsContext = React.createContext();

const SettingsProvider = ({children}) => {

  const [showComplete, setShowComplete] = useState(false);
  const [pageItems, setPageItems] = useState(3);
  const [sort, setSort] = useState('difficulty');

  const values = {showComplete, pageItems, sort}
  
  return(
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
};

export default SettingsProvider;





