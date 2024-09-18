import { postComment } from "../axiosFunctions";
import { useState } from "react";
const NewComment = ({ article_id, comments, setComments }) => {
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    postComment(article_id, { username: "cooljmessy", body: input }).then(
      ({ comment }) => {
        console.log(comment);
        setComments([comment, ...comments]);
        setInput("");
      }
    );
  };
  return (
    <div className="new_comment_footer">
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
    </div>
  );
};

export default NewComment;
