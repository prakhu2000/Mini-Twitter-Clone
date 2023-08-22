/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import moment from "moment"
import { edit_tweet, delete_tweet, follow_user, unfollow_user } from "../controllers/tweetRoutes";
import { useEffect, useState } from "react"
import { is_follower } from "../controllers/userRoutes";

const Post = ({ post }) => {
  const displayDate = (date) => {
    var parsedDate = moment(date)
    var formattedDate = parsedDate.format("ddd, MMM DD, YYYY");
    return (formattedDate);
  }
  const isMe = () => {
    return (post.author._id === JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId);
  }
  const editPost = async () => {
    const id = post._id;
    const content = prompt("Edit your tweet here", post.content)
    await edit_tweet({ id, content }).then((res) => alert(res.message));
    window.location.reload()
  }
  const deletePost = async () => {
    const id = post._id;
    await delete_tweet({ id }).then((res) => alert(res.message));
    window.location.reload()
  }
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={`https://source.unsplash.com/random/1128%C3%97192/?profile_${post._id}`}
        alt="Profile picture"
      />
      {/* Right Side */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* User info */}
          <div className="flex items-center space-around whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.author.username}
            </h4>
            {(isMe()) ? <div className="flex items-center space-x-1 px-3 whitespace-nowrap"></div> :
                <div className="flex items-center space-x-1 px-3 whitespace-nowrap"
                onClick={()=>unfollow_user({userId:post.author._id}).then((res)=>alert(res.message))}
                >
                  unfollow
                </div>
            }
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {displayDate(post.createdAt)}
            </span>
          </div>
          {/* dot icon */}
          {/* <DotsHorizontalIcon className="h-10 w-10 hoverEffect hover:bg-sky-100 hover:text-sky-500 p-2" /> */}
        </div>
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.content}
        </p>
        <div className="flex justify-between text-gray-500 p-2">
          {isMe() && <>
            <PencilIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={editPost}
            />
            <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              onClick={deletePost}
            />
          </>}
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;
