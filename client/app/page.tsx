"use client";

import { FC, useState } from "react";
import Hero from "./components/Hero";
import Heading from "../utils/Heading";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("login");
  const [activeItems, setActiveItems] = useState(0);

  return (
    <div>
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

      <Hero />
    </div>
  );
};

export default Page;
