'use client'

import { useEffect, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface FloatingLightningBoltsProps {
  isVisible: boolean
  boltCount: number
}

const FloatingLightningBolts: React.FC<FloatingLightningBoltsProps> = ({ isVisible, boltCount }) => {
  const controls = useAnimation()

  const bolts = useMemo(() => {
    return Array(boltCount).fill(0).map((_, i) => ({
      id: i,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  }, [boltCount])

  useEffect(() => {
    if (isVisible) {
      controls.start(i => ({
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.2, 1],
        y: [0, Math.random() * 60 - 30, 0],
        x: [0, Math.random() * 40 - 20, 0],
        transition: {
          duration: bolts[i].duration,
          delay: bolts[i].delay,
          repeat: Infinity,
          repeatType: "reverse",
        }
      }))
    } else {
      controls.stop()
    }
  }, [isVisible, bolts, controls])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bolts.map((bolt, index) => (
        <motion.div
          key={bolt.id}
          className="absolute text-yellow-300"
          style={{
            fontSize: bolt.size,
            left: `${bolt.x}%`,
            top: `${bolt.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={controls}
          custom={index}
        >
          ⚡️
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingLightningBolts