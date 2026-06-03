import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useRef } from 'react'
import { articles, publishedArticles } from '../data/articles'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import ArticleCard from '../components/ArticleCard'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

// Secure markdown parser — no dangerouslySetInnerHTML with unsanitized input
// All content is authored by us, but we still sanitize for safety
function sanitize(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function parseContent(markdown) {
  const lines = markdown.trim().split('\n')
  let html = ''
  let inList = false, inTable = false, tableRows = []

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h2>${line.slice(3)}</h2>`
    } else if (line.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h3>${line.slice(4)}</h3>`
    } else if (line.startsWith('| ') && !line.match(/^\|[-:\s|]+\|$/)) {
      if (!inTable) { inTable = true; tableRows = [] }
      const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
      tableRows.push(cells)
    } else if (inTable && !line.startsWith('|')) {
      if (tableRows.length > 0) {
        html += '<table><thead><tr>' + tableRows[0].map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>'
        tableRows.slice(2).forEach(row => {
          html += '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
        })
        html += '</tbody></table>'
      }
      tableRows = []; inTable = false
    } else if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true }
      html += `<li>${line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`
    } else if (line === '---') {
      if (inList) { html += '</ul>'; inList = false }
      html += '<hr>'
    } else if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false }
    } else if (line.trim()) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<p>${line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')}</p>`
    }
  }
  if (inList) html += '</ul>'
  return html
}

function ReadingProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setW(Math.min(100, pct))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="reading-progress">
      <div className="reading-progress__bar" style={{ width: `${w}%` }} />
    </div>
  )
}

function ShareBar({ url, title }) {
  const enc = encodeURIComponent
  const copy = () => navigator.clipboard?.writeText(url).then(() => alert('¡URL copiada!'))
  return (
    <div className="share-bar">
      <span className="share-bar__label">Compartir:</span>
      <a href={`https://api.whatsapp.com/send?text=${enc(title + ' ' + url)}`} target="_blank" rel="noopener" className="share-btn share-btn--wa">WhatsApp</a>
      <a href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`} target="_blank" rel="noopener" className="share-btn share-btn--tw">Twitter/X</a>
      <a href={`https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener" className="share-btn share-btn--tg">Telegram</a>
      <button onClick={copy} className="share-btn share-btn--cp">Copiar enlace</button>
    </div>
  )
}

export default function ArticlePage() {
  const { slug } = useParams()
  const nav = useNavigate()
  const article = articles.find(a => a.slug === slug)

  if (!article || !article.published) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦕</div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Artículo no encontrado</h1>
        <p style={{ color: 'var(--gray-400)', marginBottom: '2rem' }}>Puede que todavía no esté publicado.</p>
        <Link to="/articulos" className="btn btn--primary">Ver todos los artículos</Link>
      </div>
    )
  }

  const pageUrl = `${BASE}/#/articulos/${slug}`
  const dateStr = new Date(article.publishDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  const related = publishedArticles.filter(a => a.slug !== slug && a.category === article.category).slice(0, 3)
  const relatedProducts = products.slice(0, 3)

  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": article.title, "description": article.excerpt,
    "image": article.image, "datePublished": article.publishDate,
    "author": { "@type": "Organization", "name": "Jurassic Hub" },
    "publisher": { "@type": "Organization", "name": "Jurassic Hub", "url": BASE },
    "url": pageUrl, "inLanguage": "es"
  }
  const faqSchema = article.faq?.length > 0 ? {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": article.faq.map(f => ({
      "@type": "Question", "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null

  return (
    <>
      <Helmet>
        <title>{article.title} | Jurassic Hub</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <ReadingProgress />

      {/* Article hero */}
      <div className="article-hero" style={{ paddingTop: '56px' }}>
        <div className="article-hero__bg" style={{ backgroundImage: `url(${article.image})` }}
          onError={() => {}} />
        <div className="article-hero__overlay" />
        <div className="container">
          <div className="article-hero__inner">
            <nav className="breadcrumb">
              <Link to="/">Inicio</Link>
              <span className="breadcrumb__sep">›</span>
              <Link to="/articulos">Artículos</Link>
              <span className="breadcrumb__sep">›</span>
              <span style={{ color: 'var(--amber)' }}>{article.category}</span>
            </nav>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.75rem' }}>
              {article.category}
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>
              {article.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--gray-200)', maxWidth: '64ch', lineHeight: 1.7, marginBottom: '1rem' }}>
              {article.excerpt}
            </p>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span>Jurassic Hub Editorial</span>
              <span>·</span>
              <span>{dateStr}</span>
              <span>·</span>
              <span>{article.readTime} min lectura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body + sidebar */}
      <div className="container">
        <div className="article-layout">
          {/* Main content */}
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: parseContent(article.content) }} />

            {/* FAQ */}
            {article.faq?.length > 0 && (
              <div className="faq">
                <div className="faq__title">Preguntas frecuentes</div>
                {article.faq.map((item, i) => (
                  <details key={i} className="faq__item">
                    <summary className="faq__q">
                      {item.q}
                      <span className="faq__icon">+</span>
                    </summary>
                    <p className="faq__a">{item.a}</p>
                  </details>
                ))}
              </div>
            )}

            <ShareBar url={pageUrl} title={article.title} />

            {/* Tags */}
            <div className="tag-list" style={{ marginBottom: '2.5rem' }}>
              {article.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>

            {/* Related products */}
            <div style={{ borderTop: '2px solid var(--amber)', paddingTop: '1.5rem', marginTop: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.5rem' }}>
                Tienda afiliada
              </div>
              <h3 style={{ fontFamily: 'var(--font-condensed)', fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>
                Productos relacionados
              </h3>
              <div className="affiliate-note">Enlace de afiliado Amazon.es — sin coste extra para ti.</div>
              <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>

            {/* Nav buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
              <button onClick={() => nav(-1)} className="btn btn--outline">← Volver</button>
              <Link to="/articulos" className="btn btn--primary">Ver todos los artículos →</Link>
            </div>
          </div>

          {/* Article sidebar */}
          <aside className="article-sidebar">
            <div className="sidebar-widget" style={{ marginBottom: '1.25rem' }}>
              <div className="sidebar-widget__header">Artículos relacionados</div>
              {(related.length > 0 ? related : publishedArticles.slice(0,3)).map(a => (
                <ArticleCard key={a.id} article={a} horizontal />
              ))}
            </div>

            <div className="sidebar-widget">
              <div className="sidebar-widget__header">🛒 Recomendado</div>
              {products.slice(0,2).map(p => (
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
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
