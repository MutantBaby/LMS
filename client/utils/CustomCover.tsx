"use client";

import { FC } from "react";
import { useLoadUserQuery } from "../app/_redux/features/api/apiSlice";
import Loading from "../app/_components/Loading";

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
