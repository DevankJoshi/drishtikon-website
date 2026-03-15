"use client";

import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

interface TiltWrapperProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number; // 1 is default, higher is more tilt
}

export default function TiltWrapper({
    children,
    className = "",
    intensity = 1,
}: TiltWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * intensity;
        const mouseY = (e.clientY - rect.top) * intensity;

        const rX = (mouseY / height) * ROTATION_RANGE - HALF_ROTATION_RANGE;
        const rY = (mouseX / width) * ROTATION_RANGE - HALF_ROTATION_RANGE;

        x.set(rX * -1);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`relative ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className="w-full h-full relative"
            >
                {children}
            </div>
        </motion.div>
    );
}
