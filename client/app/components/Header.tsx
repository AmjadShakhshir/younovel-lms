"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { handleClose } from "../helper/handleClose";
import { useScrollActive } from "../helper/useScrollActive";
import CustomModal from "../utils/CustomModal";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import Verification from "../components/auth/Verification";
import useAppSelector from "../../hooks/useAppSelector";
import avatar from "../../public/assets/avatar.jpg";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: (route: string) => void;
  route: string;
};

const routeComponentMap: { [key: string]: FC<Props> } = {
  Login: Login,
  "Sign-Up": SignUp,
  Verification: Verification,
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const active = useScrollActive(80);
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarClose = handleClose(setOpenSidebar);
  const { user } = useAppSelector((state) => state.auth);
  const RouteComponent = routeComponentMap[route.toString()];

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b h-[80px] z-[80] dark:border-[#ffffff1c] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex justify-between items-center p-3">
            <Link href={"/"}>
              <span className={`text-[1.5em] font-Poppins font-[500] text-black dark:text-white`}>Younovel</span>
            </Link>

            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3 size={25} className="cursor-pointer dark:text-white text-black" onClick={() => setOpenSidebar(!openSidebar)} />
              </div>

              {Object.keys(user).length > 0 ? (
                <>
                  <Image src={user.avatar ? user.avatar.url : avatar} alt="avatar" className="rounded-full cursor-pointer" width={30} height={30} />
                </>
              ) : (
                <>
                  <HiOutlineUserCircle size={25} className="cursor-pointer dark:text-white text-black ml-5 my-2" onClick={() => setOpen(true)} />
                </>
              )}
            </div>
          </div>
        </div>
        {/* only for mobile */}
        {openSidebar && (
          <div className="fixed w-full h-screen top-0 left-0 dark:bg-[unset] dark:bg-[#00000024] z-[99999]" onClick={handleSidebarClose} id="screen">
            <div className="w-[70%] fixed z-[99999] top-0 right-0 h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90">
              <NavItems activeItem={activeItem} isMobile={true} />
              {Object.keys(user).length > 0 ? (
                <>
                  <Image src={user.avatar ? user.avatar.url : avatar} alt="avatar" className="w-[30px] h-[30px] rounded-full cursor-pointer" width={30} height={30} />
                </>
              ) : (
                <HiOutlineUserCircle size={25} className="cursor-pointer dark:text-white text-black ml-5 my-2" onClick={() => setOpen(true)} />
              )}
              <div className="mt-[1em]" />
              <div className="mt-[1em]" />
              <p className="text-[1em] px-2 pl-5 text-black dark:text-white">Copyright © {new Date().getFullYear()} Younovel</p>
            </div>
          </div>
        )}
      </div>
      {open && RouteComponent && <CustomModal open={open} setOpen={setOpen} setRoute={setRoute} activeItem={activeItem} component={RouteComponent} />}
    </div>
  );
};

export default Header;
