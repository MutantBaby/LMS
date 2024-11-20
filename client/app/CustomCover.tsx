"use client";

import { FC } from "react";
import { useLoadUserQuery } from "./redux/features/api/apiSlice";
import Loading from "./components/Loading";

interface Props {
  children: React.ReactNode;
}

const CustomCover: FC<Props> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return (
    <div suppressHydrationWarning>
      {isLoading ? <Loading /> : <>{children}</>}
    </div>
  );
};

export default CustomCover;
