"use client";

import { FC } from "react";
import { useLoadUserQuery } from "../app/redux/features/api/apiSlice";
import Loading from "../app/components/Loading";

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
