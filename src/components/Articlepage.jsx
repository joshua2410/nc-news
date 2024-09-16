import { useEffect, useState } from "react";
import { getArticle, timeConverter } from "../axiosFunctions";
import { useParams } from "react-router-dom";
const ArticlePage = () => {
  const { article_id } = useParams();
  const [articlePage, setArticlePage] = useState([]);
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticle(article_id)
      .then(({ article }) => {
        setArticlePage(article);
        setTime(timeConverter(article.created_at));
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
            by {articlePage.author} {time} ♡ {articlePage.votes}
          </em>
          <img
            className="article_page_pic"
            src={articlePage.article_img_url}
          ></img>
          <p>{articlePage.body}</p>
          <p>
            {articlePage.comment_count} comments will be here in a drop down
          </p>
        </>
      )}
    </>
  );
};
export default ArticlePage;
