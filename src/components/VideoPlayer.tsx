"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Users,
  Wifi,
} from "lucide-react";
import { RemoteTrack, LocalTrack } from "livekit-client";

interface VideoPlayerProps {
  track?: RemoteTrack | LocalTrack;
  isLocal?: boolean;
  viewerCount?: string;
  streamHealth?: "healthy" | "warning" | "error";
}

export default function VideoPlayer({
  track,
  isLocal = false,
  viewerCount = "1,420",
  streamHealth = "healthy",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (track && videoRef.current) {
      if (track instanceof RemoteTrack || typeof track.attach === "function") {
        const element = track.attach();
        videoRef.current.appendChild(element);
        return () => {
          track.detach(element);
          element.remove();
        };
      }
    }
  }, [track]);

  return (
    <div className="player-wrapper">
      <div className="player-container">
        {/* Actual Video Track Container */}
        <div ref={videoRef} className="video-track-container" />

        {/* Fallback/Mock UI if no track is present */}
        {!track && (
          <div className="mock-video">
            <div className="video-overlay">
              <div className="top-indicators">
                <div className="live-pill animate-pulse-live">
                  <span className="dot"></span>
                  LIVE
                </div>
                <div className="viewer-pill">
                  <Users size={14} />
                  <span>{viewerCount}</span>
                </div>
                <div className="health-pill">
                  <Wifi size={14} className={streamHealth} />
                  <span>
                    {streamHealth.charAt(0).toUpperCase() +
                      streamHealth.slice(1)}
                  </span>
                </div>
              </div>

              <div className="center-controls">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="play-toggle"
                >
                  {isPlaying ? (
                    <Pause size={48} />
                  ) : (
                    <Play size={48} fill="currentColor" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Overlay for tracks as well */}
        {track && (
          <div className="video-overlay pointer-events-none">
            <div className="top-indicators">
              <div className="live-pill animate-pulse-live">
                <span className="dot"></span>
                LIVE
              </div>
              <div className="viewer-pill">
                <Users size={14} />
                <span>{viewerCount}</span>
              </div>
              <div className="health-pill">
                <Wifi size={14} className={streamHealth} />
                <span>
                  {streamHealth.charAt(0).toUpperCase() + streamHealth.slice(1)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Controls Bar */}
        <div className="controls-bar glass">
          <div className="left-controls">
            <button
              className="ctrl-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} fill="currentColor" />
              )}
            </button>
            <button className="ctrl-btn" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="volume-slider">
              <div className="volume-progress"></div>
            </div>
          </div>

          <div className="right-controls">
            <button className="ctrl-btn">
              <Settings size={20} />
            </button>
            <button className="ctrl-btn">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .player-wrapper {
          width: 100%;
          background: #000;
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
          aspect-ratio: 16 / 9;
        }

        .player-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .video-track-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.video-track-container video) {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .mock-video {
          flex: 1;
          background: linear-gradient(45deg, #1e293b, #0f172a);
          position: relative;
        }

        .video-overlay {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.4) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0, 0, 0, 0.4) 100%
          );
          z-index: 10;
        }

        .pointer-events-none {
          pointer-events: none;
        }

        .top-indicators {
          display: flex;
          gap: 0.75rem;
        }

        .live-pill {
          background: var(--live);
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .viewer-pill,
        .health-pill {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.375rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .healthy {
          color: var(--success);
        }

        .warning {
          color: var(--warning);
        }

        .error {
          color: var(--live);
        }

        .center-controls {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .player-container:hover .center-controls {
          opacity: 1;
        }

        .play-toggle {
          background: transparent;
          border: none;
          color: white;
          padding: 1rem;
        }

        .controls-bar {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          background: rgba(0, 0, 0, 0.8) !important;
          border-bottom: none !important;
          z-index: 20;
        }

        .left-controls,
        .right-controls {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .ctrl-btn {
          background: transparent;
          border: none;
          color: white;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: background 0.2s;
        }

        .ctrl-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .volume-slider {
          width: 80px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          position: relative;
        }

        .volume-progress {
          width: 70%;
          height: 100%;
          background: var(--primary);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
