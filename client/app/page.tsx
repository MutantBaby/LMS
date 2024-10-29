"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Hero from "./components/Hero";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItems, setActiveItems] = useState(0);

  return (
    <div>
      <Heading
        title="LE-Course"
        description="Learn Online Courses"
        keywords="Programming, MERN, MEAN, Python"
      />

      <Header activeItems={activeItems} open={open} setOpen={setOpen} />
      <Hero />
    </div>
  );
};

export default Page;
