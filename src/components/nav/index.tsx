"use client";
import UserContext from "@/context/userContext";
import { accessToken, refreshToken } from "@/types/Key";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useContext } from "react";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const Nav = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useContext(UserContext);
  const pathName = usePathname();

  return (
    <>
      <div
        className={`relative min-h-screen md:flex`}
        data-dev-hint="container"
      >
        <input type="checkbox" id="menu-open" className="hidden" />
        <label
          htmlFor="menu-open"
          className="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden"
          data-dev-hint="floating action button"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <header
          className="bg-gray-600 text-gray-100 flex justify-between md:hidden"
          data-dev-hint="mobile menu bar"
        >
          <label
            htmlFor="menu-open"
            id="mobile-menu-button"
            className="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md"
          >
            <svg
              id="menu-open-icon"
              className="h-6 w-6 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              id="menu-close-icon"
              className="h-6 w-6 transition duration-200 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </header>
        <aside
          id="sidebar"
          className="bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transhtmlForm md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
          data-dev-hint="sidebar; px-0 htmlFor frameless; px-2 htmlFor visually inset the navigation"
        >
          <div
            className="flex flex-col space-y-6"
            data-dev-hint="optional div htmlFor having an extra footer navigation"
          >
            <h1 className="ml-3 text-lg">{user?.fullName || ""}</h1>

            <nav data-dev-hint="main navigation">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center space-x-2 py-2 px-4 transition duration-200 ${
                    pathName === link.href && "bg-gray-700 text-white"
                  } hover:bg-gray-700 hover:text-white`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <nav data-dev-hint="second-main-navigation or footer navigation">
            <Link
              href="#"
              onClick={() => {
                setUser(null);
                cookie.remove(accessToken);
                cookie.remove(refreshToken);
              }}
              className="block py-2 px-4 transition duration-200 hover:bg-gray-700 hover:text-white"
            >
              Logout
            </Link>
          </nav>
        </aside>
        <main id="content" className="flex-1 p-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="px-4 py-6 sm:px-0">
              <div>{children}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Nav;
