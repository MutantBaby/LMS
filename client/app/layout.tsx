"use client";

import "./globals.css";

import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Josefin_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { ReduxProvider } from "../utils/ReduxProvider";
import { ThemeProvider } from "../utils/ThemeProvider";
import CustomCover from "../utils/CustomCover";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:to-black duration-300`}>
        <ReduxProvider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={true}
              defaultTheme="system">
              <CustomCover>{children}</CustomCover>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
