'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Fingerprint, Zap, Wallet, Apple, Smartphone } from 'lucide-react'
import Navbar from '../../components/Navbar'
import FloatingLightningBolts from '../../components/FloatingLightningBolts'

const HeroText = () => {
  return (
    <h1 className="text-5xl md:text-6xl font-bold mb-8">
      Pagá en un Flash
    </h1>
  )
}

export default function UsersPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isCtaVisible, setIsCtaVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

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

    const ctaObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCtaVisible(entry.isIntersecting)
      },
      observerOptions
    )

    const currentHeroRef = heroRef.current
    const currentCtaRef = ctaRef.current

    if (currentHeroRef) {
      heroObserver.observe(currentHeroRef)
    }

    if (currentCtaRef) {
      ctaObserver.observe(currentCtaRef)
    }

    return () => {
      if (currentHeroRef) {
        heroObserver.unobserve(currentHeroRef)
      }
      if (currentCtaRef) {
        ctaObserver.unobserve(currentCtaRef)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-600 to-white text-gray-800">
      <Navbar />

      <main className="relative z-10">
        <section ref={heroRef} className="hero relative min-h-screen flex items-center justify-center bg-blue-600 text-white overflow-hidden">
          <FloatingLightningBolts isVisible={isHeroVisible} boltCount={75} />
          <div className="container mx-auto px-6 text-center relative z-10">
            <HeroText />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-12 text-blue-100"
            >
              Experimenta la forma más rápida y segura de pagar
            </motion.p>
            <motion.a
              href="#descargar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors inline-flex items-center"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector('#descargar')
                if (element) {
                  const yOffset = -80
                  const y = element.getBoundingClientRect().top + window.scrollY + yOffset
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
            >
              Empezá ahora <ChevronRight className="ml-2" />
            </motion.a>
          </div>
        </section>

        <section id="ventajas" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Descubrí las ventajas de Flash</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {[
                { icon: Fingerprint, title: "Pago biométrico", content: "Asocia tus huellas dactilares a diferentes tarjetas y paga con solo un toque." },
                { icon: Zap, title: "Rápido y cómodo", content: "Olvídate del efectivo y las tarjetas. Paga en segundos sin sacar la billetera." },
                { icon: Wallet, title: "Múltiples tarjetas", content: "Asocia cada huella de tu mano a una tarjeta diferente para mayor flexibilidad." }
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full w-full max-w-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <advantage.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-center">{advantage.title}</h3>
                  <p className="text-gray-600 text-center">{advantage.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} id="descargar" className="relative min-h-screen flex items-center justify-center bg-blue-600 text-white overflow-hidden">
          <FloatingLightningBolts isVisible={isCtaVisible} boltCount={50} />
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Descarga Flash y comienza a pagar en un instante
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl mb-12 text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Disponible para iOS y Android. Descarga gratis y revoluciona tu forma de pagar.
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="#"
                className="bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors inline-flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Apple className="mr-2" /> App Store
              </motion.a>
              <motion.a
                href="#"
                className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors inline-flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Smartphone className="mr-2" /> Google Play
              </motion.a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Flash. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}