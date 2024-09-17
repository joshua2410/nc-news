import { useEffect, useState } from "react";
import { getArticle, getComments } from "../axiosFunctions";
import { useParams } from "react-router-dom";
import { timeConverter } from "../utils";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    getArticle(article_id)
      .then(({ article }) => {
        setArticlePage(article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{articlePage.title}</h1>
          <em>
            by {articlePage.author} {timeConverter(articlePage.created_at)} ♡{" "}
            {articlePage.votes}
          </em>
          <img
            className="article_page_pic"
            src={articlePage.article_img_url}
          ></img>
          <p>{articlePage.body}</p>
          {commentsClicked ? (
            <>
              <p
                onClick={(e) => {
                  setCommentsClicked(false);
                }}
              >
                {articlePage.comment_count} Comments{" "}
                <i className="arrow_down"></i>
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
              {articlePage.comment_count} Comments{" "}
              <i className="arrow_right"></i>
            </p>
          )}
        </>
      )}
    </>
  );
};
export default ArticlePage;
