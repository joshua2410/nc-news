import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://news-board-e14n.onrender.com",
});

export const getAllArticles = () => {
  return ncNews.get("/api/articles").then(({ data }) => {
    return data;
  });
};

export const getArticle = (article_id) => {
  return ncNews.get(`/api/articles/${article_id}`).then(({ data }) => {
    return data;
  });
};

export const timeConverter = (unformatted) => {
  const regex = /\d+-\d+-\d+/;
  const time = unformatted.match(regex);
  return time[0];
};
