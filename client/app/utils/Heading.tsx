"use client";

import { FC } from "react";

interface Props {
  title: string;
  keywords: string;
  description: string;
}

const Heading: FC<Props> = ({ title, keywords, description }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
};

export default Heading;
