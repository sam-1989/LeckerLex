import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import RecipeContextProvider from "./context/RecipeContext";
import LandingPage from "./pages/landingpage/LandingPage";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import Favorites from "../src/pages/Favorites";
import LoginPage from "./pages/loginpage/LoginPage";
import RegisterPage from "./pages/registerpage/RegisterPage";
import ProfileWelcomePage from "./pages/profilepage/ProfileWelcomePage";
import ResultPage from "./pages/ResultPage";
import RecipeDetails from "./pages/RecipeDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <RecipeContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfileWelcomePage />} />
            <Route path="login" element={<LoginPage />} /> {/* Login-Seite */}
            <Route path="register" element={<RegisterPage />} />{" "} {/* Register-Seite */}
            <Route path="results" element={<ResultPage />} />
            <Route path="recipe-details/:id" element={<RecipeDetails />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </RecipeContextProvider>
  );
}

export default App;
