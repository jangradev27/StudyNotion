import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClickOutside from "../../../hook/ClickOutside";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../../services/operation/Auth";



const ProfileDropDown = () => {
  const navigate=useNavigate()
    const [isOpen, setOpen] = useState(false);
    const menuref = useRef(null);
    const dispatch=useDispatch();

    // Use ClickOutside hook to detect outside clicks
    ClickOutside(menuref, () => setOpen(false));

    const { profile:User } = useSelector((state) => state.profile);
 
    // Ensure user exists before using properties
    if (!User) return ;

    const handleLogout=()=>{
        dispatch(Logout(navigate));
    }

    return (
        <div className="relative">
            {/* Button for toggling dropdown */}
            <button onClick={() => setOpen(!isOpen)} className="flex items-center gap-x-1 cursor-pointer">
                <img
                    src={User?.Image || "/default-profile.png"}
                    alt={`profile-${User?.firstname || "User"}`}
                    className="aspect-square w-[30px] rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-rich-black-100" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div ref={menuref} className="absolute bg-rich-black-700 border-rich-black-600 border-[1px] z-[2] rounded-lg top-8 -right-1 w-[8rem]  ">
                    <Link to={"/dashboard/my-profile"}  >
                      <div className=" w-full  p-2 hover:bg-rich-black-500 rounded-lg border-rich-black-600  border-b-[1px] transition-all text-rich-black-200 flex justify-center items-center hover:text-rich-black-100 ">
                        DashBoard
                      </div>
                    
                    </Link>

                    <button onClick={handleLogout} className="w-full  p-2 hover:bg-rich-black-500 rounded-lg border-b-[1px] transition-all text-rich-black-200 flex justify-center items-center  border-rich-black-600 hover:text-rich-black-100 ">
                      Log Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropDown;
