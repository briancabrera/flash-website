'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase } from 'lucide-react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import FloatingLightningBolts from '../components/FloatingLightningBolts'

const HomePage = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      observerOptions
    )

    const currentHeroRef = heroRef.current

    if (currentHeroRef) {
      heroObserver.observe(currentHeroRef)
    }

    return () => {
      if (currentHeroRef) {
        heroObserver.unobserve(currentHeroRef)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-blue-600 text-white">
      <Navbar />
      <main className="relative z-10">
        <section ref={heroRef} className="hero relative min-h-screen flex items-center justify-center overflow-hidden">
          <FloatingLightningBolts isVisible={isHeroVisible} boltCount={100} />
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ¿Cómo querés experimentar Flash?
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-12 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Elegí tu camino y descubrí cómo Flash puede revolucionar tus pagos
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/users" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors inline-flex items-center">
                  <Users className="mr-2" /> Soy Usuario
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/business" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors inline-flex items-center">
                  <Briefcase className="mr-2" /> Soy Empresa
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="absolute bottom-0 w-full bg-blue-700 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Flash. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage