import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create the provider component
export const GlobalContextProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch global data
  const getGlobalData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get('http://localhost:4000/task/all');
      setGlobalData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch global data on component mount
  useEffect(() => {
    getGlobalData();
  }, []);

  return (
    <GlobalContext.Provider value={{ globalData, getGlobalData, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};
