import React, { FC } from "react";
import { styles } from "@/styles";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import Link from "next/link";

type Props = {};

const Footer: FC<Props> = () => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <br />

        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg-px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 ">
            <div className="space-y-2">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                About
              </h3>
              <ul>
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privay-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Privay Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Faq
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Quick Links
              </h3>
              <ul>
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Social Links
              </h3>
              <ul>
                <li>
                  <Link
                    href="/youtube"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Youtube
                  </Link>
                </li>
                <li>
                  <Link
                    href="/instagram"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="/facebook"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] text-black dark:text-white">
                Contact Info
              </h3>
              <ul>
                <li>
                  <Link
                    href="/call-us"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Call Us: 1122334455
                  </Link>
                </li>
                <li>
                  <Link
                    href="/maps"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Address: 123, XYZ Street, ABC City
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mail"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white">
                    Mail Us: example@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          All Rights Reserved &copy; 2020 - 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
