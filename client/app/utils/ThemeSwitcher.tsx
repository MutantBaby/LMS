import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiSun, BiMoon } from "react-icons/bi";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center mx-4">
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
