"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, IndianRupee, Mail } from "lucide-react";

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
    const [amount, setAmount] = useState<string>("15");
    const [email, setEmail] = useState<string>("");
    const minAmount = 15;
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        const finalAmount = parseInt(amount, 10);
        if (isNaN(finalAmount) || finalAmount < minAmount) {
            alert(`Minimum contribution is ₹${minAmount}`);
            return;
        }
        if (!email || !email.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            setIsLoading(true);
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: finalAmount, email }),
            });

            const data = await res.json();
            if (data.url) {
                // Save email locally so we can restore it after Stripe redirect
                localStorage.setItem("drishtikon_pending_email", email);
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to create checkout session.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue to-brand-orange"></div>
                        <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-orange rounded-full mix-blend-screen blur-[100px] opacity-20"></div>

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6">
                                <Lock className="text-brand-orange" size={28} />
                            </div>
                            <h2 className="text-3xl font-anton uppercase tracking-widest text-white mb-2">Unlock Early Access</h2>
                            <p className="text-gray-400 font-inter text-sm">
                                Pay what you want for <span className="text-white font-semibold">lifetime access</span> to the DRISHTIKON EP. Minimum ₹15.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-inter uppercase tracking-widest text-gray-500 mb-2">
                                    Your Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-inter text-sm focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-colors placeholder:text-gray-600"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div>
                                <label className="block text-xs font-inter uppercase tracking-widest text-gray-500 mb-2">
                                    Name Your Price (INR)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <IndianRupee size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="number"
                                        min={minAmount}
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-inter text-lg focus:outline-none focus:border-brand-orange focus:bg-white/10 transition-colors"
                                        placeholder="15"
                                    />
                                </div>
                                {parseInt(amount, 10) < minAmount && amount !== "" && (
                                    <p className="text-brand-orange text-xs mt-2 font-inter">Minimum amount is ₹{minAmount}</p>
                                )}
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Processing..." : "Continue to Payment →"}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-600 font-inter">🔒 Secure payments via Stripe. Lifetime access, no subscription.</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
