export const fetchData = async (source: string) => {
  const sendRequest = async (source: string) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/news/newslist/?search=${source}`
    );
    const data = response.json();
    return data;
  };
  const data = await sendRequest(source);

  if (!data) {
    await scrape(source);
    const response = await sendRequest(source);
    return response;
  }

  return data;
};

export const scrape = async (source: string) => {
  let urlKeyword: string;

  switch (source) {
    case "nagarik":
      urlKeyword = "nagarikscraper";

      break;
    case "onlinekhabar":
      urlKeyword = "onlinekhabarscraper";

      break;

    case "ekantipur":
      urlKeyword = "ekanscraper";

      break;

    default:
      urlKeyword = "ekanscraper";
      break;
  }
  const url = `http://127.0.0.1:8000/api/news/${urlKeyword}`;

  await fetch(url);

  return true;
};
