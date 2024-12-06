import HomePage from "./components/HomePage";
import Details from "./components/Details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
function App() {
  return (
    <Router>
      <Welcome />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/:cityName" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
