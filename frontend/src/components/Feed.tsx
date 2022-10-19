import React from "react";
import { Box, Icon, styled, Typography } from "@mui/material";
import FeedCard from "./FeedCard";
import { newsStruct } from "../pages/HomePage";
import RefreshIcon from '@mui/icons-material/Refresh';

interface FeedProps {
  data: newsStruct[];
  onClickRefreshHandler : ()=>void
}


const StyledTypography = styled(Typography)({
  margin :'1.5rem',
  fontWeight : 500,
  color : "#0e0d4c",
  fontFamily : "Ubuntu, Helvetica, sans-serif"
});



const Feed: React.FC<FeedProps> = ({ data, onClickRefreshHandler }) => {
  console.log(data);

  const today = new Date().toLocaleDateString();

  const todaysNews = data.filter((news) => {
    const newsDate = new Date(news.created).toLocaleDateString();
    return newsDate === today;
  });

  const prevNews = data.filter((news) => {
    const newsDate = new Date(news.created).toLocaleDateString();
    return newsDate !== today;
  });


  return (
    <Box p={2} width="80%">
      <Box display="flex" alignItems="center" justifyContent="center">
      <StyledTypography variant="h4">Latest News From Ekantipur</StyledTypography>
    
        <RefreshIcon sx={{width : "32px", height : "32px"}} onClick={onClickRefreshHandler}/>
        </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="align-left">
      
        {todaysNews.map((newsItem) => {
          return (
            <>
           
              <FeedCard
                key={newsItem.id}
                title={newsItem.title}
                image={newsItem.image}
                author={newsItem.author}
                content={newsItem.content}
                created={newsItem.created}
                source={newsItem.source}
                summary={newsItem.summary}
              />
            </>
          );
        })}      
      
      

        {prevNews.map((newsItem) => {
          return (
            <FeedCard
              key={newsItem.id}
              title={newsItem.title}
              image={newsItem.image}
              author={newsItem.author}
              content={newsItem.content}
              created={newsItem.created}
              source={newsItem.source}
              summary={newsItem.summary}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Feed;
