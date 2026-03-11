"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"viewer" | "host" | "admin">("viewer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await registerUser({ name, email, password, role });
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card card-shadow">
        <h1 className="title">Register</h1>
        <p className="subtitle">Create your account.</p>

        <form onSubmit={handleRegister} className="form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select
              className="form-input"
              value={role}
              onChange={(e) => setRole(e.target.value as "viewer" | "host" | "admin")}
            >
              <option value="viewer">viewer</option>
              <option value="host">host</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <Link href="/" className="register-link">
          Back to Login
        </Link>
      </div>

      <style jsx>{`
        .auth-shell {
          min-height: calc(100vh - 170px);
          display: grid;
          place-items: center;
          padding: 1rem;
        }

        .auth-card {
          width: 100%;
          max-width: 440px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 2rem;
        }

        .title {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--foreground);
        }

        .subtitle {
          margin-top: 0.5rem;
          color: var(--muted);
        }

        .form {
          margin-top: 1.5rem;
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
          border-radius: 0.625rem;
          padding: 0.75rem 0.875rem;
          color: var(--foreground);
          outline: none;
        }

        .form-input:focus {
          border-color: var(--primary);
        }

        .error {
          margin: 0;
          color: var(--live);
          font-size: 0.875rem;
        }

        .submit {
          border: none;
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          background: var(--primary);
          color: white;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-link {
          margin-top: 1rem;
          display: inline-block;
          color: var(--primary);
          text-decoration: none;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
