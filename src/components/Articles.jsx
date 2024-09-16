import { useEffect, useState } from "react";
import { getAllArticles, timeConverter } from "../axiosFunctions";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAllArticles()
      .then(({ articles }) => {
        setAllArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <div className="articles_container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {allArticles.map((article) => {
            const time = timeConverter(article.created_at);
            return (
              <div
                key={article.article_id}
                onClick={(e) => {
                  navigate(`/articles/${article.article_id}`);
                }}
              >
                <strong>{article.title}</strong>
                <img
                  src={article.article_img_url}
                  alt={`picture relating to ${article.title}`}
                ></img>
                <em>by {article.author}</em>
                <em> {time}</em>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
export default Articles;
