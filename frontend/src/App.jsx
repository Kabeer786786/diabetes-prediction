import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
