"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import NavigationLinks from "./NavigationLinks";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

export default function Navigation() {
  let arrLinks = [
    {
      url: "/",
      name: "inicio",
    },
    {
      url: "/about",
      name: "Acerca de",
    },
  ];

  const [userLogin, setUserLogin] = useState(false);
  
  function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null
    return null
  }

  useEffect(() => {
    const token = getCookie("token");
    const adminUser = getCookie("adminUser");

    if (getCookie("token")) {

      arrLinks.push(
        {
          url: "/dashboard",
          name: "Dashboard",
        },
      )
    }

    if (adminUser){
      setUserLogin(true);
    }

  }, [])


  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm duration-500"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-8"
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </motion.svg>
              <motion.span
                className="font-bold text-xl dark:text-white duration-500"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Creador de CV
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {arrLinks.map((link, index) => {
                return (
                  <motion.div
                    key={`${index}-navigation`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <NavigationLinks data={link} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {userLogin && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </motion.div>
            )}
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
