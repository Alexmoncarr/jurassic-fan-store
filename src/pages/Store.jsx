import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

export default function Store() {
  const [active, setActive] = useState('Todo')

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [active])

  const filtered = active === 'Todo' ? products : products.filter(p => p.category === active)

  return (
    <>
      <Helmet>
        <title>Tienda Jurassic — Los mejores productos de Jurassic Park y World | Jurassic Hub</title>
        <meta name="description" content="Figuras, sets LEGO, libros y películas de Jurassic Park y Jurassic World. Selección curada con análisis detallado y enlaces a Amazon España." />
        <link rel="canonical" href={`${BASE}/#/tienda`} />
        <meta property="og:title" content="Tienda Jurassic Hub — Productos seleccionados" />
        <meta property="og:description" content="LEGO, figuras Mattel, libros de paleontología y películas. Los mejores productos para fans de la saga." />
      </Helmet>

      {/* HERO tienda */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--void)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--amber)' }} />
            Tienda afiliada Amazon.es
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '1rem' }}>
            Productos para<br /><em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>verdaderos fans</em>
          </h1>
          <p style={{ color: 'var(--ivory-dim)', maxWidth: '560px', lineHeight: '1.7', marginBottom: '2rem' }}>
            Selección curada de LEGO, figuras, libros y películas de la saga Jurassic. Cada producto ha sido analizado individualmente. Los enlaces van a Amazon España con nuestro tag de afiliado.
          </p>
          <div className="affiliate-note">
            Participamos en el Programa de Afiliados de Amazon EU. Al comprar a través de nuestros enlaces recibimos una pequeña comisión, sin ningún coste adicional para ti.
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Filtrar por categoría">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${(i % 4) * 0.08}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--ivory-dim)' }}>
              No hay productos en esta categoría todavía.
            </div>
          )}

          {/* Nota editorial */}
          <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--coal)', border: '1px solid var(--border)', borderRadius: '2px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--amber)' }}>
              ¿Cómo elegimos los productos?
            </h3>
            <p style={{ color: 'var(--ivory-dim)', fontSize: '0.9rem', lineHeight: '1.7', maxWidth: '680px' }}>
              Cada producto de esta tienda ha sido seleccionado por calidad, relación calidad-precio y relevancia para los fans de la saga. Damos prioridad a productos con cientos de valoraciones positivas verificadas, marcas de reconocida calidad (Mattel, LEGO, Schleich) y libros con aval científico o cultural. No incluimos productos que no recomendaríamos a un fan exigente.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
