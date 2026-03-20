'use client'

import React, { useState, useEffect } from 'react'
import { Waves } from '@/components/ui/wave-background'

interface SeamlessWavesLayoutProps {
    children: React.ReactNode
    className?: string
}

export function SeamlessWavesLayout({
    children,
    className = ""
}: SeamlessWavesLayoutProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <>{children}</>

    return (
        <div className={`relative w-full min-h-screen bg-brand-dark ${className}`}>
            {/* Fixed waves background - spans entire viewport */}
            <div className="fixed inset-0 z-0">
                <Waves
                    strokeColor="#d28723"
                    backgroundColor="#0a0a0a"
                    pointerSize={0.5}
                />
            </div>

            {/* Blur overlay for better text clarity */}
            <div className="fixed inset-0 z-[5] pointer-events-none backdrop-blur-[6px]"></div>

            {/* Content layer - scrolls over waves */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
