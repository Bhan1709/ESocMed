import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage"; //No need to write full path cause we defined jsconfig
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
