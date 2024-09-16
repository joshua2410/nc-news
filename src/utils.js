import axios from "axios";
import Articles from "./components/articles";

const ncNews = axios.create({
  baseURL: "https://news-board-e14n.onrender.com",
});

export const getAllArticles = () => {
  return ncNews.get("/api/articles").then(({ data }) => {
    return data;
  });
};
