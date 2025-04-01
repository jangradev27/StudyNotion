import React, { useEffect, useState } from 'react';
import { Link, matchPath, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { AccType } from '../../utils/constants';
import { IoCartOutline } from 'react-icons/io5';
import ProfileDropDown from '../core/auth/ProfileDropDown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/api';
// const sublinks=[
//   {
//     Name:"dev",
//     path:"/dev"
//   }
// ]
export const Navbar = () => {
  const { token,User} = useSelector((state) => state.auth);

  const { totalItems } = useSelector((state) => state.Cart);
  const location = useLocation();
  const [sublinks, setSubLinks] = useState([]);

  // Function to check if a route matches the current location
  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  // Fetch sublinks for categories
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API);
      
      setSubLinks(result.data.Data);
    } catch (err) {
      console.error('Error fetching sublinks:', err.message); 
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  return (
    <div className="flex h-14 justify-center border-b-[1px] border-b-rich-black-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between text-white">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="StudyNotion" width={160} height={32} />
        </NavLink>

        {/* Navigation */}
        <nav>
          <ul className="hidden md:flex gap-x-6 text-rich-black-25">
            {NavbarLinks.map((ele, index) => (
              <li key={index}>
                {ele.title === 'Catalog' ? (
                  <div className="relative group">
                    <p className="flex items-center text-rich-black-100 cursor-pointer">
                      {ele.title} <IoIosArrowDown className="relative top-[3px]" />
                    </p>

                    {/* Dropdown Menu */}
                    <div className="absolute left-[50%] -translate-x-[50%] translate-y-[10%] 
                    invisible flex flex-col rounded-md bg-rich-black-5 p-4 text-rich-black-900 
                    opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 
                    w-[15rem] z-[3]">
                      <div className="absolute left-[50%] top-0 h-5 w-10 rotate-45 z-[-1] 
                      rounded-sm bg-rich-black-5"></div>

                      {sublinks.length > 0 &&
                        sublinks.map((sub, subIndex) => (
                          <NavLink
                            key={subIndex}
                            to={`/${sub.Name}`}
                            className="w-full p-2 flex text-lg hover:bg-rich-black-100 rounded-md transition-all duration-200"
                          >
                            {sub.Name}
                          </NavLink>
                        ))}
                    </div>
                  </div>
                ) : (
                  <Link to={ele.path} className={`${matchRoute(ele.path) ? 'text-yellow-50' : 'text-rich-black-100'} flex items-center`}>
                    {ele.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section (Cart, Auth Links, Profile) */}
        <div className="flex gap-4 items-center">
          {/* Cart (Only for non-instructors) */}
          {User && User.accountType !== AccType.Instructor && (
            <Link to="/dashboard/cart" className="relative">
              <IoCartOutline size={24} />
              {totalItems > 0 && <span className="absolute z-[2] text-red-500 rounded-[40%] text-sm">{totalItems}</span>}
            </Link>
          )}

          {/* Login & Signup Links */}
          {!token && (
            <>
              <Link to="/login" className="rounded-lg w-fit p-2 text-lg bg-rich-black-500 hover:scale-95 hover:text-rich-black-50 text-white transition-all">
                Login
              </Link>
              <Link to="/signup" className="rounded-lg w-fit p-2 text-lg bg-rich-black-500 hover:scale-95 hover:text-rich-black-50 text-white transition-all">
                SignUp
              </Link>
            </>
          )}

          {/* Profile Dropdown (For Logged-in Users) */}
          {token && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
