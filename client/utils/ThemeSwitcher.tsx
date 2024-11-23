"use client";

import { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";

interface Props {
  theme?: string;
  setTheme: (theme: string) => void;
}

const ThemeSwitcher = ({ theme, setTheme }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center mx-4 z-50">
      {theme === "light" ? (
        <BiMoon
          size={25}
          fill="black"
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          size={25}
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
