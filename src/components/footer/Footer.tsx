import Link from "next/link";
import React from "react";

import Image from "next/image";
import logo from "@public/scialogo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark p-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">
              Subscribe to our newsletter
            </h2>
            <p className="text-muted-foreground">
              Stay up to date with our news and articles
            </p>
            <div className="flex mt-2 gap-4 ">
              <input
                type="email"
                placeholder="Your Email"
                className="border border-muted rounded-md p-2 text-black focus:ring-pink-medium focus:ring-2"
              />
              <button className="bg-pink-light text-black rounded-full px-6 py-2 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
          <Image src={logo} width={50} height={50} alt="logo" />
          <div className="flex flex-col md:flex-row text-xs font-semibold space-y-2 md:space-y-0 md:space-x-4 my-4 md:my-0">
            <Link href={"/"} className="hover:text-pink-dark">
              Shop
            </Link>
            <Link href={"/"} className="hover:text-pink-dark">
              My packs
            </Link>
            <Link href={"/"} className="hover:text-pink-dark">
              My cards
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-center items-center text-xs border-t border-gray-300 mt-4 pt-4 gap-5">
          <span>© 2024 Soccer Cards. All rights reserved.</span>
          <div className="flex space-x-4">
            <Link href={"/"}>About</Link>
            <Link href={"/"}>Team</Link>
            <Link href={"/"}>Cookies</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
