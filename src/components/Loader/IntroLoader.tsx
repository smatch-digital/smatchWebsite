'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // 1. Lock Scroll
    document.body.style.overflow = 'hidden'

    // 2. Initialize Audio
    // Make sure this file exists in your public folder: /public/assets/sfx/intro.mp3
    const audio = new Audio('/assets/sfx/intro.mp3')
    audio.volume = 0.4 // Keep volume reasonable (don't blast users)
    audioRef.current = audio

    // 3. Attempt to Play
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        // Auto-play was prevented. This happens if user hasn't interacted with document.
        // We fail silently here to keep the visual experience intact.
        console.log("Audio autoplay blocked by browser policy:", error)
      })
    }

    // 4. Timer to exit
    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = 'auto'

      // Optional: Fade out audio instead of hard cut
      if (audioRef.current) {
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.05) {
            audioRef.current.volume -= 0.05
          } else {
            clearInterval(fadeOut)
            audioRef.current?.pause()
          }
        }, 50)
      }
    }, 2800)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050505]"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="relative flex items-center justify-center">

            {/* Gold Flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.2, 0], scale: [1, 1.5, 2] }}
              transition={{ duration: 2, times: [0, 0.5, 1], ease: "easeInOut" }}
              className="absolute inset-0 bg-[#FFB800] blur-[100px] rounded-full"
            />

            {/* Logo Text */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
                transition: { duration: 1, ease: "easeOut" }
              }}
              exit={{
                scale: 50,
                opacity: 0,
                filter: 'blur(20px)',
                transition: { duration: 0.8, ease: "circIn" }
              }}
              className="relative z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-heading text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
                  Smatch
                </h1>
                <span className="font-mono text-[#FFB800] text-xs tracking-[0.5em] uppercase pl-2">
                  Digital
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
