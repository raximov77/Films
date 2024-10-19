import React, { useEffect, useState } from 'react';
import { useAxios } from '../hooks/useAxios';
import { API_KEY } from '../hooks/useEnv';
import Card from '../components/Card';

function Nowplaying() {
  const [movies, setMovies] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const res = await axiosInstance.get(`movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`);
        setMovies(res.data.results); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchNowPlayingMovies();
  }, [axiosInstance]);

  return (
    <div className='pl-2 pr-[3px] bg-slate-300'>
      <h1 className='text-[27px] font-extrabold text-[#1e1d1d] ml-5'>Now Playing</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} /> 
        ))}
      </div>
    </div>
  );
}

export default Nowplaying;
