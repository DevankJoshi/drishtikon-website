"use client";

import { motion } from "framer-motion";
import { Lock, Play } from "lucide-react";

const tracks = [
    { id: "01", name: "DRISHTIKON", duration: "1:42" },
    { id: "02", name: "100TAKGINN!! ft. Bellicose", duration: "2:34" },
    { id: "03", name: "HAADSE ft. Sarthak", duration: "3:05" },
    { id: "04", name: "GHAFLAT", duration: "2:21" },
    { id: "05", name: "METAMORPHOSIS ft. Anoushka", duration: "3:06" },
    { id: "06", name: "Sarkashi ft. Jyeshtha", duration: "3:35", bonusName: "Bonus Track" },
];

interface TracklistSectionProps {
    hasAccess?: boolean;
    onTrackSelect?: (trackIndex: number) => void;
}

export default function TracklistSection({ hasAccess = false, onTrackSelect }: TracklistSectionProps) {
    return (
        <section id="tracklist" className="relative py-32 bg-transparent min-h-screen flex flex-col items-center border-t border-white/5">
            <div className="container px-6 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-anton uppercase tracking-widest mb-6 font-bold text-white/95">Tracklist</h2>
                    {!hasAccess && (
                        <p className="text-brand-orange uppercase tracking-widest font-bold text-sm bg-brand-orange/10 py-2 px-6 rounded-full inline-block border border-brand-orange/20">
                            Purchase Early Access to unlock the full EP
                        </p>
                    )}
                    {hasAccess && (
                        <p className="text-green-400 uppercase tracking-widest font-bold text-sm bg-green-400/10 py-2 px-6 rounded-full inline-block border border-green-400/20">
                            ✓ Full Access Unlocked
                        </p>
                    )}
                </motion.div>

                <div className="space-y-4">
                    {tracks.map((track, i) => (
                        <motion.div
                            key={track.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`group flex items-center justify-between p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md transition-colors ${hasAccess ? "hover:bg-white/10 cursor-pointer" : "cursor-not-allowed"}`}
                            onClick={() => hasAccess && onTrackSelect?.(i)}
                        >
                            <div className="flex items-center gap-6">
                                <button
                                    className={`w-12 h-12 rounded-md flex items-center justify-center border shrink-0 transition-colors ${hasAccess ? "bg-brand-blue/10 border-brand-blue/20 group-hover:bg-brand-blue/20 hover:bg-brand-blue/30 active:scale-95" : "bg-black/50 border-white/10"}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (hasAccess) {
                                            onTrackSelect?.(i);
                                            document.getElementById("player")?.scrollIntoView({ behavior: "smooth" });
                                        }
                                    }}
                                >
                                    {hasAccess
                                        ? <Play size={18} className="text-brand-blue ml-0.5" />
                                        : <Lock size={18} className="text-gray-500 group-hover:text-brand-orange transition-colors" />
                                    }
                                </button>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-anton text-gray-500 tracking-widest">{track.id}</span>
                                        <h3 className={`text-lg md:text-xl font-bold font-inter transition-colors ${hasAccess ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                                            {hasAccess ? track.name : (track.bonusName || "Locked Track")}
                                        </h3>
                                    </div>
                                    <p className={`text-sm mt-1 uppercase tracking-widest ${hasAccess ? "text-brand-orange" : "text-gray-600"}`}>
                                        {hasAccess ? "Qafka" : "Requires Early Access"}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right hidden sm:block">
                                <span className="text-sm text-gray-500 font-inter tracking-widest">{track.duration}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
