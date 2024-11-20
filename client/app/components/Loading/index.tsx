"use Client";

import "./index.css";
import { FC } from "react";

const Loading: FC = () => {
  return <div suppressHydrationWarning className="loader"></div>;
};

export default Loading;
