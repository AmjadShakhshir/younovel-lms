import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <ul className="hidden 800px:flex">
        {navItemsData.map((item, index) => (
          <li key={index}>
            <Link href={`${item.link}`} passHref>
              <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[1.1em] px-6 font-Poppins font-[400]`}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {isMobile && (
        <ul className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"}>
              <span className={`text-[1.5em] font-Poppins font-[500] text-black dark:text-white`}>Younovel</span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <li key={index}>
                <Link href="/" passHref>
                  <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[1.1em] px-6 font-Poppins font-[400]`}>{item.name}</span>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default NavItems;
