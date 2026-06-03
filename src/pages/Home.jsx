import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ArticleCard from '../components/ArticleCard'
import ProductCard from '../components/ProductCard'
import Quiz from '../components/Quiz'
import useLiveCounter from '../hooks/useLiveCounter'
import { articles, publishedArticles, upcomingArticles } from '../data/articles'
import { products } from '../data/products'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [newsletter, setNewsletter] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const liveCount = useLiveCounter()
  const navigate = useNavigate()

  const featuredArticle = publishedArticles[0]
  const gridArticles = publishedArticles.slice(1)
  const featuredProducts = products.slice(0, 4)

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleNewsletter = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  // Countdown to next article
  const nextDate = new Date(upcomingArticles[0]?.publishDate || '2025-06-15')
  const [countdown, setCountdown] = useState('')
  useEffect(() => {
    const update = () => {
      const diff = nextDate - Date.now()
      if (diff <= 0) { setCountdown('¡Disponible hoy!'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setCountdown(`${d}d ${h}h ${m}m`)
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <Helmet>
        <title>Jurassic Hub — Dinosaurios, Paleontología y Jurassic Park en español</title>
        <meta name="description" content="La referencia en español sobre dinosaurios, paleontología científica y el universo de Jurassic Park y Jurassic World. Artículos rigurosos y tienda de productos seleccionados." />
        <link rel="canonical" href={`${BASE}/`} />
        <meta property="og:title" content="Jurassic Hub — Dinosaurios y Jurassic Park en español" />
        <meta property="og:description" content="Artículos de paleontología, análisis cinematográfico y tienda de productos Jurassic seleccionados." />
        <meta property="og:url" content={`${BASE}/`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Jurassic Hub",
          "url": BASE,
          "description": "La referencia en español sobre dinosaurios y Jurassic Park",
          "inLanguage": "es",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${BASE}/#/articulos?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>

      {/* HERO */}
      <section className="hero" aria-label="Inicio">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="container">
          <div className="hero__content">
            <div className="hero__eyebrow">
              El registro fósil digital — desde 1993
            </div>
            <h1 className="hero__title">
              66 millones<br />
              de años de<br />
              <em>historia viva</em>
            </h1>
            <p className="hero__desc">
              Paleontología rigurosa, el legado cinematográfico de Jurassic Park y los mejores productos para fans. En español.
            </p>
            <div className="hero__actions">
              <Link to="/articulos" className="btn btn--primary">
                Explorar artículos →
              </Link>
              <button className="btn btn--outline" onClick={() => setShowQuiz(true)}>
                ¿Qué dinosaurio eres? 🦖
              </button>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <div className="hero__stat-num">230M</div>
                <div className="hero__stat-label">Años evolución</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">700+</div>
                <div className="hero__stat-label">Especies descritas</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">6</div>
                <div className="hero__stat-label">Películas saga</div>
              </div>
              <div className="hero__stat">
                <div className="hero__stat-num">
                  <span className="live-counter">
                    <span className="live-dot" />
                    {liveCount}
                  </span>
                </div>
                <div className="hero__stat-label">Leyendo ahora</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTÍCULO DESTACADO */}
      <section className="section--sm" aria-label="Artículo destacado">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">Artículo destacado</div>
              <h2 className="section-title">Lo más leído</h2>
            </div>
            <Link to="/articulos" className="btn btn--ghost">Ver todos →</Link>
          </div>
          {featuredArticle && <ArticleCard article={featuredArticle} featured />}
        </div>
      </section>

      {/* ARTÍCULOS GRID */}
      {gridArticles.length > 0 && (
        <section className="section--sm" aria-label="Artículos recientes">
          <div className="container">
            <div className="article-grid">
              {gridArticles.map(a => (
                <div key={a.id} className="reveal">
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRÓXIMO ARTÍCULO */}
      {upcomingArticles.length > 0 && (
        <section className="section--sm">
          <div className="container reveal">
            <div style={{
              background: 'var(--coal)',
              border: '1px dashed var(--border-warm)',
              borderRadius: '2px',
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2rem' }}>📅</span>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-dim)', marginBottom: '0.25rem' }}>
                    Próximo artículo
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: '700' }}>
                    {upcomingArticles[0].title}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--ivory-dim)', marginBottom: '0.25rem' }}>
                  Publicación en
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--amber)' }}>
                  {countdown}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRODUCTOS DESTACADOS */}
      <section className="section" aria-label="Productos recomendados">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <div className="section-label">Tienda afiliada Amazon</div>
              <h2 className="section-title">Selección de la semana</h2>
            </div>
            <Link to="/tienda" className="btn btn--ghost">Ver todo →</Link>
          </div>
          <div className="affiliate-note">
            ★ Enlace de afiliado Amazon.es — al comprar a través de nuestros enlaces obtenemos una pequeña comisión sin coste adicional para ti. Solo recomendamos productos que realmente usaríamos.
          </div>
          <div className="product-grid">
            {featuredProducts.map((p, i) => (
              <div key={p.id} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/tienda" className="btn btn--outline">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section--sm">
        <div className="container">
          <div className="newsletter reveal">
            <h2 className="newsletter__title">🦕 Cada dos semanas, un nuevo artículo</h2>
            <p className="newsletter__desc">
              Paleontología rigurosa, análisis cinematográfico y novedades del universo Jurassic. Sin spam. Solo dinosaurios.
            </p>
            {submitted ? (
              <p style={{ color: 'var(--amber)', fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>
                ✓ ¡Gracias! Te avisaremos con cada publicación.
              </p>
            ) : (
              <form className="newsletter__form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  className="newsletter__input"
                  placeholder="tu@email.com"
                  value={newsletter}
                  onChange={e => setNewsletter(e.target.value)}
                  required
                  aria-label="Tu dirección de email"
                />
                <button type="submit" className="btn btn--primary">Suscribirme</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
    </>
  )
}
