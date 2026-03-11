"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles } from "lucide-react";
import { startStream } from "@/lib/api";
import { getAuthSession, saveActiveStreamSession } from "@/lib/auth";

export default function CreateStreamPage() {
  const router = useRouter();
  const [title, setTitle] = useState("My Live Session");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getAuthSession();
    if (!session?.token || !session?.user?.id) {
      router.push("/");
    }
  }, [router]);

  const handleStart = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const session = getAuthSession();
      if (!session?.token || !session?.user?.id) {
        throw new Error("Please login first");
      }

      const payload = {
        hostUserId: session.user.id,
        title: title || "My Live Session",
        category: category || "general",
      };

      const stream = await startStream(payload, session.token);
      saveActiveStreamSession({
        id: stream.id,
        roomId: stream.roomId,
        room_name: stream.room_name,
        title: payload.title,
        category: payload.category,
      });

      const roomIdentifier = stream.room_name || stream.roomId || "room";
      router.push(
        `/studio?streamId=${encodeURIComponent(stream.id)}&roomId=${encodeURIComponent(roomIdentifier)}`
      );
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to start stream";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-container">
      <header className="page-header">
        <h1 className="page-title">Broadcast Your Story</h1>
        <p className="page-subtitle">Configure your stream and go live.</p>
      </header>

      <div className="form-section card-shadow">
        <div className="form-group">
          <label>Stream Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="general"
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button
          className="start-btn"
          onClick={handleStart}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} />
          )}
          {isSubmitting ? "Starting..." : "Create and Start Stream"}
        </button>
      </div>

      <style jsx>{`
        .create-container {
          max-width: 960px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--muted);
        }

        .form-section {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 2rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .form-input {
          background: var(--background);
          border: 1px solid var(--border);
          padding: 0.75rem 1rem;
          border-radius: 0.625rem;
          color: var(--foreground);
          outline: none;
        }

        .form-input:focus {
          border-color: var(--primary);
        }

        .start-btn {
          margin-top: 0.5rem;
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
        }

        .start-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-msg {
          color: var(--live);
          font-size: 0.875rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
