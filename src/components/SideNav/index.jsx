import React, { useState, useEffect } from 'react';
import "./style.css";


import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';

function getWindowSize() {
   const { innerWidth } = window;
   return { innerWidth };
}

const SideNav = ({ isOpen, setIsOpen, isContentCreator }) => {
   const [windowSize, setWindowSize] = useState(getWindowSize())
   useEffect(() => {
      function handleWindowResize() {
         setWindowSize(getWindowSize())
      }
      window.addEventListener('resize', handleWindowResize)
      return () => {
         window.removeEventListener('resize', handleWindowResize)
      }
   }, [])
   useEffect(() => {
      if (windowSize.innerWidth < 768) {
         setIsOpen(false)
      } else {
         setIsOpen(true)
      }
   }, [setIsOpen, windowSize])
   const menuItem = [
      {
         path: "/home",
         name: "Home",
         icon: <i class="fa-regular fa-home"></i>
      },
      {
         path: "/dashboard",
         name: "Dashboard",
         icon: <i class="fa-regular fa-home"></i>
      },
      {
         path: "/profile",
         name: "Profile",
         icon: <i class="fa-solid fa-circle-user"></i>
      },
      {
         path: "/edit-profile",
         name: "Settings",
         icon: <i class="fa-solid fa-gears"></i>
      },
      {
         path: "/stories",
         name: "Stories",
         icon: <i class="fa-solid fa-clock-rotate-left"></i>
      },
      {
         path: "/bookmarks",
         name: "Bookmarks",
         icon: <i class="fa-regular fa-bookmark"></i>
      },
      {
         path: "/list",
         name: "List",
         icon: <i class="fa-solid fa-list-check"></i>
      },
      {
         path: "/list",
         name: "List",
         icon: <i class="fa-solid fa-list-check"></i>
      },
      {
         path: "/list",
         name: "List",
         icon: <i class="fa-solid fa-list-check"></i>
      },
      {
         path: "/list",
         name: "List",
         icon: <i class="fa-solid fa-list-check"></i>
      },

   ]
   return (
      <div className="contain">
         <div
            style={{ width: isOpen ? "220px" : "60px" }}
            className="sidebar">
            <div className="top_section">
               <Image
                  style={{ height: '30px', width: "100%" }}
                  src={!isOpen ? "/assets/images/logo/App logo-01.png" : "/assets/images/logo/Logo PNG.png"}
               />
               {/* <div style={{ marginLeft: isOpen ? "30px" : "0px", cursor: 'pointer' }} className="bars">
               </div> */}
            </div>
            <hr />
            {
               menuItem.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link" activeclassName="active">
                     <div className="icon">{item.icon}</div>
                     <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                  </NavLink>
               ))
            }
         </div>
      </div>
   );
};

export default SideNav;