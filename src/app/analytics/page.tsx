"use client";

import React from "react";
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  Calendar,
  BarChart2,
  PieChart,
  ArrowUpRight,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="analytics-container">
      <header className="page-header">
        <h1 className="page-title">Stream Analytics</h1>
        <p className="page-subtitle">
          Track your growth, engagement, and audience reach.
        </p>
      </header>

      <div className="stats-grid">
        {[
          {
            label: "Total Streams",
            value: "124",
            change: "+12%",
            icon: BarChart2,
          },
          { label: "Total Viewers", value: "45.2k", change: "+24%", icon: Eye },
          {
            label: "Peak Viewers",
            value: "3,120",
            change: "+8%",
            icon: TrendingUp,
          },
          {
            label: "Avg. Watch Time",
            value: "42m",
            change: "+15%",
            icon: Clock,
          },
        ].map((stat, i) => (
          <div key={i} className="stat-card card-shadow">
            <div className={`icon-box color-${i}`}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="label">{stat.label}</span>
              <div className="value-row">
                <span className="value">{stat.value}</span>
                <span className="change">
                  {stat.change} <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card card-shadow main-chart">
          <div className="chart-header">
            <h3>Viewer Growth</h3>
            <div className="chart-filters">
              <button className="filter-btn active">7D</button>
              <button className="filter-btn">1M</button>
              <button className="filter-btn">1Y</button>
            </div>
          </div>
          <div className="mock-chart-container">
            <div className="mock-chart-bars">
              {[40, 60, 45, 90, 75, 100, 85].map((h, i) => (
                <div key={i} className="chart-bar-column">
                  <div className="bar" style={{ height: `${h}%` }}>
                    <div className="bar-tooltip">{h * 50} viewers</div>
                  </div>
                  <span className="bar-label">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-charts">
          <div className="chart-card card-shadow">
            <h3>Top Categories</h3>
            <div className="category-list">
              {[
                { name: "Programming", percent: 65, color: "var(--primary)" },
                { name: "Gaming", percent: 20, color: "#10b981" },
                { name: "Design", percent: 15, color: "#f59e0b" },
              ].map((cat, i) => (
                <div key={i} className="cat-item">
                  <div className="cat-info">
                    <span>{cat.name}</span>
                    <span>{cat.percent}%</span>
                  </div>
                  <div className="progress-bg">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${cat.percent}%`,
                        backgroundColor: cat.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-card card-shadow">
            <h3>Audience Regions</h3>
            <div className="region-list">
              <div className="mock-pie">
                <div className="pie-center"></div>
              </div>
              <div className="region-legend">
                <div className="legend-item">
                  <span
                    className="dot"
                    style={{ background: "var(--primary)" }}
                  ></span>{" "}
                  North America
                </div>
                <div className="legend-item">
                  <span
                    className="dot"
                    style={{ background: "#10b981" }}
                  ></span>{" "}
                  Europe
                </div>
                <div className="legend-item">
                  <span
                    className="dot"
                    style={{ background: "#f59e0b" }}
                  ></span>{" "}
                  Asia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .analytics-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2.5rem;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 1.5rem;
          border-radius: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .icon-box {
          width: 56px;
          height: 56px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }

        .icon-box.color-1 {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }
        .icon-box.color-2 {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }
        .icon-box.color-3 {
          background: rgba(236, 72, 153, 0.1);
          color: #ec4899;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .label {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--muted);
        }

        .value-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .change {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 0.125rem;
        }

        .charts-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 1.75rem;
          border-radius: 1.5rem;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .chart-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
        }

        .chart-filters {
          display: flex;
          gap: 0.5rem;
          background: var(--background);
          padding: 0.25rem;
          border-radius: 0.5rem;
        }

        .filter-btn {
          border: none;
          background: transparent;
          color: var(--muted);
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }

        .filter-btn.active {
          background: var(--card);
          color: var(--foreground);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .mock-chart-container {
          height: 300px;
          display: flex;
          align-items: flex-end;
          padding-bottom: 1.5rem;
        }

        .mock-chart-bars {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1.5rem;
        }

        .chart-bar-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          height: 100%;
          justify-content: flex-end;
        }

        .bar {
          width: 100%;
          max-width: 40px;
          background: linear-gradient(to top, var(--primary), #818cf8);
          border-radius: 6px 6px 0 0;
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .bar:hover {
          filter: brightness(1.1);
          transform: scaleX(1.1);
        }

        .bar-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--foreground);
          color: var(--background);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.625rem;
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.2s;
          white-space: nowrap;
        }

        .bar:hover .bar-tooltip {
          opacity: 1;
        }

        .bar-label {
          font-size: 0.75rem;
          color: var(--muted);
          font-weight: 500;
        }

        .side-charts {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .cat-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .cat-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .progress-bg {
          height: 8px;
          background: var(--background);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 4px;
        }

        .region-list {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .mock-pie {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: conic-gradient(
            var(--primary) 0% 60%,
            #10b981 60% 85%,
            #f59e0b 85% 100%
          );
          position: relative;
        }

        .pie-center {
          position: absolute;
          inset: 15px;
          background: var(--card);
          border-radius: 50%;
        }

        .region-legend {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
