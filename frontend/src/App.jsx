import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import Settings from "../src/pages/Settings";
import Recipes from "../src/pages/Recipes";
import Favorites from "../src/pages/Favorites";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import ProfileWelcomePage from "./pages/profilepage/ProfileWelcomePage";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfileWelcomePage />} /> 
          <Route path="login" element={<LoginPage />} />  {/* Login-Seite */}
          <Route path="register" element={<RegisterPage />} /> {/* Register-Seite */}
          <Route path="settings" element={<Settings />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="recipes" element={<Recipes />} />
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
