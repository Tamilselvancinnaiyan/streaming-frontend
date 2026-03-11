"use client";

import React, { useEffect, useState } from "react";
import StreamCard from "@/components/StreamCard";
import { reconcileStreams, type StreamRecord } from "@/lib/api";
import { getAuthSession } from "@/lib/auth";

type DashboardStream = {
  id: string;
  thumbnail: string;
  title: string;
  hostName: string;
  hostAvatar?: string;
  viewerCount: string;
  duration: string;
  category: string;
};

function mapToDashboardStream(record: StreamRecord): DashboardStream {
  const roomId = record.room_name || record.roomId || record.id;
  return {
    id: roomId,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    title: record.title || "Untitled Session",
    hostName: record.hostUserId || "Host",
    viewerCount: String(record.participantCount ?? 0),
    duration: "LIVE",
    category: record.category || "general",
  };
}

export default function LiveSessionsPage() {
  const [streams, setStreams] = useState<DashboardStream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = getAuthSession()?.token;
        const records = await reconcileStreams(token);
        setStreams(records.map(mapToDashboardStream));
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Failed to load streams";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="page-header">
        <h1 className="page-title">Live Sessions</h1>
        <p className="page-subtitle">
          Active streams from <code>GET /streams/reconcile</code>.
        </p>
      </header>

      {isLoading && <p className="status">Loading streams...</p>}
      {error && <p className="status error">{error}</p>}

      {!isLoading && !error && streams.length === 0 && (
        <p className="status">No streams available.</p>
      )}

      <div className="streams-grid">
        {streams.map((stream) => (
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

        .status {
          color: var(--muted);
          margin-bottom: 1rem;
        }

        .status.error {
          color: var(--live);
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
