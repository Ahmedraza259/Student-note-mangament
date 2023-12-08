import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import Login from './components/Authentication/login';
import Signup from './components/Authentication/signup';
import Dashboard from './components/deshboard/deshboard';
import ThemeContext from './context/themeContext';
import ThemeState from './context/themeState';

function App() {
  // Move the useContext hook inside the component
  // const contextValue = useContext(ThemeContext);
  // console.log('contextValue: ', contextValue);
  const s  = useContext(ThemeContext);
console.log("sss" , s)
  return (
    <ThemeState>
      <BrowserRouter>
      {/* <p>Name is ${s.name}</p> */}
        {/* <p> Current Theme: {theme}</p> */}
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}

        {/* <div className={`App ${contextValue.theme}`}> */}
        {/* <button>Toggle Theme</button> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </ThemeState>
  );
}

export default App;
