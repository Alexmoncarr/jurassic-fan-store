import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

export default function Store() {
  const [cat, setCat] = useState('Todo')

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [cat])

  const filtered = cat === 'Todo' ? products : products.filter(p => p.category === cat)

  return (
    <>
      <Helmet>
        <title>Tienda — LEGO Jurassic, Figuras y Libros | Jurassic Hub</title>
        <meta name="description" content="Selección de LEGO Jurassic Park, figuras Hammond Collection, libros de paleontología y películas Blu-ray. Análisis honesto y links a Amazon España." />
        <link rel="canonical" href={`${BASE}/#/tienda`} />
      </Helmet>

      <div style={{ background: 'var(--gray-900)', borderBottom: '1px solid var(--border)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.5rem' }}>
            Tienda afiliada · Amazon.es · tag: jurassicfan21-21
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem' }}>
            Selección para fans
          </h1>
          <p style={{ color: 'var(--gray-400)', maxWidth: '56ch', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1rem' }}>
            Cada producto ha sido seleccionado manualmente por calidad, precio y relevancia. Comprando a través de nuestros links nos ayudas a seguir publicando, sin coste extra para ti.
          </p>
          <div className="affiliate-note" style={{ maxWidth: '640px' }}>
            Participamos en el Programa de Afiliados de Amazon EU. Las opiniones son independientes y honestas.
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        <div className="filter-bar">
          {categories.map(c => (
            <button key={c} className={`filter-btn${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
              {c} {c !== 'Todo' && `(${products.filter(p => p.category === c).length})`}
            </button>
          ))}
        </div>

        <div className="product-grid product-grid--4 reveal">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="reveal" style={{ marginTop: '3rem', padding: '2rem', background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1rem', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--amber)' }}>
            Cómo seleccionamos los productos
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', lineHeight: 1.65, maxWidth: '680px' }}>
            Solo incluimos productos con cientos de valoraciones positivas verificadas, de marcas reconocidas (Mattel, LEGO, Schleich) y con buena relación calidad-precio. Si un producto no lo recomendaríamos a un amigo fan exigente, no aparece aquí.
          </p>
        </div>
      </div>
    </>
  )
}
