import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import { fetchData, scrape } from "../helpers/FetchData";
import {useParams} from "react-router-dom"


export interface newsStruct {
  id : number;
  author : string;
  content : string;
  created : string;
  image : string;
  source : string;
  summary : string;
  title : string;
  created_ad : string;  
}


const HomePage : React.FC = () => {
  const params = useParams();
  const [data, setData] = useState<newsStruct[]>([]);

  const handleRefresh = async()=>{
    await scrape(params.source!);
    await fetchData(params.source!);
  }

  useEffect(() => {
    const getInitialData = async () => {
      const data = await fetchData(params.source!);
      setData(data)
    };
    getInitialData();
  }, [params.source]);



  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2}>
        <Sidebar />
        <Feed data={data} onClickRefreshHandler = {handleRefresh}  />
      </Stack>
    </Box>
  );
};

export default HomePage;
