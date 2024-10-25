"use client";

import { FC } from "react";
import Link from "next/link";

interface Props {
  isMobile: boolean;
  activeItems: number;
}

export const demoNavbarItems = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Faq",
    url: "/faq",
  },
];

const NavbarItems: FC<Props> = ({ isMobile, activeItems }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {demoNavbarItems?.map((item, index) => (
          <Link href={`${item.url}`} key={index} passHref>
            <span
              className={`${
                activeItems === index
                  ? "dark:text-[#3782bc] text-[crimson]"
                  : "dark:text-[white] text-[black]"
              } text-[18px] px-6 font-Poppins font-[400]`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {isMobile && (
        <div className="mt-5 800px:hidden">
          <div className="w-full text-center py-6">
            {demoNavbarItems?.map((item, index) => (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItems === index
                      ? "dark:text-[#3782bc] text-[crimson]"
                      : "dark:text-[white] text-[black]"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarItems;
