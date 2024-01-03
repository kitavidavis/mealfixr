"use client";
import Link from 'next/link';
import React from 'react'

export default function Hero() {
    return (
        <section className="relative h-[calc(100vh-77px)] flex flex-col items-center justify-center text-center text-white py-0 px-3">
    <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video className="min-w-full min-h-full absolute object-cover" src="./bg.mp4" type="video/mp4" autoPlay muted loop></video>
    </div>
    <div className="video-content space-y-2">
        <h1 className="font-bold text-7xl pb-5">
          The next big thing in meal planners
        </h1>

        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              href="/meal-planner"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-bold text-center text-white rounded-full border border-white hover:border-orange-600 hover:bg-orange-600 focus:ring-4 focus:ring-gray-400 bg-transparent"
            >
              Try It For Free
            </Link>
          </div>
    </div>
</section>
    )
}
  
