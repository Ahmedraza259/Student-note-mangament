import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeContext from './context/themeContext';

import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import Dashboard from './components/deshboard/deshboard';
import Navbar from './components/navbar';

function App() {
  const [theme, setTheme] = useState('light');
  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Navbar toggleTheme={handleTheme} />
      <BrowserRouter>
        <div className={`App ${theme}`}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
