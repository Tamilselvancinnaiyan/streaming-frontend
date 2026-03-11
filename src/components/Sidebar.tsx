"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Tv2,
  PlusSquare,
  BarChart3,
  Settings,
  Flame,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Live Sessions", href: "/live-sessions", icon: Tv2 },
  { name: "Create Stream", href: "/create", icon: PlusSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Flame className="logo-icon" size={24} />
        <span className="logo-text">LiveStream</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-item", isActive && "active")}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: var(--sidebar);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          padding: 1.5rem;
          z-index: 50;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
          padding: 0 0.5rem;
        }

        .logo-icon {
          color: var(--primary);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        :global(.nav-item) {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: var(--muted);
          font-size: 0.9375rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        :global(.nav-item:hover) {
          background: var(--background);
          color: var(--foreground);
        }

        :global(.nav-item.active) {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }
      `}</style>
    </aside>
  );
}
