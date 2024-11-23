"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationLinks from "./NavigationLinks";
import ThemeToggle from "./ThemeToggle";
import { getCookie } from "@/lib/serverFuntions";

export default function Navigation() {
  const [links, setLinks] = useState([
    { url: "/", name: "inicio" },
    { url: "/about", name: "Acerca de" }
  ]);

  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    getCookie("token").then((token) => {
      if (token) {
        setLinks(prevLinks => [...prevLinks, {
          url: "/dashboard",
          name: "Dashboard"
        }]);
      }
    });

    getCookie("adminUser").then((adminUser) => {
      if(adminUser) {
        setUserLogin(true);
      }
    });
  }, []);

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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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
                 initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </motion.svg>
              <motion.span
                className="font-bold text-xl dark:text-white duration-500"
                 initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Creador de CV
              </motion.span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {links.map((link, index) => {
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {userLogin && (
          
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Iniciar Sesión
                </Link>
             
            )}
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
