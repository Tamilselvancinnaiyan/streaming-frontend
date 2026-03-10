"use client";

import React from "react";
import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import { useLiveKit } from "@/hooks/useLiveKit";
import {
  Play,
  Square,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  UserPlus,
  Circle,
  Activity,
  Loader2,
  Users,
} from "lucide-react";

export default function StudioPage() {
  const {
    room,
    localTracks,
    messages,
    sendMessage,
    participantCount,
    isAudioEnabled,
    isVideoEnabled,
    isConnecting,
    connect,
    disconnect,
    toggleAudio,
    toggleVideo,
    error,
  } = useLiveKit({
    roomName: "test-room",
  });

  const isLive = !!room;
  const localVideoTrack = localTracks.find((t) => t.kind === "video");

  return (
    <div className="studio-container">
      <div className="main-content">
        <div className="preview-section">
          <VideoPlayer
            track={localVideoTrack}
            isLocal={true}
            viewerCount={participantCount.toString()}
          />

          <div className="studio-controls card-shadow">
            <div className="control-group">
              {!isLive ? (
                <button
                  className="btn-primary flex gap-2"
                  onClick={() => connect("host")}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Play size={20} fill="currentColor" />
                  )}
                  {isConnecting ? "Starting..." : "Go Live"}
                </button>
              ) : (
                <button className="btn-danger flex gap-2" onClick={disconnect}>
                  <Square size={20} fill="currentColor" /> Stop
                </button>
              )}
            </div>

            <div className="control-divider"></div>

            <div className="control-group">
              <button
                className={`icon-btn ${!isAudioEnabled ? "disabled-btn" : ""}`}
                onClick={toggleAudio}
                title={isAudioEnabled ? "Mute Mic" : "Unmute Mic"}
              >
                {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button
                className={`icon-btn ${!isVideoEnabled ? "disabled-btn" : ""}`}
                onClick={toggleVideo}
                title={isVideoEnabled ? "Turn off Video" : "Turn on Video"}
              >
                {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
              <button className="icon-btn">
                <Monitor size={20} />
              </button>
              <button className="icon-btn">
                <UserPlus size={20} />
              </button>
            </div>

            {error && <div className="error-msg">{error.message}</div>}

            <div className="control-divider"></div>

            <div className="stream-stats">
              <div className="stat-unit">
                <span className="stat-label">Health</span>
                <span className={`stat-value ${isLive ? "healthy" : ""}`}>
                  <Activity size={14} /> {isLive ? "Live" : "Offline"}
                </span>
              </div>
              <div className="stat-unit">
                <span className="stat-label">Viewers</span>
                <span className="stat-value">
                  <Users size={14} /> {participantCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="moderation-sidebar">
        <div className="sidebar-header">
          <h3>Moderation Chat</h3>
        </div>
        <LiveChat messages={messages} onSendMessage={sendMessage} />
      </aside>

      <style jsx>{`
        .studio-container {
          display: flex;
          height: calc(100vh - 128px);
          margin: -2rem;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .preview-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .studio-controls {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 1.25rem 2rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .control-group {
          display: flex;
          gap: 0.75rem;
        }

        .control-divider {
          width: 1px;
          height: 32px;
          background: var(--border);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-danger {
          background: rgba(255, 59, 59, 0.1);
          color: var(--live);
          border: 1px solid var(--live);
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon-btn {
          background: var(--background);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 0.625rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .icon-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .icon-btn.disabled-btn {
          color: var(--live);
          border-color: var(--live);
          background: rgba(255, 59, 59, 0.05);
        }

        .error-msg {
          color: var(--live);
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .stream-stats {
          display: flex;
          gap: 2rem;
          margin-left: auto;
        }

        .stat-unit {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-value {
          font-size: 0.9375rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--muted);
        }

        .stat-value.healthy {
          color: var(--success);
        }

        .moderation-sidebar {
          width: 360px;
          border-left: 1px solid var(--border);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          background: var(--card);
        }

        .sidebar-header h3 {
          font-size: 1rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
