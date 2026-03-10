"use client";

import React, { useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import { useLiveKit } from "@/hooks/useLiveKit";
import { Share2, Heart, Plus, Loader2 } from "lucide-react";

export default function WatchPage() {
  const {
    remoteTracks,
    messages,
    sendMessage,
    participantCount,
    isConnecting,
    connect,
    error,
  } = useLiveKit({
    roomName: "test-room",
  });

  useEffect(() => {
    connect("viewer");
  }, []);

  const videoTrack = remoteTracks.find((t) => t.kind === "video");

  return (
    <div className="watch-container">
      <div className="main-content">
        <div className="player-section">
          <VideoPlayer
            track={videoTrack}
            viewerCount={participantCount.toString()}
          />
          {isConnecting && (
            <div className="loading-overlay">
              <Loader2 className="animate-spin" size={48} />
              <span>Connecting to stream...</span>
            </div>
          )}
          {error && (
            <div className="error-overlay">
              <span>Failed to connect: {error.message}</span>
              <button onClick={() => connect("viewer")} className="retry-btn">
                Retry
              </button>
            </div>
          )}
        </div>

        <div className="stream-details">
          <div className="header-info">
            <h1 className="stream-title">Building a React SaaS in 2 hours</h1>
            <div className="actions">
              <button className="action-btn">
                <Share2 size={18} /> Share
              </button>
              <button className="action-btn primary">
                <Heart size={18} /> Follow
              </button>
            </div>
          </div>

          <div className="host-section">
            <div className="host-card">
              <img
                src="https://i.pravatar.cc/150?u=alex"
                alt="Alex Carter"
                className="host-avatar"
              />
              <div className="host-info">
                <span className="host-name">Alex Carter</span>
                <span className="host-bio">Full-stack dev & UI Designer</span>
              </div>
            </div>
          </div>

          <div className="description">
            <p>
              Join me as we build a full-stack SaaS application using Next.js,
              LiveKit, and Framer Motion. We'll cover everything from real-time
              streaming to complex dashboard layouts.
            </p>
            <div className="tags">
              {["Programming", "React", "Next.js", "LiveKit"].map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="chat-sidebar">
        <LiveChat messages={messages} onSendMessage={sendMessage} />
      </aside>

      <style jsx>{`
        .watch-container {
          display: flex;
          height: calc(100vh - 128px);
          gap: 0;
          margin: -2rem; /* Negate the parent padding */
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .player-section {
          position: relative;
        }

        .loading-overlay,
        .error-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: white;
          border-radius: 1rem;
          z-index: 30;
        }

        .retry-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
        }

        .chat-sidebar {
          width: 360px;
          height: 100%;
        }

        .stream-details {
          margin-top: 1.5rem;
        }

        .header-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .stream-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .actions {
          display: flex;
          gap: 0.75rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
          background: var(--card);
          border: 1px solid var(--border);
          color: var(--foreground);
          transition: all 0.2s;
        }

        .action-btn.primary {
          background: var(--primary);
          border-color: var(--primary);
          color: white;
        }

        .host-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .host-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .host-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }

        .host-name {
          display: block;
          font-weight: 600;
          color: var(--foreground);
        }

        .host-bio {
          font-size: 0.875rem;
          color: var(--muted);
        }

        .description {
          color: var(--muted);
          line-height: 1.6;
        }

        .tags {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tag {
          font-size: 0.875rem;
          color: var(--primary);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
