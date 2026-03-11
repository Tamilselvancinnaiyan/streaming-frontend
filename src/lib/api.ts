export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  identity?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface StreamStartResponse {
  id: string;
  roomId?: string;
  room_name?: string;
}

export interface StreamRecord {
  id: string;
  room_name?: string;
  roomId?: string;
  hostUserId?: string;
  title?: string;
  category?: string;
  endedAt?: string | null;
  startedAt?: string;
  participantCount?: number;
}

const jsonHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  role?: "viewer" | "host" | "admin";
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return res.json();
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}

export async function startStream(
  payload: { hostUserId: string; title: string; category: string },
  token: string
): Promise<StreamStartResponse> {
  const res = await fetch(`${API_BASE}/streams/start`, {
    method: "POST",
    headers: jsonHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to start stream");
  }

  return res.json();
}

export async function stopStream(streamId: string, token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/streams/${streamId}/stop`, {
    method: "PATCH",
    headers: jsonHeaders(token),
  });

  if (!res.ok) {
    throw new Error("Failed to stop stream");
  }
}

export async function reconcileStreams(token?: string): Promise<StreamRecord[]> {
  const res = await fetch(`${API_BASE}/streams/reconcile`, {
    method: "GET",
    headers: token ? jsonHeaders(token) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch streams");
  }

  return res.json();
}
