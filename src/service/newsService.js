import news from "../data/news.json";
const getRecentNews = () => {
  news.sort((a, b) => new Date(b.date) - new Date(a.date));
  return news.slice(0, 8);
};
const getNews = () => {
  return news;
};
const getNewsById = (id) => {
  return news.find((news) => news.id === id);
};
const newsService = {
  getRecentNews,
  getNews,
  getNewsById,
};
export default newsService;
