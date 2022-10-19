import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Box,
  styled,
} from "@mui/material";
import {
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const StyledImg = styled("img")({
  width: "30px",
  height: "30px",
});

interface FeedCardProps{
  title : string;
  id? : number;
  author : string;
  content : string;
  created : string;
  image : string;
  source : string;
  summary : string;
  created_ad? : string;  

}


const FeedCard : React.FC<FeedCardProps> = (props) => {
  const navigate = useNavigate();
  
  const clickHandler = (event : React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLImageElement> | undefined)=>{
    event?.preventDefault();
    navigate('/login', {props : props} as never)    
  
    

  }
  
  return (
    <Box gap={20}>
      <Card 
        sx={{
          maxWidth: "300px",
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 7,
        }}
      >
        <CardHeader onClick={clickHandler}
          
          title={props.title}
          component={Link}
          subheader={props.created}
          to="/"
        />
        <CardMedia
        onClick={clickHandler}
          sx={{ height: "190px", width: "100%" }}
          component="img"
          image={props.image}
          alt="Paella dish"
          
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {props.summary}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
          <Checkbox icon={<BookmarkBorder />} checkedIcon={<Bookmark />} />
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FeedCard;
