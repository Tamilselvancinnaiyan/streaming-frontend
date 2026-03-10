"use client";

import Image from "next/image";
import React from "react";
import StreamCard from "@/components/StreamCard";

const MOCK_STREAMS = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
    title: "Building a React SaaS in 2 hours",
    hostName: "Alex Carter",
    hostAvatar: "https://i.pravatar.cc/150?u=alex",
    viewerCount: "1.4k",
    duration: "01:24:10",
    category: "Programming",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop",
    title: "Final Fantasy VII Rebirth - Hard Mode Run",
    hostName: "Sarah Jenkins",
    hostAvatar: "https://i.pravatar.cc/150?u=sarah",
    viewerCount: "2.8k",
    duration: "03:15:45",
    category: "Gaming",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    title: "Deep Learning with Python - Live Q&A",
    hostName: "David Chen",
    hostAvatar: "https://i.pravatar.cc/150?u=david",
    viewerCount: "850",
    duration: "00:45:20",
    category: "Technology",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    title: "Morning Vibes - Coffee & Chill Beats",
    hostName: "Emma Wilson",
    hostAvatar: "https://i.pravatar.cc/150?u=emma",
    viewerCount: "3.2k",
    duration: "02:30:15",
    category: "Music",
  },
];

export default function Home() {
  return (
    <div className="dashboard-container">
      <header className="page-header">
        <h1 className="page-title">Live Sessions</h1>
        <p className="page-subtitle">
          Discover and join active live streams from creators worldwide.
        </p>
      </header>

      <div className="streams-grid">
        {MOCK_STREAMS.map((stream) => (
          <StreamCard key={stream.id} {...stream} />
        ))}
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--muted);
          font-size: 1rem;
        }

        .streams-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </div>
  );
}
