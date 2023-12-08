import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThemeContext from './context/themeContext';

import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import Dashboard from './components/deshboard/deshboard';
import Navbar from './components/navbar';
import AddNote from './components/deshboard/add-note';
import EditNote from './components/deshboard/edit-note';

function App() {
  const [theme, setTheme] = useState('light');
  console.log("theme::" , theme)
  const handleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
        <div className={`App bg-${theme}`}>
      <Navbar toggleTheme={handleTheme} />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-note" element={<AddNote />} />
            <Route path="/edit-note/:noteId" element={<EditNote />} />

          </Routes>
      </BrowserRouter>
        </div>
    </ThemeContext.Provider>
  );
}

export default App;
