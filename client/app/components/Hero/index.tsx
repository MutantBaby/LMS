import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import img1 from "../../../assets/hero_img.svg";

const Hero: FC = () => {
  return (
    <>
      <section className="flex self-center px-2 py-32 bg-white md:px-0  dark:bg-black">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="dark:text-white text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">
                    Improve Online Learning Exp
                  </span>
                  <br />
                  <span className="block text-indigo-600 xl:inline">
                    Help You Learn Faster.
                  </span>
                </h1>
                <p className="dark:text-white mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  We Have 2k Online courses. Find your desired course and start
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <Link
                    href="#_"
                    className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                    Try It Free
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link
                    href="#_"
                    className="dark:text-black flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <Image alt="img" src={img1} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
