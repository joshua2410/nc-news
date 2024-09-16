import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/articles";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
