"use client";

import Link from "next/link";
import { ShoppingCart, Unlock } from "lucide-react";
import { useEffect, useState } from "react";
import CartSidebar from "./CartSidebar";

interface NavigationProps {
    hasAccess?: boolean;
    onOpenPaywall?: () => void;
}

export default function Navigation({ hasAccess = false, onOpenPaywall }: NavigationProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"}`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold font-anton tracking-wider text-white">
                    <span className="italic">Q</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-inter">
                    <Link href="#hero" className="hover:text-brand-orange transition-colors">Home</Link>
                    <Link href="#about" className="hover:text-brand-orange transition-colors">EP</Link>
                    <Link href="#tracklist" className="hover:text-brand-orange transition-colors">Tracklist</Link>
                    <Link href="#player" className="hover:text-brand-orange transition-colors">Player</Link>
                </div>

                <div className="flex items-center gap-4">
                    {!hasAccess && (
                        <button
                            onClick={onOpenPaywall}
                            className="hidden sm:flex items-center gap-2 bg-brand-blue/20 border border-brand-blue/40 text-brand-blue hover:bg-brand-blue hover:text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all"
                        >
                            <Unlock size={14} />
                            Unlock EP
                        </button>
                    )}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="hover:text-brand-orange transition-colors flex items-center gap-2"
                    >
                        <ShoppingCart size={20} />
                        <span className="text-xs uppercase tracking-widest hidden sm:inline">Cart</span>
                    </button>
                </div>
            </div>

            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onUnlockEP={() => { setIsCartOpen(false); onOpenPaywall?.(); }}
            />
        </nav>
    );
}
