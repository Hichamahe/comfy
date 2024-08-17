"use client";
import React, { useState } from "react";
import logo from "../../../public/images/logo-footer.png";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail, MdOutlineKeyboardArrowDown } from "react-icons/md";

const SocialMedia = [
  { icon: FaFacebookF, link: "lien_facebook" },
  { icon: FaInstagram, link: "lien_instagram" },
  { icon: FaLinkedinIn, link: "lien_linkedin" },
  { icon: FaGithub, link: "lien_github" },
];

function Footer() {
  const [visibility, setVisibility] = useState({
    ul: false,
    help: false,
    service: false,
  });

  const toggleVisibility = (section) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [section]: !prevVisibility[section],
    }));
  };

  return (
    <footer className="bg-mainbgColor ">
      <div className="flex gap-4 flex-wrap xs:p-2 p-5 xs:flex-col">
        <div className="flex-1 space-y-4">
          <Image
            src={logo}
            alt={logo}
            width={100}
            height={"auto"}
            priority={true}
          />
          <p className="text-primaryColor">
            Since 2013 we’ve been creating industrial design, residential
            architecture, commercial interiors. Chase mice attack feet but rub
            face on everything excepteur sint occaecat cupidatat proident.
          </p>
          <div className="flex justify-between">
            <span className="text-white text-lg">Follow Us</span>
            <MdOutlineKeyboardArrowDown
              className={`text-white text-2xl hidden xs:block cursor-pointer transition-all duration-500 ${
                visibility.ul ? "rotate-180" : ""
              }`}
              onClick={() => toggleVisibility("ul")}
            />
          </div>
          <ul
            className={`flex space-x-2 overflow-hidden transition-all duration-500 sm:max-h-max-height md:max-h-max-height lg:max-h-max-height ${
              visibility.ul ? "max-h-8" : "max-h-0"
            }`}
          >
            {SocialMedia.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="text-white hover:text-mainColor text-xl"
                >
                  <item.icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex justify-between">
            <h1 className="text-white">HERE TO HELP</h1>
            <MdOutlineKeyboardArrowDown
              className={`text-white text-2xl hidden xs:block cursor-pointer transition-all duration-500 ${
                visibility.help ? "rotate-180" : ""
              }`}
              onClick={() => toggleVisibility("help")}
            />
          </div>
          <div
            className={`flex flex-col space-y-4 overflow-hidden transition-all duration-500 sm:max-h-max-height md:max-h-max-height lg:max-h-max-height ${
              visibility.help ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="text-primaryColor">
              Have a question? You may find an answer in our FAQs. But you can
              also contact us:
            </p>
            <div className="space-y-2 flex flex-col">
              <FaPhoneVolume className="text-white text-xl hover:text-mainColor" />
              <h1 className="text-white">Order by phone</h1>
              <span className="text-primaryColor">Available everyday</span>
              <Link
                href=""
                className="text-primaryColor hover:text-mainColor"
              >
                (+212) 0669710265
              </Link>
            </div>
            <div className="space-y-2 flex flex-col">
              <MdEmail className="text-white text-xl hover:text-mainColor" />
              <h1 className="text-white">Email Us</h1>
              <span className="text-primaryColor">Get in touch by email</span>
              <Link
                href=""
                className="text-primaryColor hover:text-mainColor"
              >
                comfyproject20@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-2 space-y-2 flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-white">Customer Service</h1>
            <MdOutlineKeyboardArrowDown
              className={`text-white text-2xl hidden xs:block cursor-pointer transition-all duration-500 ${
                visibility.service ? "rotate-180" : ""
              }`}
              onClick={() => toggleVisibility("service")}
            />
          </div>
          <div
            className={`flex flex-col space-x-2 overflow-hidden transition-all duration-500 sm:max-h-max-height md:max-h-max-height lg:max-h-max-height ${
              visibility.service ? "max-h-12" : "max-h-0"
            }`}
          >
            <Link
              href="/contact"
              className="text-primaryColor hover:text-mainColor"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-primaryColor hover:text-mainColor"
            >
              faq
            </Link>
          </div>
        </div>
      </div>
      <hr className="text-white" />
      <div className="flex items-center justify-center p-3">
        <h1 className="text-primaryColor">
          © Copyright 2024 Comfy Store. All Rights Reserved. Design By HICHAM
          AHANDAM
        </h1>
      </div>
    </footer>
  );
}

export default Footer;
