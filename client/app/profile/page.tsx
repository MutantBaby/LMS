"use client";

import Heading from "@/utils/Heading";
import { FC, useState } from "react";

import { IUser } from "@/types";
import Header from "../_components/Header";
import { useAppSelector } from "../_redux";
import Profile from "../_components/Profile";
import ProtectedHook from "@/hooks/useProtectedHook";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  const [activeItems, setActiveItems] = useState(0);
  const { user }: { user: IUser } = useAppSelector((state) => state.auth);

  return (
    <ProtectedHook>
      <Heading
        title={`${user?.name}'s Profile`}
        description="Learn Online Courses"
        keywords="Programming, MERN, MEAN, Python"
      />

      <Header
        open={open}
        route={route}
        setOpen={setOpen}
        setRoute={setRoute}
        activeItems={activeItems}
      />

      <Profile user={user} />
    </ProtectedHook>
  );
};

export default Page;
