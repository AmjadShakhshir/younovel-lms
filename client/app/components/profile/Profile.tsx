import React, { FC, useState } from "react";

import { useScrollActive } from "../../helper/useScrollActive";
import SideBarProfile from "./SideBarProfile";
import { User } from "../../types/User";

type Props = {
  user: User;
};

const Profile: FC<Props> = ({ user }) => {
  const scroll = useScrollActive(85);
  const [active, setActive] = useState<number>(1);
  const [avatar, setAvatar] = useState<string>("");

  const logoutHandler = async () => {
    console.log("Logout");
  };

  return (
    <section className="w-[85%] flex mx-auto">
      <section
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile user={user} active={active} avatar={avatar} setActive={setActive} logoutHandler={logoutHandler} />
      </section>
    </section>
  );
};

export default Profile;
