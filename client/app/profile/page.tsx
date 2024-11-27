"use client";

import Heading from "@/utils/Heading";
import { FC, useState } from "react";

import Header from "../_components/Header";
import ProtectedHook from "@/hooks/useProtectedHook";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  const [activeItems, setActiveItems] = useState(0);

  return (
    <ProtectedHook>
      <Heading
        title="LE-Course"
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
    </ProtectedHook>
  );
};

export default Page;
