"use client";
import React from "react";
import { Spinner } from "@heroui/react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white/80 ">
            <div className="relative flex flex-col items-center">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 border-red-50 opacity-20 scale-150 animate-pulse" />

                {/* Main Spinner */}
                <Spinner
                    color="danger"
                    size="lg"
                    labelColor="danger"
                    classNames={{
                        wrapper: "w-16 h-16", // Custom larger size
                        circle1: "border-b-red-500",
                        circle2: "border-b-red-200",
                    }}
                />

                <div className="mt-8 flex flex-col items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight animate-pulse">
                        Please Wait
                    </h2>
                    <p className="text-sm font-medium text-gray-500 tracking-widest uppercase">
                        Fetching Latest Content
                    </p>
                </div>

                {/* Progress bar line for extra detail */}
                <div className="mt-6 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-red-500 origin-left animate-[loading-bar_1.5s_infinite_ease-in-out]" />
                </div>
            </div>

            <style jsx>{`
                @keyframes loading-bar {
                    0% {
                        transform: scaleX(0);
                        transform-origin: left;
                    }
                    45% {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                    50% {
                        transform: scaleX(1);
                        transform-origin: right;
                    }
                    100% {
                        transform: scaleX(0);
                        transform-origin: right;
                    }
                }
            `}</style>
        </div>
    );
}
