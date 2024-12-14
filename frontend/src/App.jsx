import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage';
import HomePage from './components/homepage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </Router>
  )
}

export default App
