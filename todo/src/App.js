import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        <Route path="/" element={<Documentation />} />
        <Route path="/view" element={<Home />} />
        <Route path="/addItem" element={<AddEdit />} />
        <Route path="/update/:id" element={<AddEdit />} />
      </Routes>
    </div>
  );
}

export default App;
