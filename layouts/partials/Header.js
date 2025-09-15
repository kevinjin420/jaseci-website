"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import SearchModal from "@layouts/partials/SearchModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const { main } = menu;
  const pathname = usePathname();

  const [searchModal, setSearchModal] = useState(false);

  return (
    <>
      <header className="w-full z-50 p-3 md:p-4 md:fixed md:top-0 transition-all duration-300">
        <nav className="container max-w-[35rem]  mx-auto px-2 md:px-3 py-2 md:rounded-full transition-all duration-300 bg-transparent md:bg-medium-bg/80 md:backdrop-blur-md md:shadow-lg md:border md:border-light-bg/50">
          <div className="flex flex-wrap items-center justify-between">
            {/* Logo */}
            <div className="order-0 mr-4">
              <Logo />
            </div>

            {/* Hidden checkbox drives mobile open/close state for labels and menu via CSS */}
            <input id="nav-toggle" type="checkbox" className="hidden" />

            {/* Search Icon (right side) */}
            <div className="order-2 ml-auto md:order-2 md:ml-3">
              <div
                className="cursor-pointer p-2.5 text-lg text-dark-text hover:text-white hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                onClick={() => setSearchModal(true)}
              >
                <IoSearch />
              </div>
            </div>

            {/* Mobile Menu Toggler (right side) */}
            <label
              id="show-button"
              htmlFor="nav-toggle"
              className="order-3 ml-2 flex cursor-pointer items-center md:hidden"
            >
              <svg className="h-6 fill-current text-white" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            </label>
            <label
              id="hide-button"
              htmlFor="nav-toggle"
              className="order-3 ml-2 hidden cursor-pointer items-center md:hidden"
            >
              <svg className="h-6 fill-current text-white" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            </label>

            {/* Menu Items */}
            <ul
              id="nav-menu"
              className="navbar-nav order-[100] hidden w-full mt-2 md:order-1 md:mt-0 md:flex md:w-auto md:space-x-1 md:items-center bg-medium-bg/95 md:bg-transparent rounded-xl md:rounded-none p-2 md:p-0 border border-light-bg/50 md:border-0"
            >
              {main.map((menuItem, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {menuItem.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <span className="inline-flex items-center cursor-pointer text-dark-text hover:text-white transition-colors duration-200 px-4 py-2 rounded-md md:rounded-full">
                        {menuItem.name}
                        <svg
                          className="h-4 w-4 fill-current ml-1"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100 bg-medium-bg/80 backdrop-blur-md rounded-lg mt-2 p-2 border border-light-bg/50">
                        {menuItem.children.map((child, j) => (
                          <li
                            className="nav-dropdown-item"
                            key={`children-${j}`}
                          >
                            <Link
                              href={child.url}
                              className="nav-dropdown-link block text-dark-text hover:text-white px-3 py-2 rounded-md md:rounded-full transition-colors duration-200"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link
                        href={menuItem.url}
                        className={`block transition-all rounded-md md:rounded-full px-4 py-2 ${
                          pathname === menuItem.url
                            ? "bg-white/20 text-white"
                            : "text-dark-text hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {menuItem.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>

            {/* Spacer to force right alignment on mobile when menu is closed */}
            <div className="hidden md:block" />
          </div>
        </nav>
      </header>
      <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />
    </>
  );
};

export default Header;
