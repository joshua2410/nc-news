import { useState, useEffect } from "react";
import { getComments } from "../axiosFunctions";
import { timeConverter } from "../utils";
import NewComment from "./NewComment";
import DeleteComment from "./DeleteComment";

const Comments = ({ article_id, articlePage, loggedInUser }) => {
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
                  <DeleteComment
                    comment_id={comment.comment_id}
                    loggedInUser={loggedInUser}
                    username={comment.author}
                    comments={comments}
                    setComments={setComments}
                  ></DeleteComment>
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
            loggedInUser={loggedInUser}
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
