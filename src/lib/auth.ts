import type { AuthResponse, AuthUser } from "@/lib/api";

const AUTH_STORAGE_KEY = "livekit_auth_session";
const ACTIVE_STREAM_STORAGE_KEY = "livekit_active_stream";

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export interface ActiveStreamSession {
  id: string;
  roomId?: string;
  room_name?: string;
  title: string;
  category: string;
}

export function saveAuthSession(auth: AuthResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ token: auth.token, user: auth.user })
  );
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function saveActiveStreamSession(stream: ActiveStreamSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_STREAM_STORAGE_KEY, JSON.stringify(stream));
}

export function getActiveStreamSession(): ActiveStreamSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ACTIVE_STREAM_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ActiveStreamSession;
  } catch {
    return null;
  }
}

export function clearActiveStreamSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACTIVE_STREAM_STORAGE_KEY);
}

export function resolveIdentity(user: AuthUser | undefined): string {
  if (!user) return `guest-${Date.now()}`;
  return user.identity || user.email || user.id || `guest-${Date.now()}`;
}

function sanitizeIdentity(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_");
}

export function resolveHostIdentity(
  user: AuthUser | undefined,
  roomId: string | undefined
): string {
  const base = sanitizeIdentity(resolveIdentity(user));
  const room = sanitizeIdentity(roomId || "room");
  return `${base}-host-${room}`;
}

export function getOrCreateViewerIdentity(
  user: AuthUser | undefined,
  roomId: string | undefined
): string {
  const base = sanitizeIdentity(resolveIdentity(user));
  const room = sanitizeIdentity(roomId || "room");
  const key = `livekit_viewer_identity_${room}`;

  if (typeof window === "undefined") {
    return `${base}-viewer-${room}`;
  }

  const existing = sessionStorage.getItem(key);
  if (existing) return existing;

  const identity = `${base}-viewer-${room}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
  sessionStorage.setItem(key, identity);
  return identity;
}
