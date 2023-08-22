import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Feed from '../Components/Feed'
import Widgets from '../Components/Widgets'
import { is_Authenticated, my_profile } from '../controllers/userRoutes'
import Followers from '../Components/Followers'
import Following from '../Components/Following'

const Profile = () => {
    const [user, setUser] = useState({})
    const [show,setShow]=useState('')
    useEffect(() => {
        is_Authenticated().then((res) => {
            if (res.message === false) window.location.href = "/login"
        })
        my_profile().then((res) => setUser(res.message))
    }, [])
    return (
        <>
            <Sidebar />
            <div className="xl:ml-[260px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
                <div >
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img className="w-32 h-32 rounded-full mx-auto" src="https://source.unsplash.com/random/200x200/?profile-picture" alt="John Doe" />
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user?.username}</h3>
                            <table className="text-xs my-3">
                                <tbody><tr>
                                    <td style={{cursor:"pointer"}} className="px-2 py-2 text-gray-500 font-semibold"
                                    onClick={()=>setShow('followers')}
                                    >Followers</td>
                                    <td className="px-2 py-2">{user?.followers?.length}</td>
                                </tr>
                                    <tr>
                                        <td  style={{cursor:"pointer"}}className="px-2 py-2 text-gray-500 font-semibold"
                                        onClick={()=>setShow('following')}
                                        >Following</td>
                                        <td className="px-2 py-2">{user?.following?.length}</td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        
                            {
                            (show) &&
                                (show === 'followers') 
                                ?
                                    <>
                                    Followers
                                    <br/>
                                    {user.followers?.map((u) => (
                                        <Followers key={u._id} user={u} />
                                    ))}</>
                                : (show === 'following') ?
                                <>
                                Following
                                    <br/>
                                {user.following?.map((u) => (
                                        <Following key={u._id} user={u} />
                                    ))}
                                </>:<></>
                            }
                    </div>


                </div>
            </div>

            <Widgets />
        </>
    )
}

export default Profile