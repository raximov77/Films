import React, { useEffect, useState} from 'react';
import { useAxios } from '../hooks/useAxios';
import { API_KEY } from '../hooks/useEnv';
import MovieCard from '../components/MovieCard';
import { Pagination } from '@mui/material';

function MoviePage({URL}) {
  const [data, setdata] = useState([])
  const [page, setPage] = useState(1)
  const [totalpage, setTotalPage] = useState(0)
  
  useEffect(() => {
    useAxios().get(`movie/${URL}?languages=en-US&page=${page}&api_key=${API_KEY}`).then(res => {
      setdata(res.data.results); 
      setTotalPage(res.data.total_pages)
    }, [])
  }, [page])
 
  return (
    <div className='p-5'>
      <div className='flex justify-between flex-wrap p-5'>
        {data.map(item => <MovieCard key={item.id} item={item}/>)}
      </div>
      <div className='flex items-center justify-center mt-5'>
      <Pagination onChange={(a, b) => setPage(b)} size='large' count={totalpage} color="primary" />
      </div>
    </div>
  )
}

export default MoviePage;
