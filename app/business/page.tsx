'use client'

import { useState, useEffect, useRef, RefObject } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, CreditCard, BarChart2, Smartphone } from 'lucide-react'
import Navbar from '../../components/Navbar'
import FloatingLightningBolts from '../../components/FloatingLightningBolts'

const BusinessPage = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [isCtaVisible, setIsCtaVisible] = useState(false)
  const [isPricingVisible, setIsPricingVisible] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const heroRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const contactFormRef: RefObject<HTMLDivElement> = useRef(null)

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

    const pricingObserver = new IntersectionObserver(
      ([entry]) => {
        setIsPricingVisible(entry.isIntersecting)
      },
      observerOptions
    )

    const currentHeroRef = heroRef.current
    const currentCtaRef = ctaRef.current
    const currentPricingRef = pricingRef.current

    if (currentHeroRef) {
      heroObserver.observe(currentHeroRef)
    }

    if (currentCtaRef) {
      ctaObserver.observe(currentCtaRef)
    }

    if (currentPricingRef) {
      pricingObserver.observe(currentPricingRef)
    }

    return () => {
      if (currentHeroRef) {
        heroObserver.unobserve(currentHeroRef)
      }
      if (currentCtaRef) {
        ctaObserver.unobserve(currentCtaRef)
      }
      if (currentPricingRef) {
        pricingObserver.unobserve(currentPricingRef)
      }
    }
  }, [])

  const scrollToContact = (plan: string) => {
    setSelectedPlan(plan)
    const element = contactFormRef.current
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-600 to-white text-gray-800">
      <Navbar />

      <main className="relative z-10">
        <section ref={heroRef} className="hero relative min-h-screen flex items-center justify-center bg-blue-600 text-white overflow-hidden">
          <FloatingLightningBolts isVisible={isHeroVisible} boltCount={75} />
          <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Cobrá en un Flash
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-12 text-blue-100"
            >
              Revolucionando los pagos con tecnología biométrica POS
            </motion.p>
            <motion.a
              href="#planes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors inline-flex items-center"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector('#planes')
                if (element) {
                  const yOffset = -80
                  const y = element.getBoundingClientRect().top + window.scrollY + yOffset
                  window.scrollTo({ top: y, behavior: 'smooth' })
                }
              }}
            >
              Ver planes <ChevronRight className="ml-2" />
            </motion.a>
          </div>
        </section>

        <section id="oferta" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nuestra oferta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {[
                { icon: CreditCard, title: "Aceptá todas las tarjetas", content: "Con un solo contrato, procesá pagos de todas las tarjetas de crédito y débito." },
                { icon: BarChart2, title: "Visualizá tus ventas en tiempo real", content: "Accedé a un dashboard completo con estadísticas y reportes de tus ventas en tiempo real." },
                { icon: Smartphone, title: "Conseguí tu POS Flash", content: "Recibí un dispositivo POS de última generación con tecnología biométrica integrada." }
              ].map((offer, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full w-full max-w-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <offer.icon className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2 text-center">{offer.title}</h3>
                  <p className="text-gray-600 text-center">{offer.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={pricingRef} id="planes" className="hero relative min-h-screen flex items-center justify-center bg-blue-600 text-white overflow-hidden">
          <FloatingLightningBolts isVisible={isPricingVisible} boltCount={50} />
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Planes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Plan Básico", price: 90, transactions: 1000, features: ["Hasta 1000 transacciones mensuales", "Soporte por email", "Actualizaciones de seguridad", "Dashboard básico"] },
                { title: "Plan Pro", price: 150, transactions: 5000, features: ["Hasta 5000 transacciones mensuales", "Soporte prioritario 24/7", "Actualizaciones de seguridad", "Dashboard avanzado", "Integración con sistemas de contabilidad"] },
                { title: "Plan Empresarial", price: null, transactions: "5000+", features: ["Transacciones ilimitadas", "Soporte dedicado 24/7", "Actualizaciones de seguridad prioritarias", "Dashboard personalizado", "Integraciones a medida", "Acuerdo de nivel de servicio (SLA)"] }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                    {plan.price ? (
                      <p className="text-4xl font-bold mb-6">${plan.price} <span className="text-sm font-normal">/mes</span></p>
                    ) : (
                      <p className="text-4xl font-bold mb-6 break-words">Custom</p>
                    )}
                    <p className="mb-6">Hasta {plan.transactions} transacciones mensuales</p>
                    <ul className="mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center mb-2">
                          <ChevronRight className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6">
                    <button 
                      className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-center transition duration-300"
                      onClick={() => scrollToContact(plan.title)}
                    >
                      {plan.title === "Plan Empresarial" ? "Contactar ventas" : "Elegir Plan"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} id="contacto" className="hero relative min-h-screen flex items-center justify-center bg-blue-600 text-white overflow-hidden">
          <FloatingLightningBolts isVisible={isCtaVisible} boltCount={50} />
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ¿Listo para revolucionar tu sistema de pagos?
            </motion.h2>
            <div className="max-w-lg mx-auto" ref={contactFormRef}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Nombre</label>
                  <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-blue-800" required />
                </div>
                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-white mb-1">Plan</label>
                  <select 
                    id="plan" 
                    name="plan" 
                    className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-blue-800" 
                    value={selectedPlan} 
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    required
                  >
                    <option value="">Selecciona un plan</option>
                    <option value="Plan Básico">Plan Básico</option>
                    <option value="Plan Pro">Plan Pro</option>
                    <option value="Plan Empresarial">Plan Empresarial</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-blue-800" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Teléfono móvil</label>
                  <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 mb-4 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white text-blue-800" required />
                </div>
                <motion.button
                  type="submit"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors inline-flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Empezá ahora <ChevronRight className="ml-2" />
                </motion.button>
              </form>
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

export default BusinessPage