import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Moradores from "./components/Moradores";
import AdminWidgets from "./components/AdminWidgets";
import Mensagens from "./components/Mensagens";
import Encomendas from "./components/Encomendas";
import Reservas from "./components/Reservas";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/" element={<AdminWidgets/>}></Route>
            <Route path="/admin/moradores" element={<Moradores/>}></Route>
            <Route path="/admin/mensagens" element={<Mensagens/>}></Route>
            <Route path="/admin/encomendas" element={<Encomendas/>}></Route>
            <Route path="/admin/reservas" element={<Reservas/>}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
