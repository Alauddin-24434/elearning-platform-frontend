"use client"
import dynamic from "next/dynamic"
import { useState } from "react"

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

interface LessonPlayerProps {
  video: string
  onEnded: () => void
}

export default function LessonPlayer({ video, onEnded }: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
      {video ? (
        <>
          <ReactPlayer
          src={video}
            width="100%"
            height="100%"
            controls
            playing={isPlaying}
            onEnded={onEnded}
            className="absolute inset-0"
          />
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/40 transition text-white text-4xl md:text-6xl"
            >
              ▶
            </button>
          )}
        </>
      ) : (
        <div className="text-gray-400 text-center">Loading video...</div>
      )}
    </div>
  )
}
