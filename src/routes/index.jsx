import React from 'react'
import {NowPlaying, Popular, TopRated, Upcoming } from '../pages'
import { Route, Routes } from 'react-router'
import {PATH} from '../hooks/usePath'

function CustomRoutes() {
    const routeList = [
        {
            id:1,
            path:PATH.nowPlaying,
            element:<NowPlaying/>
        },
        {
            id:2,
            path:PATH.popular,
            element:<Popular/>
        },
        {
            id:3,
            path:PATH.topRated,
            element:<TopRated/>
        },
        {
            id:4,
            path:PATH.upComing,
            element:<Upcoming/>
        }
    ]
  return (
    <Routes>
        {routeList.map(item => <Route key={item.id} path={item.path} element={item.element}/>)}
    </Routes>
  )
}

export default CustomRoutes