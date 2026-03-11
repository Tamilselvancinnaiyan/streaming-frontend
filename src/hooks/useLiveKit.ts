'use client';

import { useState, useCallback, useEffect } from 'react';
import {
    Room,
    RoomEvent,
    RemoteTrack,
    LocalTrack,
} from 'livekit-client';
import { API_BASE } from '@/lib/api';
import { getAuthSession } from '@/lib/auth';

export interface ChatMessage {
    id: string;
    user: string;
    message: string;
    avatar: string;
    timestamp: number;
    isHost?: boolean;
    isSuperChat?: boolean;
}

export interface UseLiveKitOptions {
    roomId: string;
    tokenEndpoint?: string;
}

export function useLiveKit({ roomId, tokenEndpoint = `${API_BASE}/token` }: UseLiveKitOptions) {
    const [room, setRoom] = useState<Room | null>(null);
    const [remoteTracks, setRemoteTracks] = useState<RemoteTrack[]>([]);
    const [localTracks, setLocalTracks] = useState<LocalTrack[]>([]);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [participantCount, setParticipantCount] = useState(0);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateParticipantCount = useCallback((room: Room) => {
        setParticipantCount(room.numParticipants + 1); // +1 for local participant
    }, []);

    const connect = useCallback(async (role: 'host' | 'viewer', identity: string) => {
        setIsConnecting(true);
        setError(null);

        try {
            console.log(`Connecting to ${roomId} as ${role}...`);
            const auth = getAuthSession();
            const tokenQuery = `${tokenEndpoint}?room=${encodeURIComponent(roomId)}&role=${encodeURIComponent(role)}&identity=${encodeURIComponent(identity)}`;
            const res = await fetch(tokenQuery, {
                headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : undefined,
            });
            if (!res.ok) throw new Error('Failed to fetch token');
            const data = await res.json();
            console.log('Token received:', data);

            const newRoom = new Room();

            newRoom.on(RoomEvent.ParticipantConnected, () => updateParticipantCount(newRoom));
            newRoom.on(RoomEvent.ParticipantDisconnected, () => updateParticipantCount(newRoom));

            newRoom.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
                console.log('Subscribed to remote track:', track.sid, track.kind);
                setRemoteTracks((prev) => [...prev, track]);

                // Automatically attach audio tracks to the document
                if (track.kind === 'audio') {
                    const element = track.attach();
                    document.body.appendChild(element);
                }
            });

            newRoom.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
                console.log('Unsubscribed from remote track:', track.sid);
                setRemoteTracks((prev) => prev.filter((t) => t.sid !== track.sid));
                if (track.kind === 'audio') {
                    track.detach();
                }
            });

            newRoom.on(RoomEvent.LocalTrackPublished, (publication) => {
                console.log('Local track published:', publication.trackSid);
                if (publication.track) {
                    setLocalTracks((prev) => [...prev, publication.track as LocalTrack]);
                }
            });

            newRoom.on(RoomEvent.DataReceived, (payload, participant) => {
                const decoder = new TextDecoder();
                const str = decoder.decode(payload);
                console.log('Data received from:', participant?.identity, 'Content:', str);
                try {
                    const data = JSON.parse(str);
                    if (data.type === 'chat') {
                        setMessages((prev) => [...prev, {
                            id: Math.random().toString(36).substr(2, 9),
                            user: participant?.identity || 'Anonymous',
                            message: data.message,
                            avatar: `https://i.pravatar.cc/150?u=${participant?.identity}`,
                            timestamp: Date.now(),
                            isHost: participant?.metadata === 'host' || participant?.metadata?.toString() === 'host'
                        }]);
                    }
                } catch (e) {
                    console.error('Failed to parse data message', e);
                }
            });

            await newRoom.connect(data.wsUrl, data.token);
            setRoom(newRoom);
            updateParticipantCount(newRoom);
            console.log('Connected to room:', newRoom.name);

            if (role === 'host') {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                const tracks = stream.getTracks();
                for (const track of tracks) {
                    const publication = await newRoom.localParticipant.publishTrack(track);
                    if (publication.track) {
                        setLocalTracks((prev) => [...prev, publication.track as LocalTrack]);
                    }
                }
                console.log("✅ Streaming started as host");
                setIsAudioEnabled(true);
                setIsVideoEnabled(true);
            } else {
                console.log("👀 Watching stream as viewer");
            }

        } catch (err: unknown) {
            console.error('LiveKit connection error:', err);
            setError(err instanceof Error ? err : new Error('LiveKit connection failed'));
        } finally {
            setIsConnecting(false);
        }
    }, [roomId, tokenEndpoint, updateParticipantCount]);

    const toggleAudio = useCallback(async () => {
        if (!room) return;
        const enabled = !isAudioEnabled;
        await room.localParticipant.setMicrophoneEnabled(enabled);
        setIsAudioEnabled(enabled);
    }, [room, isAudioEnabled]);

    const toggleVideo = useCallback(async () => {
        if (!room) return;
        const enabled = !isVideoEnabled;
        await room.localParticipant.setCameraEnabled(enabled);
        setIsVideoEnabled(enabled);
    }, [room, isVideoEnabled]);

    const sendMessage = useCallback(async (message: string) => {
        if (!room) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify({ type: 'chat', message }));
        console.log('Publishing message:', message);
        await room.localParticipant.publishData(data, { reliable: true });
        console.log('Message published successfully');

        // Add own message to state
        setMessages((prev) => [...prev, {
            id: Date.now().toString(),
            user: 'You',
            message: message,
            avatar: 'https://i.pravatar.cc/150?u=you',
            timestamp: Date.now(),
            isHost: room.localParticipant.metadata === 'host' || room.localParticipant.metadata?.toString() === 'host'
        }]);
    }, [room]);

    const disconnect = useCallback(async () => {
        if (room) {
            console.log('Disconnecting from room...');
            await room.disconnect();
            setRoom(null);
            setRemoteTracks([]);
            setLocalTracks([]);
            setMessages([]);
            setParticipantCount(0);
        }
    }, [room]);

    useEffect(() => {
        return () => {
            if (room) {
                room.disconnect();
            }
        };
    }, [room]);

    return {
        room,
        remoteTracks,
        localTracks,
        messages,
        participantCount,
        isAudioEnabled,
        isVideoEnabled,
        isConnecting,
        error,
        connect,
        toggleAudio,
        toggleVideo,
        sendMessage,
        disconnect,
    };
}
