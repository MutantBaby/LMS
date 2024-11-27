import React from "react";
import { redirect } from "next/navigation";

import useAuthHook from "./useAuthHook";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedHook({ children }: Props) {
  const isAuthenticated = useAuthHook();

  return isAuthenticated ? children : redirect("/");
}
