import React, { useState } from 'react';
import "./style.css";


import { NavLink } from 'react-router-dom';
import { Image } from 'react-bootstrap';


const SideNav = () => {
   const [isOpen, setIsOpen] = useState(true);
   const toggle = () => setIsOpen(!isOpen);
   const menuItem = [
      {
         path: "/home",
         name: "Home",
         icon: <i class="fas fa-home"></i>
      },
      {
         path: "/explore",
         name: "Explore",
         icon: <i class="fa-regular fa-compass"></i>
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
         path: "/dashboard",
         name: "Dashboard",
         icon: <i class="fa-solid fa-gauge"></i>
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

   ]
   return (
      <div className="contain">
         <div
            style={{ width: isOpen ? "200px" : "50px" }}
            className="sidebar">
            <div className="top_section">
               <Image
                  style={{ width: '50px', height: '50px' }}
                  src={isOpen ? "/assets/images/logo/App logo-01.png" : "/assets/images/logo/Logo PNG.png"}
               />
               <div style={{ marginLeft: isOpen ? "50px" : "0px", cursor: 'pointer' }} className="bars">
                  <i class="fa-solid fa-bars-staggered" onClick={toggle}> </i>
               </div>
            </div>
            <hr />
            {
               menuItem.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link" activeclassName="acti
                  ve">
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