import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Articles from "./components/Articles";
import ArticlePage from "./components/Articlepage";

function App() {
  return (
    <>
      <Link to="/articles">
        <button type="submit">
          Articles button will be replaced with nav bar and new homescreen
        </button>
      </Link>
      <div>
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
