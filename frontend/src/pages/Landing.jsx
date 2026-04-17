import { Link } from 'react-router-dom'
import FeatureCard from '../components/landing/FeatureCard'

// ═══════════════════════════════════════════════════════════════
// Landing.jsx
// Página de aterrizaje principal de Folio
// ═══════════════════════════════════════════════════════════════

function Landing() {
  // ── Datos de las features ──────────────────────────────────────
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
        </svg>
      ),
      title: "Búsqueda inteligente",
      description: "Accede a más de 2 millones de títulos con la Google Books API. Busca por título, autor, ISBN o temática y encuentra exactamente lo que buscas.",
      dark: false,
  },
    {
      id: 2,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
        </svg>
      ),
      title: "Tu biblioteca personal",
      description: "Organiza tus lecturas en tres listas: leídos, pendientes y favoritos. Valora, anota y lleva el control de cada libro que pasa por tus manos.",
      dark: false,
    },
    {
      id: 3,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      title: "Recomendaciones por IA",
      description: "Nuestro motor de IA analiza tus lecturas y preferencias para sugerirte el próximo libro que amarás. Cuanto más lees, mejor te conoce.",
      dark: true,
      badge: "IA integrada",
    },
    {
      id: 4,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ),
      title: "Valora y reseña",
      description: "Puntúa cada libro con estrellas y escribe tus reseñas personales. Tu historial de valoraciones alimenta el motor de recomendaciones.",
      dark: false,
    },
    {
      id: 5,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
      title: "Reading Challenge",
      description: "Fija tu meta anual de libros y compite con amigos. Sigue tu progreso semana a semana y celebra cada libro completado.",
      dark: false,
    },
    {
      id: 6,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      ),
      title: "Comunidad lectora",
      description: "Descubre qué leen tus amigos, comparte listas curadas y debate sobre tus libros favoritos. La lectura es mejor en compañía.",
      dark: false,
    },
  ]

  // ── Datos de stats ─────────────────────────────────────────────
  const stats = [
    { value: "2M+", label: "Libros disponibles" },
    { value: "150K+", label: "Lectores activos" },
    { value: "98%", label: "Precisión de la IA" },
    { value: "4.9★", label: "Valoración media" },
  ]

  // ── Datos de planes ────────────────────────────────────────────
  const plans = [
    {
      id: 1,
      name: "Lector",
      price: "Gratis",
      period: "siempre",
      features: [
        "Biblioteca de hasta 50 libros",
        "Reto de lectura anual básico",
        "3 Listas personalizadas",
      ],
      cta: "Empezar ahora",
      path: "/registro",
      highlighted: false,
    },
    {
      id: 2,
      name: "Bibliófilo",
      price: "4,99€",
      period: "mes",
      badge: "Recomendado",
      features: [
        "Todo lo del plan Lector",
        "Folio AI: Recomendaciones avanzadas",
        "Estadísticas e insights profundos",
        "Listas y notas ilimitadas",
      ],
      cta: "Suscribirme",
      path: "/registro",
      highlighted: true,
    },
  ]

  return (
    <div className="overflow-x-hidden">
      

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="main"
        className="relative overflow-hidden bg-[#FDFCF7] bg-gradient-to-br from-[#FDFCF7] via-[#F4F3ED] to-[#FDFCF7]"
      >
        {/* Simplified decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(96,108,56,0.05)_0%,transparent_50%)]" />

        <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col xl:flex-row items-stretch gap-0 min-h-[520px]">
          
          {/* Left: Headline */}
          <div className="flex-none flex flex-col justify-center py-14 xl:py-28 pr-0 xl:pr-12">
            <p className="fade-up delay-1 text-xs font-bold tracking-[0.2em] uppercase text-[#606C38] mb-5">
              Tu biblioteca inteligente
            </p>
            <h1 className="fade-up delay-2 font-['Playfair_Display',Georgia,serif] text-6xl xl:text-7xl font-bold text-[#283618] leading-[1.04] whitespace-nowrap">
              Lee más.<br />
              Descubre<br />
              <em className="text-[#606C38] italic">más.</em>
            </h1>
          </div>

          {/* Center: Description + Book Stack */}
          <div className="relative flex-1 flex flex-col justify-center py-10 xl:py-20 xl:px-24">
            <div className="hidden xl:block absolute right-0 top-[5%] bottom-[5%] w-px bg-gradient-to-b from-transparent via-[#606C38]/20 to-transparent" />
            
            <p className="fade-up delay-3 text-[#283618]/80 text-base max-w-sm leading-relaxed mb-10">
              Organiza tu biblioteca personal, lleva el seguimiento de tus lecturas y recibe recomendaciones únicas generadas por IA basadas en tu gusto lector.
            </p>

            {/* Book stack - Optimized with dimensions and lazy loading */}
            <div className="fade-up delay-4 flex items-end gap-2">
              <img src="https://covers.openlibrary.org/b/id/8739161-M.jpg" alt="Portada de libro" width="40" height="88" loading="eager" className="book-spine w-10 object-cover" style={{ height: '5.5rem' }} />
              <img src="https://covers.openlibrary.org/b/id/9255566-M.jpg" alt="Portada de libro" width="40" height="72" loading="eager" className="book-spine w-10 object-cover" style={{ height: '4.5rem' }} />
              <img src="https://covers.openlibrary.org/b/id/8373426-M.jpg" alt="Portada de libro" width="40" height="96" loading="eager" className="book-spine w-10 object-cover" style={{ height: '6rem' }} />
              <img src="https://covers.openlibrary.org/b/id/8225261-M.jpg" alt="Portada de libro" width="40" height="80" loading="eager" className="book-spine w-10 object-cover" style={{ height: '5rem' }} />
              <img src="https://covers.openlibrary.org/b/id/12818862-M.jpg" alt="Portada de libro" width="40" height="64" loading="eager" className="book-spine w-10 object-cover" style={{ height: '4rem' }} />
              <img src="https://covers.openlibrary.org/b/id/10527843-M.jpg" alt="Portada de libro" width="40" height="88" loading="eager" className="book-spine w-10 object-cover" style={{ height: '5.5rem' }} />
              <span className="text-xs text-[#283618] font-medium self-center ml-8 whitespace-nowrap">+2M libros</span>
            </div>
          </div>

          {/* Right: Signup Card */}
          <div className="xl:w-96 shrink-0 flex items-start xl:items-start justify-center pt-8 xl:pt-10 pb-10 xl:pl-12">
            <div className="fade-up delay-5 w-full max-w-sm bg-white/90 backdrop-blur-sm border border-[#606C38]/30 rounded-2xl p-6 shadow-xl shadow-[#283618]/5">
              <div className="text-[#283618] p-1 mb-6 text-center font-bold text-xl">
                <p>Registrarse</p>
              </div>

              <div className="space-y-4 mb-8">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F3ED] border border-[#606C38]/20 text-[#283618] text-sm font-semibold transition-all shadow-sm">
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 32 32">
                    <use xlinkHref="/assets/sprite.svg#google" />
                  </svg>
                  Continuar con Google
                </button>

                <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-[#F4F3ED] border border-[#606C38]/20 text-[#283618] text-sm font-semibold transition-all shadow-sm">
                  <svg className="w-6 h-6 shrink-0" fill="currentColor">
                    <use xlinkHref="/assets/sprite.svg#apple" />
                  </svg>
                  Continuar con Apple
                </button>

                <Link 
                  to="/registro" 
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-[#283618] hover:bg-[#606C38] text-white text-sm font-bold transition-all shadow-lg shadow-[#283618]/10"
                >
                  Continuar con email
                </Link>

                <p className="text-[0.7rem] text-[#606C38]/70 text-center leading-relaxed px-2">
                  Al registrarte aceptas los{' '}
                  <a href="#" className="underline text-[#BC6C25] font-bold">
                    Términos
                  </a>
                  {' '}y la{' '}
                  <a href="#" className="underline text-[#BC6C25] font-bold">
                    Privacidad
                  </a>
                  .
                </p>
              </div>

              <div className="mb-8 px-4">
                <div className="h-px bg-[#606C38]/15" />
              </div>

              <div className="mb-2">
                <p className="text-sm text-[#606C38] text-center">
                  ¿Ya tienes una cuenta?
                  <Link to="/login" className="text-[#BC6C25] font-bold hover:underline ml-1.5 transition-colors">
                    Iniciar sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-20 content-visibility-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#606C38] mb-3">
            ¿Qué es Folio?
          </p>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl lg:text-5xl 
          font-bold text-[#283618] leading-none">
            Todo lo que un lector<br />
            <em className="text-[#606C38] italic">necesita</em>
          </h2>
        </div>

        {/* Grid primera fila (3 features) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {features.slice(0, 3).map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              dark={feature.dark}
              badge={feature.badge}
            />
          ))}
        </div>

        {/* Grid segunda fila (3 features) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(3, 6).map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              dark={feature.dark}
              badge={feature.badge}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-[#606C38]/10 bg-[#F4F3ED] content-visibility-auto">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="font-['Playfair_Display',Georgia,serif] text-4xl font-bold text-[#283618] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-[#606C38] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRICING SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#FDFCF7] content-visibility-auto">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl font-bold text-[#283618] mb-4">
              Elige tu plan de lectura
            </h2>
            <p className="text-[#606C38] max-w-2xl mx-auto">
              Desde lectores casuales hasta bibliófilos empedernidos. Tenemos un espacio para ti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-white border-2 border-[#283618] shadow-xl transform md:-translate-y-4 relative'
                    : 'bg-white border border-[#606C38]/15 hover:shadow-lg hover:duration-500'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#BC6C25] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <h3 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#283618] mb-7 text-center">
                  {plan.name}
                </h3>

                <div className={`text-4xl font-bold mb-6 ${plan.highlighted ? 'text-[#283618]' : 'text-[#606C38]'}`}>
                  {plan.price}
                  <span className="text-sm font-normal text-[#606C38]/60">
                    {' '}/ {plan.period}
                  </span>
                </div>

                <ul className="space-y-4 mb-8 text-sm text-[#606C38]">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-3 ${
                        plan.highlighted && index === 0 ? 'font-semibold text-[#283618]' : ''
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          plan.highlighted && index === 0 ? 'text-[#283618]' : 'text-[#606C38]'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={plan.highlighted && index === 0 ? '3' : '2'}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.path}
                  className={`block text-center py-3 px-6 rounded-xl font-bold transition-all ${
                    plan.highlighted
                      ? 'bg-[#BC6C25] text-white hover:bg-[#9A581E] hover:duration-300 shadow-lg shadow-[#BC6C25]/20'
                      : 'border border-[#606C38] text-[#606C38] hover:bg-[#283618] hover:text-white hover:border-[#283618] hover:duration-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-24 text-center content-visibility-auto">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#606C38] mb-4">
          Gratis para siempre
        </p>
        <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl lg:text-5xl 
        font-bold text-[#283618] leading-none mb-6">
          Empieza tu próxima<br />
          <em className="text-[#606C38] italic">gran lectura hoy</em>
        </h2>
        <p className="text-[#606C38] text-base max-w-md mx-auto leading-relaxed mb-10">
          Únete a miles de lectores que ya usan Folio para descubrir, organizar y disfrutar más de sus libros.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/registro" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#BC6C25] hover:bg-[#9A581E] hover:duration-300 text-white text-sm font-bold transition-all shadow-lg shadow-[#BC6C25]/20"
          >
            Crear cuenta gratuita →
          </Link>
          <Link 
            to="/inicio" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#606C38]/30 hover:border-[#283618] hover:bg-[#283618] text-[#283618] hover:text-white hover:duration-300 text-sm font-bold transition-all"
          >
            Explorar libros
          </Link>
        </div>
      </section>
      
    </div>
  )
}

export default Landing