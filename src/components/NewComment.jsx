import { postComment } from "../axiosFunctions";
import { useState } from "react";
const NewComment = ({ article_id, comments, setComments, loggedInUser }) => {
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    postComment(article_id, { username: loggedInUser, body: input }).then(
      ({ comment }) => {
        setComments([comment, ...comments]);
        setInput("");
      }
    );
  };
  return (
    <div className="new_comment_footer">
      {loggedInUser ? (
        <form
          className="comment_form"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            onChange={(e) => {
              inputHandler(e);
            }}
            className="new_comment_input"
            type="text"
            placeholder="New Comment"
            value={input}
          />

          <button type="submit">Post</button>
        </form>
      ) : (
        <strong>Please login first to post a comment</strong>
      )}
    </div>
  );
};

export default NewComment;
