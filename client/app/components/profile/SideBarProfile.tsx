import Image from "next/image";
import React, { FC } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";

import { User } from "../../types/User";
import avatarDefault from "../../../public/assets/avatar.jpg";
import { styles } from "../../styles/style";

type Props = {
  user: User;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: () => void;
};

const generateCssClasses = (active: number) => {
  const baseClasses = "w-full flex items-center px-3 py-4 cursor-pointer";
  if (active === 1) {
    const activeClasses = "bg-slate-800";
    return `${baseClasses} ${activeClasses}`;
  } else if (active === 2 || active === 3) {
    const activeClasses = "dark:bg-slate-800 bg-white";
    return `${baseClasses} ${activeClasses}`;
  } else {
    return `${baseClasses} bg-transparent`;
  }
};

const SideBarProfile: FC<Props> = ({ user, active, avatar, setActive, logoutHandler }) => {
  const avatarUrl = user?.avatar?.url || avatar || avatarDefault;
  const cssClasses = generateCssClasses(active);

  return (
    <section className="w-full">
      <div className={cssClasses} onClick={() => setActive(1)}>
        <Image src={avatarUrl} alt="avatar" width={20} height={20} className={`${styles.sideBarProfileImage}`} />
        <h5 className={`${styles.sideBarProfileText}`}>My Account</h5>
      </div>
      <div className={cssClasses} onClick={() => setActive(2)}>
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className={`${styles.sideBarProfilePassword}`}>Change Password</h5>
      </div>
      <div className={cssClasses} onClick={() => setActive(3)}>
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className={`${styles.sideBarProfileText}`}>Enrolled Courses</h5>
      </div>
    </section>
  );
};

export default SideBarProfile;
