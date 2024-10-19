import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IMG_URL } from '../hooks/useEnv';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function MediaCard({ movie }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)', 
          boxShadow: 6, 
        },
      }}
    >
      <CardMedia
        sx={{
          cursor:'pointer',
          height: 420, 
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          objectFit:'contain',
        }}
        image={`${IMG_URL}${movie.poster_path}`}
        title={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            height: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions className='flex gap-[10px] !p-[10px]'>
        <FavoriteBorderIcon className='cursor-pointer scale-[1.2]'/>
        <ShoppingCartIcon  className='cursor-pointer scale-[1.2]'/>
      </CardActions>
    </Card>
  );
}


