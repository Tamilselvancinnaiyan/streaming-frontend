import Link from "next/link";
import { Users, Clock, Play } from "lucide-react";
import { motion } from "framer-motion";

interface StreamCardProps {
  id: string;
  thumbnail: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  viewerCount: string;
  duration: string;
  category: string;
}

export default function StreamCard({
  id,
  thumbnail,
  title,
  hostName,
  hostAvatar,
  viewerCount,
  duration,
  category,
}: StreamCardProps) {
  return (
    <motion.div
      className="stream-card"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="thumbnail-container">
        <img src={thumbnail} alt={title} className="thumbnail" />
        <div className="live-badge animate-pulse-live">
          <span className="dot"></span>
          LIVE
        </div>
        <div className="category-badge">{category}</div>
        <div className="hover-overlay">
          <Link href={`/watch/${id}`} className="join-link">
            <button className="join-btn">
              <Play size={20} fill="currentColor" />
              Join Stream
            </button>
          </Link>
        </div>
      </div>

      <div className="card-info">
        <div className="host-info">
          <div className="host-avatar-container">
            <img src={hostAvatar} alt={hostName} className="host-avatar" />
          </div>
          <div className="text-info">
            <h3 className="stream-title">{title}</h3>
            <p className="host-name">by {hostName}</p>
          </div>
        </div>

        <div className="card-footer">
          <div className="stats">
            <div className="stat-item">
              <Users size={14} />
              <span>{viewerCount} viewers</span>
            </div>
            <div className="stat-item">
              <Clock size={14} />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stream-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .stream-card:hover {
          border-color: var(--primary);
        }

        .thumbnail-container {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .thumbnail {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .live-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: var(--live);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
        }

        .category-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .thumbnail-container:hover .hover-overlay {
          opacity: 1;
        }

        .join-link {
          text-decoration: none;
          display: contents;
        }

        .join-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.625rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transform: translateY(10px);
          transition: all 0.2s;
        }

        .thumbnail-container:hover .join-btn {
          transform: translateY(0);
        }

        .card-info {
          padding: 1.25rem;
        }

        .host-info {
          display: flex;
          gap: 0.875rem;
          margin-bottom: 1rem;
        }

        .host-avatar-container {
          flex-shrink: 0;
        }

        .host-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--border);
        }

        .text-info {
          flex: 1;
          min-width: 0;
        }

        .stream-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--foreground);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .host-name {
          font-size: 0.875rem;
          color: var(--muted);
        }

        .card-footer {
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
        }

        .stats {
          display: flex;
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--muted);
          font-size: 0.8125rem;
        }
      `}</style>
    </motion.div>
  );
}
