import React, { useEffect, useState } from 'react'
import { find_people, is_Authenticated } from '../controllers/userRoutes'
import PeopleCard from '../Components/PeopleCard';
import { SparklesIcon } from '@heroicons/react/solid'
import Sidebar from '../Components/Sidebar';
import Widgets from '../Components/Widgets';

const People = () => {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        is_Authenticated().then((res)=>{
            if(res.message===false) window.location.href="/login"
        })
        find_people().then((res)=>{console.log(res); setUsers(res.message)})
    },[users])
  return (
    <>
    <Sidebar/>
    <div className="xl:ml-[260px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50  bg-white justify-between items-center border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">People</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      {users?.map((user) => (
        <PeopleCard key={user._id} user={user} />
      ))}
    </div>
    <Widgets/>
    </>
  )
}

export default People