import news from "../data/news.json";
export const getRecentNews = () => {
  const newsList = news;
  newsList.sort((a, b) => new Date(b.date) - new Date(a.date));
  return newsList.slice(0, 8);
};
