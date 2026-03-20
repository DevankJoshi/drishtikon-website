"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StorySection() {
    return (
        <section id="about" className="relative min-h-screen py-32 flex items-center justify-center bg-black border-t border-white/10">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-wrap">

                {/* Left Side Cover Art */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="relative w-full aspect-square bg-gradient-to-br from-brand-orange to-brand-dark rounded-xl overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-grain mix-blend-overlay z-10"></div>
                    <Image
                        src="/cover.png"
                        alt="DRISHTIKON EP Cover"
                        fill
                        unoptimized
                        className="object-cover z-0"
                    />
                    <div className="absolute inset-0 border border-white/10 rounded-xl"></div>
                </motion.div>

                {/* Right Side Story Text */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col gap-8 justify-center h-full"
                >
                    {/* What You Receive Section - Smaller */}
                    <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-lg p-6">
                        <h3 className="text-2xl md:text-3xl font-anton uppercase tracking-wide text-brand-orange mb-4">
                            What You Receive
                        </h3>
                        <ul className="space-y-3 text-sm tracking-wide font-inter text-gray-300">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></div>
                                A private listening link to DRISHTIKON - the EP
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></div>
                                Exclusive documentation explaining the project
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></div>
                                Wallpapers for desktop and mobile devices
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></div>
                                Access to Qafka&apos;s Discord server
                            </li>
                        </ul>
                    </div>

                    {/* Story Quote Section */}
                    <div className="space-y-6 text-gray-300 font-inter text-lg leading-relaxed max-w-xl pr-8">
                        <p className="italic border-l-2 border-brand-orange pl-6">
                            &quot;Drishtikon is the psychological arc of a man fueled by ego, mistaking it for power and direction. As the story progresses, he is slowly dismantled, forced into introspection, and pushed toward an ego death.&quot;
                        </p>
                        <p>
                            What remains is a renewed perspective - one that allows him to finally recognize his true path and purpose.
                        </p>
                        <p className="font-bold text-white">&mdash; Qafka</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
