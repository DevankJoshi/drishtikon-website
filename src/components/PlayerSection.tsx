"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Lock, Loader2 } from "lucide-react";
import PaywallModal from "./PaywallModal";
import TiltWrapper from "./TiltWrapper";

// ─── UPDATE THESE TRACKS WITH YOUR ACTUAL SONG FILES ────────────────────────
// Place your .mp3 files in /public/songs/ and update the titles/src below.
const TRACKS = [
    {
        id: 1,
        title: "DRISHTIKON",
        artist: "Qafka",
        src: "/songs/01. DRISHTIKON.wav",
    },
    {
        id: 2,
        title: "100TAKGINN!! ft. Bellicose",
        artist: "Qafka",
        src: "/songs/02. 100TAKGINN!! ft. Bellicose.wav",
    },
    {
        id: 3,
        title: "HAADSE ft. Sarthak",
        artist: "Qafka",
        src: "/songs/03. HAADSE ft. Sarthak.wav",
    },
    {
        id: 4,
        title: "GHAFLAT",
        artist: "Qafka",
        src: "/songs/04. GHAFLAT.wav",
    },
    {
        id: 5,
        title: "METAMORPHOSIS ft. Anoushka",
        artist: "Qafka",
        src: "/songs/05. METAMORPHOSIS ft. Anoushka.wav",
    },
    {
        id: 6,
        title: "Sarkashi ft. Jyeshtha (Bonus)",
        artist: "Qafka",
        src: "/songs/Sarkashi ft. Jyeshtha.wav",
    }
];
// ─────────────────────────────────────────────────────────────────────────────

export default function PlayerSection({ selectedTrackIndex }: { selectedTrackIndex?: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [isCheckingAccess, setIsCheckingAccess] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");

    const currentTrack = TRACKS[currentTrackIndex];

    // ── Check lifetime access on mount ──────────────────────────────────────
    useEffect(() => {
        const checkAccess = async () => {
            setIsCheckingAccess(true);
            try {
                const email = localStorage.getItem("drishtikon_email");
                if (!email) {
                    setIsLocked(true);
                    return;
                }
                const res = await fetch("/api/check-access", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();
                setIsLocked(!data.hasAccess);
            } catch {
                setIsLocked(true);
            } finally {
                setIsCheckingAccess(false);
            }
        };
        checkAccess();
    }, []);

    // ── Handle track selection from tracklist ──────────────────────────────
    useEffect(() => {
        if (selectedTrackIndex !== undefined && !isLocked) {
            setCurrentTrackIndex(selectedTrackIndex);
            setIsPlaying(true);
        }
    }, [selectedTrackIndex, isLocked]);

    // ── Audio controls ───────────────────────────────────────────────────────
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio error:", e));
        }
    }, [currentTrackIndex, isPlaying]);

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        if (!isNaN(total)) {
            setProgress((current / total) * 100);
            setCurrentTime(formatTime(current));
            setDuration(formatTime(total));
        }
    };

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${sec < 10 ? "0" : ""}${sec}`;
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = percent * audioRef.current.duration;
    };

    return (
        <section id="player" className="relative py-24 bg-transparent border-y border-white/5">
            <div className="container px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-widest text-brand-blue font-bold text-white/95">The Experience</h2>
                </motion.div>

                <TiltWrapper intensity={0.5}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-md overflow-hidden"
                    >
                        {/* ── Locked / Loading Overlay ──────────────────────────── */}
                        {(isLocked || isCheckingAccess) && (
                            <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center rounded-3xl">
                                {isCheckingAccess ? (
                                    <>
                                        <Loader2 size={40} className="text-brand-orange mb-4 animate-spin" />
                                        <p className="text-white/80 font-inter text-sm">Checking access…</p>
                                    </>
                                ) : (
                                    <>
                                        <Lock size={48} className="text-brand-orange mb-6" />
                                        <h3 className="text-2xl font-anton uppercase tracking-widest mb-2 font-bold">Player Locked</h3>
                                        <p className="text-white/75 font-inter text-sm mb-6 max-w-sm text-center">
                                            Pay once, stream forever. Unlock the full DRISHTIKON EP experience.
                                        </p>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-blue-600 transition-all hover:scale-105"
                                        >
                                            Unlock Now — Pay What You Want
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10 ${isLocked || isCheckingAccess ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                            <audio
                                ref={audioRef}
                                src={currentTrack.src}
                                onTimeUpdate={handleTimeUpdate}
                                onEnded={nextTrack}
                                className="hidden"
                            />

                            {/* ── Artwork ────────────────────────────────────────── */}
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-gradient-to-br from-brand-orange to-brand-dark shadow-2xl relative overflow-hidden shrink-0 group">
                                <div className="absolute inset-0 bg-grain mix-blend-overlay z-10"></div>
                                <Image
                                    src="/cover.png"
                                    alt="Cover Art"
                                    fill
                                    unoptimized
                                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                                    className="object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* ── Controls ───────────────────────────────────────── */}
                            <div className="w-full flex justify-center flex-col">
                                <div className="mb-2">
                                    <h4 className="text-2xl font-bold font-inter text-white/95">{currentTrack.title}</h4>
                                    <p className="text-brand-orange uppercase tracking-widest text-sm font-bold mt-1">{currentTrack.artist}</p>
                                </div>

                                {/* Track selector dots */}
                                <div className="flex gap-2 mt-3 mb-6">
                                    {TRACKS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setCurrentTrackIndex(i); setIsPlaying(true); }}
                                            className={`w-2 h-2 rounded-full transition-all ${i === currentTrackIndex ? "bg-brand-blue w-5" : "bg-white/20 hover:bg-white/40"}`}
                                        />
                                    ))}
                                </div>

                                {/* Progress Bar */}
                                <div className="my-4 w-full group cursor-pointer" onClick={handleSeek}>
                                    <div className="h-1.5 bg-white/10 rounded-full w-full overflow-hidden relative">
                                        <div className="absolute top-0 left-0 h-full bg-brand-blue transition-all" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-inter tracking-widest">
                                        <span>{currentTime}</span>
                                        <span>{duration}</span>
                                    </div>
                                </div>

                                {/* Buttons Row */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <button onClick={prevTrack} className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95">
                                            <SkipBack size={24} />
                                        </button>
                                        <button onClick={togglePlay} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform shadow-lg">
                                            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                                        </button>
                                        <button onClick={nextTrack} className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-95">
                                            <SkipForward size={24} />
                                        </button>
                                    </div>

                                    {/* Volume */}
                                    <div className="hidden sm:flex items-center gap-3">
                                        <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white transition-colors">
                                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            value={isMuted ? 0 : volume}
                                            onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                                            className="w-20 accent-brand-blue cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </TiltWrapper>
            </div>

            <PaywallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
}
