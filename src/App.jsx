import "./App.css";
import { Route, Routes } from "react-router-dom";
import Articles from "./components/Articles";
import ArticlePage from "./components/Articlepage";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      ></NavBar>
      <div>
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route
            path="/articles/:article_id"
            element={<ArticlePage loggedInUser={loggedInUser} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
