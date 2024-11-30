"use client";

import { IUser } from "@/types";
import { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/app/_redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";

interface Props {
  user: IUser;
}

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [active, setActive] = useState<any>(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery({}, { skip: !logout ? true : false });

  // if (typeof window !== "undefined") {
  //   window.addEventListener("scroll", function () {
  //     if (window.scrollY > 85) setScroll(true);
  //     else setScroll(false);
  //   });
  // }

  const logoutHandler = async () => {
    try {
      await signOut();
      setLogout(true);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[65%] 800px:w-[310px] h-[450px] mt-[80px] mb-[80px] sticky bg-white dark:bg-slate-900 bg-opacity-90 border border-[#46484d] dark:border-[#ffff1d] rounded-[5px] shadow-sm ${
          scroll ? "top-[120px]" : "top-[30px]"
        }`}>
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
    </div>
  );
};

export default Profile;
