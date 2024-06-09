import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./page/homepage";
import { GlobalContextProvider } from "./context/globalContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
