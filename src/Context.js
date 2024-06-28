import React, { createContext, useState } from 'react';

// Create a context object
const MyContext = createContext();

// Create a context provider component
const MyContextProvider = ({ children }) => {
  // Initialize state or any necessary variables
  const [basename, setBasename] = useState('default basename');

  // You can define any functions or state management logic here

  // Provide the context value to the children components
  return (
    <MyContext.Provider value={{ basename, setBasename }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
