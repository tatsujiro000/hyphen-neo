import { useEffect, useState } from 'react';
import Link from "next/link";
import type { InferGetStaticPropsType, NextPage } from "next";//後で調べる
import { client } from "libs/client";
import type { Gift, Prefecture } from "types/gift";
import Image from 'next/image'

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import FixedBottomNavigation from '../components/Footer'

// microCMSへAPIリクエスト
export const getStaticProps = async () => {
  const gifts = await client.get({ endpoint: "gifts" });
  const prefectures = await client.get({ endpoint: "prefectures" });

  return {
    props: {
      gifts: gifts.contents,
      prefectures: prefectures.contents,
    },
  };
};



// Props（giftsとprefecture）の型
type Props = {
  gifts: Gift[];
  prefectures: Prefecture[];
};



const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  gifts,
  prefectures,
}: Props) => {
  const [showGifts, setShowGifts] = useState(gifts)
  const prefectureList = prefectures.map((prefecture) => prefecture.prefecture_name);

  useEffect(() => {
    setShowGifts(gifts);
  }, []);

  // useEffect(() => {
  //   const postData = async () => {
  //     await fetch('/api/gift', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ title: 'test' }),
  //     });
  //   };
  //   postData();
  // }, []);

  const selectPrefecture = (prefectures: string) => {
    console.log("はっか")
    if (prefectures === "all") {
      setShowGifts(gifts);
    } else {
      const selectPrefecture = gifts.filter((gift) => {
        const haveTags = gift.prefectures.map((prefecture) => prefecture.prefecture_name);
        return haveTags.includes(prefectures);
      });
      setShowGifts(selectPrefecture);
    }
  
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>

        <div>
          <List>
            <Typography>
              # 都道府県
            </Typography>

            <ListItemButton onClick={() => selectPrefecture("all")}>
              <ListItemText primary="All"/>  
            </ListItemButton>


            {prefectureList.map((prefecture) => (
              <ListItemButton key={prefecture} onClick={() => selectPrefecture(prefecture)}>
                <ListItemText primary={prefecture}/>
              </ListItemButton>
            ))}
          </List>
        </div>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>

              {!showGifts.length && <p>There are no posts...</p>}
              {showGifts.map((gift) => (

                <Grid item xs={12} sm={4} key={gift.id} sx={{ p: 1, marginRight: 'auto' }}>

                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea href={`/gift/${gift.id}`}>
                        <CardMedia
                          component="img"
                          width="100%"
                          height="auto"
                          image={`/images/${gift.image}`}
                          alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {gift.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {gift.body}
                            </Typography>

                              {gift.prefectures.map((prefecture) => (
                                  <Typography variant="body2" color="text.secondary">
                                    #{prefecture.prefecture_name}
                                  </Typography>
                              ))}
                        </CardContent>
                    </CardActionArea>
                  </Card>

                    
                </Grid>
              ))}

          </Grid>
        </Box>


        <FixedBottomNavigation />
        
    </>
  )
}

export default Home;
