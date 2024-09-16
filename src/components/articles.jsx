import { useEffect, useState } from "react";
import { getAllArticles } from "../utils";

const Articles = () => {
  const [allArticles, setAllArticles] = useState([]);
  useEffect(() => {
    getAllArticles()
      .then(({ articles }) => {
        setAllArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(allArticles);
  return (
    <div className="articles_container">
      {allArticles.map((article) => {
        const regex = /\d+-\d+-\d+/;
        const time = article.created_at.match(regex);
        console.log(time);
        return (
          <div key={article.article_id}>
            <strong>{article.title}</strong>
            <img
              src={article.article_img_url}
              alt={`picture relating to ${article.title}`}
            ></img>
            <em>by {article.author}</em>
            <em> {time[0]}</em>
          </div>
        );
      })}
    </div>
  );
};
export default Articles;
