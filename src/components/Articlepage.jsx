import { useEffect, useState } from "react";
import { getArticle } from "../axiosFunctions";
import { useParams } from "react-router-dom";
import { timeConverter } from "../utils";
import Votes from "./Votes";
import Comments from "./Comments";

const ArticlePage = ({ loggedInUser }) => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [articleVotes, setArticleVotes] = useState(0);
  console.log(loggedInUser);
  useEffect(() => {
    getArticle(article_id)
      .then(({ article }) => {
        setArticlePage(article);
        setIsLoading(false);
        setArticleVotes(article.votes);
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
        <div className="article_page">
          <h1>{articlePage.title}</h1>
          <em className="article_info">
            by {articlePage.author} {timeConverter(articlePage.created_at)} ♡{" "}
            {articleVotes}
            <Votes
              article_id={article_id}
              articleVotes={articleVotes}
              setArticleVotes={setArticleVotes}
            ></Votes>
          </em>
          <img
            className="article_page_pic"
            src={articlePage.article_img_url}
          ></img>
          <p>{articlePage.body}</p>
          <Comments
            articlePage={articlePage}
            article_id={article_id}
            loggedInUser={loggedInUser}
          ></Comments>
        </div>
      )}
    </>
  );
};
export default ArticlePage;
