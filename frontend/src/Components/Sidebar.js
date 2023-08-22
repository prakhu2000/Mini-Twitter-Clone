/* eslint-disable jsx-a11y/img-redundant-alt */
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon, SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = () => {
  let location = useLocation().pathname;
  console.log(location)
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      {/* Twitter Logo */}
      <div className="hoverEffect hover:bg-blue-100">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/584px-Twitter-logo.svg.png"
          width="50px"
          height="50px"
          alt="Twitter Icon"
          className="p-1"
        />
      </div>
      {/* Menu */}
      
      <div className="mt-4 mb-2.5 xl:items-start">
        <div onClick={()=>window.location.href="/"}><SidebarMenuItem text="Home" Icon={HomeIcon} active={location==='/'}/></div>
        <div onClick={()=>window.location.href="/find"}><SidebarMenuItem text="Find People" Icon={SearchIcon} active={location==='/find'}/></div>
        {/* <SidebarMenuItem text="Notifications" Icon={BellIcon} /> */}
        {/* <SidebarMenuItem text="Messages" Icon={InboxIcon} /> */}
        {/* <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} /> */}
        {/* <SidebarMenuItem text="Lists" Icon={ClipboardIcon} /> */}
        <div onClick={()=>window.location.href="/profile"}><SidebarMenuItem text="Profile" Icon={UserIcon} active={location==='/profile'}/></div>
        {/* <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} /> */}
      </div>
      <button className="bg-red-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
      onClick={()=>{localStorage.removeItem('token'); window.location.reload();}}
      >
        Logout
      </button> 
    </div>
  );
};

export default Sidebar;
