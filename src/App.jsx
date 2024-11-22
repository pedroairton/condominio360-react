import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Moradores from "./components/Moradores";
import AdminWidgets from "./components/AdminWidgets";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/" element={<AdminWidgets/>}></Route>
            <Route path="/admin/moradores" element={<Moradores/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
