"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Globe, Lock, EyeOff, Sparkles } from "lucide-react";

export default function CreateStreamPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const streamUrl = "https://livekit.io/s/stream-xyz-123";

  const handleCopy = () => {
    navigator.clipboard.writeText(streamUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStart = () => {
    // In a real app, you would save settings here
    router.push("/studio");
  };

  return (
    <div className="create-container">
      <header className="page-header">
        <h1 className="page-title">Broadcast Your Story</h1>
        <p className="page-subtitle">
          Configure your live stream settings and go live in seconds.
        </p>
      </header>

      <div className="grid-layout">
        <div className="form-section card-shadow">
          <div className="form-group">
            <label>Stream Title</label>
            <input
              type="text"
              placeholder="Engaging title for your stream"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Category</label>
              <select className="form-input">
                <option>Programming</option>
                <option>Gaming</option>
                <option>Technology</option>
                <option>Music</option>
              </select>
            </div>
            <div className="form-group flex-1">
              <label>Visibility</label>
              <div className="visibility-options">
                <button className="vis-btn active">
                  <Globe size={16} /> Public
                </button>
                <button className="vis-btn">
                  <Lock size={16} /> Private
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Tell your viewers what the stream is about..."
              className="form-input textarea"
              rows={4}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              placeholder="coding, react, nextjs (press Enter)"
              className="form-input"
            />
          </div>

          <button className="start-btn" onClick={handleStart}>
            <Sparkles size={20} />
            Create and Start Stream
          </button>
        </div>

        <div className="info-section">
          <div className="info-card card-shadow highlight">
            <h3>Stream Credentials</h3>
            <p className="info-text">
              Use these to connect your streaming software (OBS, Streamlabs).
            </p>

            <div className="credential-box">
              <label>Server URL</label>
              <div className="copy-field">
                <code>rtmp://live.livekit.io/app</code>
                <button onClick={handleCopy} className="copy-btn">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="credential-box">
              <label>Stream Key</label>
              <div className="copy-field">
                <code>••••••••••••••••</code>
                <button className="copy-btn">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="info-card card-shadow">
            <h3>Quick Links</h3>
            <div className="link-list">
              <div className="link-item">
                <span>View Page</span>
                <button className="text-btn">Copy Link</button>
              </div>
              <div className="link-item">
                <span>Embed Player</span>
                <button className="text-btn">Get Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .create-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--muted);
          font-size: 1.125rem;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2.5rem;
        }

        .form-section {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 2.5rem;
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--foreground);
        }

        .form-input {
          background: var(--background);
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          color: var(--foreground);
          font-family: inherit;
          font-size: 0.9375rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          border-color: var(--primary);
        }

        .form-row {
          display: flex;
          gap: 1.5rem;
        }

        .visibility-options {
          display: flex;
          gap: 0.5rem;
          background: var(--background);
          padding: 0.25rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
        }

        .vis-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: none;
          background: transparent;
          color: var(--muted);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .vis-btn.active {
          background: var(--card);
          color: var(--primary);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .textarea {
          resize: none;
        }

        .start-btn {
          margin-top: 1rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: background 0.2s;
        }

        .info-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 1.75rem;
          border-radius: 1.5rem;
        }

        .info-card.highlight {
          border-color: var(--primary);
          background: linear-gradient(
            to bottom right,
            var(--card),
            rgba(99, 102, 241, 0.05)
          );
        }

        .info-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .info-text {
          font-size: 0.875rem;
          color: var(--muted);
          margin-bottom: 1.5rem;
        }

        .credential-box {
          margin-bottom: 1.25rem;
        }

        .credential-box label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }

        .copy-field {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--background);
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
        }

        .copy-field code {
          font-family: monospace;
          font-size: 0.8125rem;
          color: var(--foreground);
        }

        .copy-btn {
          background: transparent;
          border: none;
          color: var(--muted);
          padding: 0.25rem;
          transition: color 0.2s;
        }

        .copy-btn:hover {
          color: var(--primary);
        }

        .link-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .link-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9375rem;
        }

        .text-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
