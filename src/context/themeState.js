// ThemeState.js
import { useState, useMemo } from "react";
import ThemeContext from './themeContext';

const ThemeState = (props) => {
  const [theme, setTheme] = useState("light");
const state = {
  "name":"Ahmed Raza",
  "email":"ahmed.raza@gmail.com"
}
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={state}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeState;


// // ThemeState.js
// import { useState } from "react";
// import ThemeContext from './themeContext';

// const ThemeState = (props) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={theme}>
//       {props.children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeState;
