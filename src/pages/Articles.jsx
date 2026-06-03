import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ArticleCard from '../components/ArticleCard'
import { publishedArticles, upcomingArticles } from '../data/articles'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

export default function Articles() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Helmet>
        <title>Artículos — Paleontología, Dinosaurios y Jurassic Park | Jurassic Hub</title>
        <meta name="description" content="Artículos de divulgación sobre dinosaurios, paleontología científica y análisis del universo Jurassic Park y Jurassic World. Actualización quincenal." />
        <link rel="canonical" href={`${BASE}/#/articulos`} />
      </Helmet>

      {/* HERO */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--void)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--amber)' }} />
            Archivo de artículos
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '1rem' }}>
            El registro<br /><em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>fósil</em>
          </h1>
          <p style={{ color: 'var(--ivory-dim)', maxWidth: '560px', lineHeight: '1.7' }}>
            Divulgación paleontológica y análisis cinematográfico en español. Publicamos cada dos semanas. El rigor científico no está reñido con la pasión por la saga.
          </p>
        </div>
      </section>

      {/* PUBLICADOS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">{publishedArticles.length} artículos publicados</div>
              <h2 className="section-title">Disponibles ahora</h2>
            </div>
          </div>
          <div className="article-grid">
            {publishedArticles.map((a, i) => (
              <div key={a.id} className="reveal" style={{ transitionDelay: `${(i % 3) * 0.1}s` }}>
                <ArticleCard article={a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMOS */}
      {upcomingArticles.length > 0 && (
        <section className="section--sm">
          <div className="container">
            <div className="section-header reveal">
              <div>
                <div className="section-label">Calendario editorial</div>
                <h2 className="section-title">Próximamente</h2>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
              {upcomingArticles.map(a => {
                const dateStr = new Date(a.publishDate).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })
                return (
                  <div key={a.id} className="reveal" style={{
                    background: 'var(--coal)',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    opacity: 0.65
                  }}>
                    <div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.4rem' }}>
                        {a.category}
                      </div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', fontWeight: '700' }}>
                        {a.title}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--ivory-dim)' }}>
                        {dateStr}
                      </div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ivory-dim)', opacity: 0.5, marginTop: '0.25rem' }}>
                        ⏳ Próximamente
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
