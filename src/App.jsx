import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MemoryAids from "./pages/MemoryAids";
import DailyTasks from "./pages/DailyTasks";
import Register from "./pages/Register";

import  { useEffect } from "react"; 
import axios from "axios";

function App() {
  
useEffect(() => {
  axios
    .get("http://localhost:5000/api/test")
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory-aids" element={<MemoryAids />} />
          <Route path="/daily-tasks" element={<DailyTasks />} />
          <Route path="/register" element={<Register />} />
    
       

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
