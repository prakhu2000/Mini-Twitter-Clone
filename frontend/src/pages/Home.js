import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
import { is_Authenticated } from '../controllers/userRoutes'
const Home = () => {
    useEffect(()=>{
        is_Authenticated().then((res)=>{
            if(res.message===false) window.location.href="/login"
        })
    },[])
    return (
        <>
            <Sidebar/>
            <Feed />
            <Widgets />
        </>
    )
}

export default Home