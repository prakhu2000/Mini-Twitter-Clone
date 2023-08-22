import React from 'react'
import { follow_user } from '../controllers/tweetRoutes'


const PeopleCard = ({user}) => {
    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200">
            {/* user image */}
            <img
                className="h-11 w-11 rounded-full mr-4"
                src={`https://source.unsplash.com/random/1128%C3%97192/?profile_${user._id}`}
                alt="Profile picture"
            />
            {/* Right Side */}
            <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                    {/* User info */}
                    <div className="flex items-center space-around whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                            {user.username}
                        </h4>
                                <div className="flex items-center space-x-1 px-4 whitespace-nowrap"
                                    onClick={() => follow_user({ userId: user._id }).then((res) => alert(res.message))}
                                >
                                    follow
                                </div>
                        <span className="text-sm sm:text-[15px]">@{user.username} - </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PeopleCard