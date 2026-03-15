"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlockEP: () => void;
}

export default function CartSidebar({ isOpen, onClose, onUnlockEP }: CartSidebarProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] z-[101] border-l border-white/10 flex flex-col shadow-2xl"
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-2xl font-anton uppercase tracking-widest flex items-center gap-3">
                                <ShoppingBag size={24} className="text-brand-orange" />
                                Your Cart
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                <ShoppingBag size={32} className="text-gray-500" />
                            </div>
                            <p className="text-xl font-anton uppercase tracking-widest text-white mb-2">Your cart is empty</p>
                            <p className="text-gray-400 font-inter text-sm max-w-xs mb-8">
                                Merchandise is coming soon. In the meantime, you can purchase early access to the DRISHTIKON EP.
                            </p>

                            <button
                                onClick={() => { onClose(); onUnlockEP(); }}
                                className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center"
                            >
                                Pay What You Want
                            </button>
                        </div>

                        <div className="p-6 border-t border-white/10 bg-black/50">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-inter text-gray-400">Subtotal</span>
                                <span className="font-anton text-xl font-bold tracking-widest">₹ 0</span>
                            </div>
                            <button
                                onClick={() => { onClose(); onUnlockEP(); }}
                                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-brand-orange hover:text-white transition-colors"
                            >
                                Checkout DRISHTIKON EP
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
