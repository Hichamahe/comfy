import React from "react";
import Link from "next/link";

function Navbar({ ListItems }) {
  return (
    <div className="xs:hidden sm:hidden">
      <ul className="flex m-0 space-x-5">
        {ListItems.map((item, index) => (
          <li
            className=""
            key={index}
          >
            <Link
              href={item === "home" ? "/" : `/${item}`}
              className="text-xl text-primaryColor hover:text-mainColor focus:text-mainColor capitalize	"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
