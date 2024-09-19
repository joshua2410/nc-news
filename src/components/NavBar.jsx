import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../axiosFunctions";

const NavBar = ({ loggedInUser, setLoggedInUser }) => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [submitFailed, setSubmitFailed] = useState(false);
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    users.forEach((user) => {
      if (user.username === input) {
        e.preventDefault();
        setLoggedInUser(input);
      }
    });
    e.preventDefault();
    setSubmitFailed(true);
  };
  useEffect(() => {
    getUsers()
      .then(({ users }) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {loggedInUser ? (
        <p>logged in as {loggedInUser}</p>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <label>login: </label>
            <input
              onChange={(e) => {
                inputHandler(e);
              }}
              type="text"
              placeholder="username"
              className={`${submitFailed ? "invalid_user" : null}`}
            ></input>
            <button type="submit">login</button>
          </form>
        </div>
      )}
      <Link to="/articles">
        <button type="submit">Articles</button>
      </Link>
    </>
  );
};
export default NavBar;
