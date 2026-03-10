"use client";

import React from "react";
import { Search, Bell, User, Moon, Sun } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar glass">
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search live sessions..."
          className="search-input"
        />
      </div>

      <div className="nav-actions">
        <button className="icon-btn">
          <Sun size={20} className="theme-toggle light-only" />
          <Moon size={20} className="theme-toggle dark-only" />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          height: 64px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--background);
          border: 1px solid var(--border);
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          width: 320px;
          transition: border-color 0.2s;
        }

        .search-container:focus-within {
          border-color: var(--primary);
        }

        .search-icon {
          color: var(--muted);
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--foreground);
          font-size: 0.875rem;
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .icon-btn {
          background: transparent;
          border: none;
          color: var(--muted);
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
          position: relative;
        }

        .icon-btn:hover {
          background: var(--background);
          color: var(--foreground);
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--live);
          border-radius: 50%;
          border: 2px solid var(--card);
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .light-only {
          display: block;
        }
        .dark-only {
          display: none;
        }

        :global([data-theme="dark"]) .light-only {
          display: none;
        }
        :global([data-theme="dark"]) .dark-only {
          display: block;
        }
      `}</style>
    </header>
  );
}
