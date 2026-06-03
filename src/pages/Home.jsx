import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ArticleCard from '../components/ArticleCard'
import ProductCard from '../components/ProductCard'
import Quiz from '../components/Quiz'
import { publishedArticles } from '../data/articles'
import { products } from '../data/products'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'
const FMT = { day:'numeric', month:'short', year:'numeric' }

function Sidebar({ articles }) {
  const nav = useNavigate()
  const top = [...articles].sort((a,b) => b.reviews||0 - a.reviews||0).slice(0,5)
  const featuredProducts = products.slice(0, 3)

  return (
    <aside className="sidebar">
      {/* Trending articles */}
      <div className="sidebar-widget">
        <div className="sidebar-widget__header">
          <span className="live-badge"><span className="live-dot"/>En directo</span>
          Lo más leído
        </div>
        <ol className="sidebar-ranking">
          {articles.slice(0,5).map((a,i) => (
            <li key={a.id} className="sidebar-ranking__item" onClick={() => nav(`/articulos/${a.slug}`)}>
              <span className="sidebar-ranking__num">{i+1}</span>
              <div>
                <div className="sidebar-ranking__title">{a.title}</div>
                <div className="sidebar-ranking__cat">{a.category}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Product recommendations */}
      <div className="sidebar-widget">
        <div className="sidebar-widget__header">🛒 Más vendidos esta semana</div>
        {featuredProducts.map(p => (
          <a key={p.id} href={`https://www.amazon.es/dp/${p.asin}?tag=jurassicfan21-21`}
            target="_blank" rel="noopener nofollow" className="sidebar-product">
            <div className="sidebar-product__img">
              <img src={p.image} alt={p.name}
                onError={e => e.target.src='https://placehold.co/56x56/1c1c1c/e8a01a?text=JW'} loading="lazy" />
            </div>
            <div>
              <div className="sidebar-product__name">{p.name}</div>
              <div className="sidebar-product__price">{p.price}</div>
            </div>
          </a>
        ))}
        <div style={{ padding:'0.75rem 1rem', borderTop:'1px solid var(--border)' }}>
          <Link to="/tienda" className="btn btn--ghost" style={{ fontSize:'0.72rem' }}>Ver toda la tienda →</Link>
        </div>
      </div>

      {/* Quick fact widget */}
      <div className="sidebar-widget">
        <div className="sidebar-widget__header">🦖 ¿Sabías que?</div>
        <div style={{ padding:'1rem', fontSize:'0.82rem', color:'var(--gray-200)', lineHeight:1.6 }}>
          <p style={{ marginBottom:'0.75rem' }}>El <strong>Jurassic World: Rebirth</strong> (2025) recaudó <strong style={{color:'var(--amber)'}}>$868M</strong> mundialmente, convirtiéndose en la más taquillera desde el Jurassic World original de 2015.</p>
          <p>Está confirmada la <strong>sexta entrega</strong> de la saga, actualmente en preproducción.</p>
        </div>
      </div>
    </aside>
  )
}

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [newsletter, setNewsletter] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const nav = useNavigate()
  const [count, setCount] = useState(68)

  useEffect(() => {
    const t = setInterval(() => setCount(c => Math.max(32,Math.min(140, c + (Math.random()<.5?-1:1)))), 8000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)} }), { threshold:0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const hero = publishedArticles[0]
  const secondary = publishedArticles.slice(1,4)
  const grid1 = publishedArticles.slice(4,8)
  const grid2 = publishedArticles.slice(8,12)

  return (
    <>
      <Helmet>
        <title>Jurassic Hub — Dinosaurios, Paleontología y Jurassic Park en español</title>
        <meta name="description" content="La referencia en español sobre dinosaurios y Jurassic Park. Artículos de paleontología con rigor científico, análisis cinematográficos y selección de productos para fans." />
        <link rel="canonical" href={`${BASE}/`} />
        <meta property="og:title" content="Jurassic Hub — Dinosaurios y Jurassic Park" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context":"https://schema.org","@type":"WebSite","name":"Jurassic Hub",
          "url":BASE,"description":"La referencia en español sobre Jurassic Park y paleontología",
          "inLanguage":"es"
        })}</script>
      </Helmet>

      {/* HERO */}
      {hero && (
        <div className="hero" id="noticias">
          <div className="container container--xl" style={{padding:0}}>
            <div className="hero__split">
              <div className="hero__main" onClick={() => nav(`/articulos/${hero.slug}`)}
                role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&nav(`/articulos/${hero.slug}`)}>
                <img className="hero__main-img" src={hero.image} alt={hero.title}
                  onError={e=>e.target.src='https://placehold.co/900x500/111/e8a01a?text=Jurassic+Hub'} />
                <div className="hero__main-overlay" />
                <div className="hero__main-body">
                  <div className="hero__cat">{hero.category}</div>
                  <h1 className="hero__title">{hero.title}</h1>
                  <p className="hero__excerpt">{hero.excerpt}</p>
                  <div className="hero__meta">
                    <span>{new Date(hero.publishDate).toLocaleDateString('es-ES',FMT)}</span>
                    <span>·</span>
                    <span>{hero.readTime} min lectura</span>
                    <span style={{marginLeft:'auto',color:'var(--green)',display:'flex',gap:'0.4rem',alignItems:'center'}}>
                      <span className="live-dot"/>
                      <span>{count} leyendo ahora</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="hero__secondary">
                {secondary.map(a => (
                  <div key={a.id} className="hero__secondary-item"
                    onClick={() => nav(`/articulos/${a.slug}`)}>
                    <div className="hero__secondary-cat">{a.category}</div>
                    <div className="hero__secondary-title">{a.title}</div>
                    <div className="hero__secondary-meta">
                      {new Date(a.publishDate).toLocaleDateString('es-ES',FMT)} · {a.readTime} min
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT WITH SIDEBAR */}
      <div className="container container--xl">
        <div className="page-layout">
          <main>
            {/* Articles grid row 1 */}
            {grid1.length > 0 && (
              <section className="section" style={{paddingTop:'2rem'}}>
                <div className="section-header reveal">
                  <div>
                    <div className="section-label">Artículos</div>
                    <div className="section-title">Últimas publicaciones</div>
                  </div>
                  <Link to="/articulos" className="btn btn--ghost">Ver todo →</Link>
                </div>
                <div className="article-grid reveal" style={{transitionDelay:'0.1s'}}>
                  {grid1.map(a => <ArticleCard key={a.id} article={a} size="md" />)}
                </div>
              </section>
            )}

            {/* Featured products (4 in a row) */}
            <section className="section">
              <div className="section-header reveal">
                <div>
                  <div className="section-label">Tienda afiliada Amazon</div>
                  <div className="section-title">Productos destacados</div>
                </div>
                <Link to="/tienda" className="btn btn--ghost">Ver todo →</Link>
              </div>
              <div className="affiliate-note reveal">
                Participamos en el Programa de Afiliados de Amazon EU. Al comprar a través de nuestros enlaces recibimos una pequeña comisión sin ningún coste adicional para ti.
              </div>
              <div className="product-grid product-grid--4 reveal">
                {products.slice(0,4).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>

            {/* More articles */}
            {grid2.length > 0 && (
              <section className="section">
                <div className="section-header reveal">
                  <div>
                    <div className="section-label">Paleontología y ciencia</div>
                    <div className="section-title">Más artículos</div>
                  </div>
                </div>
                <div className="article-grid article-grid--3 reveal">
                  {grid2.map(a => <ArticleCard key={a.id} article={a} size="sm" />)}
                </div>
              </section>
            )}

            {/* Quiz CTA */}
            <section className="section reveal">
              <div style={{
                background:'var(--card-bg)',border:'1px solid var(--border)',
                padding:'2.5rem',textAlign:'center',
                backgroundImage:'radial-gradient(ellipse at 50% 50%, rgba(232,160,26,.06) 0%, transparent 70%)'
              }}>
                <div style={{fontFamily:'var(--font-condensed)',fontSize:'0.7rem',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'0.75rem'}}>
                  Test interactivo
                </div>
                <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:900,marginBottom:'0.75rem'}}>
                  ¿Qué dinosaurio eres?
                </h2>
                <p style={{fontSize:'0.9rem',color:'var(--gray-400)',maxWidth:'44ch',margin:'0 auto 1.5rem',lineHeight:1.6}}>
                  3 preguntas. Descubre si eres un T-Rex, un Velociraptor, un Braquiosaurio o algo completamente diferente.
                </p>
                <button className="btn btn--primary" onClick={() => setShowQuiz(true)}>
                  Empezar el test →
                </button>
              </div>
            </section>

            {/* Newsletter */}
            <section className="section">
              <div className="newsletter reveal">
                <h2 className="newsletter__title">📬 Cada dos semanas, nuevo artículo</h2>
                <p className="newsletter__desc">Paleontología rigurosa y análisis cinematográfico en español. Sin spam.</p>
                {submitted ? (
                  <p style={{color:'var(--green)',fontFamily:'var(--font-condensed)',fontWeight:700}}>✓ ¡Gracias! Te avisaremos.</p>
                ) : (
                  <form className="newsletter__form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}>
                    <input type="email" className="newsletter__input" placeholder="tu@email.com" value={newsletter} onChange={e=>setNewsletter(e.target.value)} required />
                    <button type="submit" className="btn btn--primary">Suscribirme</button>
                  </form>
                )}
              </div>
            </section>
          </main>

          <Sidebar articles={publishedArticles} />
        </div>
      </div>

      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
    </>
  )
}
