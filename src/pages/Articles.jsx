import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ArticleCard from '../components/ArticleCard'
import { publishedArticles } from '../data/articles'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'
const CATS = ['Todo', 'Paleontología', 'Ciencia', 'Cine', 'Guías', 'Noticias', 'Jurassic Park']

export default function Articles() {
  const [cat, setCat] = useState('Todo')

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [cat])

  const filtered = cat === 'Todo' ? publishedArticles : publishedArticles.filter(a => a.category === cat)

  return (
    <>
      <Helmet>
        <title>Artículos — Paleontología y Jurassic Park | Jurassic Hub</title>
        <meta name="description" content="Artículos de divulgación sobre dinosaurios, paleontología científica y el universo Jurassic Park y Jurassic World. Actualización quincenal." />
        <link rel="canonical" href={`${BASE}/#/articulos`} />
      </Helmet>

      {/* Page header */}
      <div style={{ background: 'var(--gray-900)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.5rem' }}>
            {publishedArticles.length} artículos publicados
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Artículos
          </h1>
          <p style={{ color: 'var(--gray-400)', maxWidth: '52ch', lineHeight: 1.65, fontSize: '0.95rem' }}>
            Paleontología con rigor científico y análisis del universo cinematográfico Jurassic. Publicamos cada dos semanas.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        {/* Category filters */}
        <div className="filter-bar">
          {CATS.map(c => (
            <button key={c} className={`filter-btn${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-400)' }}>
            No hay artículos en esta categoría todavía.
          </div>
        ) : (
          <div className="article-grid article-grid--3 reveal">
            {filtered.map(a => <ArticleCard key={a.id} article={a} size="md" />)}
          </div>
        )}
      </div>
    </>
  )
}
