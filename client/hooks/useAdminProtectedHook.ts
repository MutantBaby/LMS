import React from "react";
import { redirect } from "next/navigation";

import { IUser } from "@/types";
import { useAppSelector } from "@/app/_redux";

interface Props {
  children: React.ReactNode;
}

export default function AdminProtectedHook({ children }: Props) {
  const { user }: { user: IUser } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  return isAdmin ? children : redirect("/");
}
