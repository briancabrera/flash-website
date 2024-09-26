'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../../components/Navbar'
import FloatingLightningBolts from '../../components/FloatingLightningBolts'

export default function AboutPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLElement | null>(null)

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
    <div className="min-h-screen bg-blue-600 text-white">
      <Navbar />
      <main className="pt-20">
        <section ref={heroRef} className="relative py-20 overflow-hidden">
          <FloatingLightningBolts isVisible={isHeroVisible} boltCount={75} />
          <div className="container mx-auto px-6 relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Sobre Flash
            </motion.h1>
            <motion.div 
              className="bg-white text-gray-800 rounded-lg shadow-xl p-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg mb-6">
                Flash es una innovadora plataforma de pagos que combina la seguridad de la tecnología biométrica con la comodidad de los pagos digitales. Nuestra misión es simplificar las transacciones diarias, haciendo que pagar sea tan fácil como un toque.
              </p>
              <p className="text-lg mb-6">
                Fundada en 2023, Flash nació de la idea de que los pagos deberían ser rápidos, seguros y sin complicaciones. Nuestro equipo de expertos en tecnología y finanzas ha trabajado incansablemente para desarrollar una solución que revoluciona la forma en que interactuamos con el dinero.
              </p>
              <p className="text-lg">
                En Flash, creemos en un futuro donde el efectivo y las tarjetas físicas sean cosa del pasado. Estamos comprometidos con la innovación continua y la mejora de la experiencia de nuestros usuarios, siempre manteniendo los más altos estándares de seguridad y privacidad.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Flash. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}