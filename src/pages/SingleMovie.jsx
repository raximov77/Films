import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAxios } from '../hooks/useAxios'
import { API_KEY, IMG_URL } from '../hooks/useEnv'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'

function SingleMovie() {
    const {id} = useParams()
    const [singleData, setsingleData] = useState({})
    const [videos, setvideos] = useState([])
    const [actors, setActors] = useState([])

    useEffect(() => {
        useAxios().get(`/movie/${id}?api_key=${API_KEY}`).then(res => setsingleData(res.data))     
    }, [id]); 

    useEffect(() => {
        useAxios().get(`/movie/${id}/videos?api_key=${API_KEY}`).then(res => setvideos(res.data.results.splice(0, 5)))      
    }, [id]); 

    useEffect(() => {
        useAxios().get(`/movie/${id}/credits?api_key=${API_KEY}`).then(res => setActors(res.data.cast))      
    }, [id]); 
    
    function handleErrorImg(e){
        e.target.src = ""
    }

  return (
    <div className='flex justify-between p-5'>
        <div className='p-5 space-y-5 rounded-md border-[2px] h-[85vh] overflow-y-auto border-slate-500 w-[20%]'>
            {actors.map((item, index) => (
                <div className='p-2 rounded-md bg-slate-200' key={index}>
                    {item.profile_path && (<img onError={handleErrorImg} className='rounded-md mb-2' src={`${IMG_URL}${item.profile_path}`} alt="Actor img" width={"100%"} />)}
                    <h2 className="text-center"><strong>Name:</strong> {item.name}</h2>
                    <h2 className="text-center"><strong>Character:</strong> {item.character}</h2>
                </div>
            ))}
        </div>
        <div className='p-5 rounded-md border-[2px] h-[85vh] overflow-y-auto border-slate-500 w-[50%]'>
            <h2 className='font-bold text-[33px] text-center mb-5'>{singleData.title}</h2>
            <img className='rounded-md mb-5' src={`${IMG_URL}${singleData.poster_path}`} alt="Movie img" width={"100%"} />
            <p className='text-[20px] text-slate-400'>{singleData.overview}</p>
            <div className='flex items-center mt-5 space-x-5'>
            <strong className='text-[20px]'>Genres:</strong> {singleData?.genres?.map(item => <Button key={item.id} variant='outlined' size='medium'>{item.name}</Button>)}
            </div>
            <div className='mt-5'>
                <strong className='text-[20px]'>View full video:</strong> <Link target='_blank' className='text-blue-500' to={singleData.homepage}>{singleData.homepage}</Link>
            </div>
            <div className='flex items-center mt-5 space-x-5'>
            <strong className='text-[20px]'>Languages:</strong> {singleData?.spoken_languages?.map((item, index) => <Button key={index} variant='outlined' size='medium'>{item.name}</Button>)}
            </div>
        </div>
        <div className='p-5 space-y-5 rounded-md border-[2px] h-[85vh] overflow-y-auto border-slate-500 w-[29%]'>
            {videos.map(item => <YouTube key={item.id} id={item.id} videoId={item.key}/>)}
        </div>
    </div>
  )
}

export default SingleMovie