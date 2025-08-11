"use client";

import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: HomeIcon, href: "/admin/dashboard" },
  { name: "Projects", icon: UsersIcon, href: "/admin/projects" },
  { name: "Analytics", icon: ChartBarIcon, href: "/admin/analytics" },
  { name: "Settings", icon: Cog6ToothIcon, href: "/admin/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin";

  if (isLogin) return null; // avoid unnecessary nesting

  return (
    <>
      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-100 shadow-lg z-30
        flex flex-col transition-all duration-300 ease-in-out
        ${isOpen ? "w-64" : "w-16"}
      `}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            isOpen ? "justify-between" : "justify-center"
          } px-4 h-16 border-b border-gray-700`}
        >
          <span
            className={`text-xl font-semibold tracking-wide transition-all duration-300 overflow-hidden 
            ${isOpen ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0"}`}
          >
            Admin Panel
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md cursor-pointer"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 hover:text-red-600" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-4 px-2">
            {navItems.map(({ name, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <li key={name} className="group">
                  <a
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200
      ${
        isActive
          ? "bg-indigo-600 text-white font-semibold"
          : "hover:bg-gray-800 text-gray-300"
      }
    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                    {isOpen && <span className="text-sm">{name}</span>}

                    {/* Tooltip when collapsed */}
                    {!isOpen && (
                      <span
                        className={`absolute ml-0 group-hover:ml-12 
                   px-3 py-1 bg-gray-900 ${isActive ? "text-indigo-400" : "text-white"} text-sm rounded shadow-lg
                   opacity-0 group-hover:opacity-100 whitespace-nowrap
                   transition-all duration-200 ease-out z-50`}
                      >
                        {name}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={`px-4 py-4 border-t border-gray-700 text-xs text-gray-500 text-center transition-all duration-300 overflow-hidden 
          ${isOpen ? "opacity-100 max-h-10" : "opacity-0 max-h-0"}`}
        >
          &copy; 2025 Your Company
        </div>
      </aside>
    </>
  );
}
