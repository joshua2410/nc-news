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

export const getComments = (article_id) => {
  return ncNews
    .get(`/api/articles/${article_id}/comments?limit=30`)
    .then(({ data }) => {
      return data;
    });
};

export const patchArticleVotes = (article_id, votes) => {
  return ncNews.patch(`/api/articles/${article_id}`, votes).then(({ data }) => {
    return data;
  });
};

export const postComment = (article_id, data) => {
  return ncNews
    .post(`/api/articles/${article_id}/comments`, data)
    .then(({ data }) => {
      return data;
    });
};

export const getUsers = () => {
  return ncNews.get(`/api/users`).then(({ data }) => {
    return data;
  });
};

export const deleteComment = (comment_id) => {
  return ncNews.delete(`/api/comments/${comment_id}`);
};
