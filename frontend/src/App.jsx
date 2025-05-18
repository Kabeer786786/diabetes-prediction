import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [modelName, setModelName] = useState('RFC');
  useEffect(() => {
    async function loadModel() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/patients/load-model/", {
          "modelName": modelName
        });
        console.log(response);
      } catch (error) {
        console.error("Invalid Model : ", error);
      }
    }
    loadModel();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home modelName={modelName} setModelName={setModelName} />} />
        <Route path="/form" element={<FormPage modelName={modelName} setModelName={setModelName} />} />
      </Routes>
    </Router>
  );
}

export default App;
