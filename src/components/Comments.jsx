import { useState, useEffect } from "react";
import { getComments } from "../axiosFunctions";
import { timeConverter } from "../utils";

const Comments = ({ article_id, articlePage }) => {
  const [commentsClicked, setCommentsClicked] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments(article_id)
      .then(({ comments }) => {
        setComments(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {commentsClicked ? (
        <>
          <p
            onClick={(e) => {
              setCommentsClicked(false);
            }}
          >
            {articlePage.comment_count} Comments <i className="arrow_down"></i>
          </p>
          <div className="comments_container">
            {comments.map((comment) => {
              return (
                <div key={comment.comment_id}>
                  <strong>{comment.author}</strong>
                  <p>{comment.body}</p>
                  <small>
                    {timeConverter(comment.created_at)} ♡ {comment.votes}
                  </small>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p
          onClick={(e) => {
            setCommentsClicked(true);
          }}
        >
          {articlePage.comment_count} Comments <i className="arrow_right"></i>
        </p>
      )}
    </>
  );
};

export default Comments;
