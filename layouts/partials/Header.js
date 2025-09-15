"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import SearchModal from "@layouts/partials/SearchModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

// Global cache to prevent multiple components from making simultaneous requests
let globalStatsCache = null;
let globalFetchPromise = null;

const Header = () => {

  const { main } = menu;
  const pathname = usePathname();

  const [searchModal, setSearchModal] = useState(false);
  const [stats, setStats] = useState({ stars: '--', forks: '--' });

  useEffect(() => {
    // If we already have cached data, use it immediately
    if (globalStatsCache) {
      setStats({
        stars: globalStatsCache.stars ?? '--',
        forks: globalStatsCache.forks ?? '--',
      });
      return;
    }

    // If there's already a fetch in progress, wait for it
    if (globalFetchPromise) {
      globalFetchPromise.then((data) => {
        setStats({
          stars: data.stars ?? '--',
          forks: data.forks ?? '--',
        });
      }).catch(() => {
        setStats({ stars: '--', forks: '--' });
      });
      return;
    }

    // Start a new fetch
    globalFetchPromise = fetch('/api/github-stats')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then((data) => {
        globalStatsCache = data; // Cache the result globally
        setStats({
          stars: data.stars ?? '--',
          forks: data.forks ?? '--',
        });
        console.log('GitHub stats updated:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching GitHub stats:', error);
        setStats({ stars: '--', forks: '--' });
        throw error;
      })
      .finally(() => {
        globalFetchPromise = null; // Clear the promise
      });
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar w-full bg-dark-bg text-white text-sm py-2 px-2 flex justify-center items-center z-[100]">
        <div className="top-bar-content flex flex-col sm:flex-row w-full max-w-5xl items-center justify-between gap-2 sm:gap-0">
          <div className="logo flex items-center gap-2 py-1 text-center sm:text-left">
            {/* <img src="/images/assets/logo.png" alt="Jaseci Logo" className="logo-img" style={{ width: 32, height: 32, borderRadius: 6 }} /> */}
            <span className="font-semibold text-base sm:text-lg leading-tight">The Jac Programming Language and Jaseci Stack</span>
          </div>
          <div className="header-right flex items-center gap-2 sm:gap-3 mt-1 sm:mt-0">
            <a href="https://github.com/jaseci-labs/jaseci" className="github-link flex items-center gap-1 hover:underline" target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <span className="ml-1 text-xs opacity-80">
                ⭐ <span id="github-stars">{stats.stars}</span> 🍴 <span id="github-forks">{stats.forks}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <header className="w-full z-50 p-2 md:p-4 md:fixed md:top-12 transition-all duration-300">
        <nav className="container max-w-full sm:max-w-[35rem] mx-auto px-1 sm:px-3 py-1 sm:py-2 md:rounded-full transition-all duration-300 bg-transparent md:bg-medium-bg/80 md:backdrop-blur-md md:shadow-lg md:border md:border-light-bg/50">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Logo */}
            <div className="order-0 mr-2 sm:mr-4 flex-shrink-0">
              <Logo />
            </div>

            {/* Hidden checkbox drives mobile open/close state for labels and menu via CSS */}
            <input id="nav-toggle" type="checkbox" className="hidden peer" aria-label="Toggle navigation menu" />

            {/* Search Icon (right side) */}
            <div className="order-2 ml-auto md:order-2 md:ml-3">
              <div
                className="cursor-pointer p-2 text-lg text-dark-text hover:text-white hover:bg-white/10 rounded-full flex items-center justify-center transition-all"
                onClick={() => setSearchModal(true)}
                tabIndex={0}
                aria-label="Open search"
                role="button"
              >
                <IoSearch />
              </div>
            </div>

            {/* Mobile Menu Toggler (right side) */}
            <label
              id="show-button"
              htmlFor="nav-toggle"
              className="order-3 ml-2 flex cursor-pointer items-center md:hidden"
              aria-label="Open menu"
            >
              <svg className="h-7 w-7 fill-current text-white" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            </label>
            <label
              id="hide-button"
              htmlFor="nav-toggle"
              className="order-3 ml-2 hidden cursor-pointer items-center md:hidden"
              aria-label="Close menu"
            >
              <svg className="h-7 w-7 fill-current text-white" viewBox="0 0 20 20">
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
              className="navbar-nav order-[100] w-full mt-2 md:order-1 md:mt-0 md:flex md:w-auto md:space-x-1 md:items-center bg-medium-bg/95 md:bg-transparent rounded-xl md:rounded-none p-2 md:p-0 border border-light-bg/50 md:border-0 hidden peer-checked:block text-center space-y-2 md:space-y-0"
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
                        className={`block transition-all rounded-md md:rounded-full px-4 py-2 ${pathname === menuItem.url
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
