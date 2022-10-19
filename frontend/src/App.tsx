import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/:source" element={<HomePage/>}>

            <Route path="/home/:source/:id" element={<DetailPage/>}/>
          
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
