"use client";

import { motion } from "framer-motion";

export default function MerchSection() {
    return (
        <section id="merch" className="relative py-48 bg-transparent min-h-screen flex items-center justify-center">
            <div className="container px-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative inline-block"
                >
                    <div className="absolute inset-0 bg-brand-orange blur-[80px] opacity-20 mix-blend-screen -z-10"></div>
                    <h2 className="text-6xl md:text-9xl font-anton uppercase tracking-widest mb-6 opacity-30 select-none">Merch Store</h2>
                    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 border border-white/5 rounded-3xl p-12">
                        <div>
                            <h3 className="text-3xl md:text-5xl font-anton uppercase tracking-widest text-white mb-2">Coming Soon</h3>
                            <p className="text-gray-400 font-inter tracking-widest uppercase text-sm">Physical & Digital Exclusives</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
