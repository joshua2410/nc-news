import { useState, useEffect } from "react";
import { getComments } from "../axiosFunctions";
import { timeConverter } from "../utils";
import NewComment from "./NewComment";

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
  console.log(comments);
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
          <NewComment
            article_id={article_id}
            comments={comments}
            setComments={setComments}
          ></NewComment>
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
