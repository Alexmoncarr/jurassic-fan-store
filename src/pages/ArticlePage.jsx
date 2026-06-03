import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { articles } from '../data/articles'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

function parseContent(markdown) {
  // Basic markdown to HTML for article content
  const lines = markdown.trim().split('\n')
  let html = ''
  let inList = false
  let inTable = false
  let tableRows = []

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h2>${line.slice(3)}</h2>`
    } else if (line.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false }
      html += `<h3>${line.slice(4)}</h3>`
    } else if (line.startsWith('| ')) {
      if (!inTable) { inTable = true; tableRows = [] }
      const cells = line.split('|').filter(c => c.trim() && !c.match(/^[-:]+$/))
      if (cells.length > 0) tableRows.push(cells.map(c => c.trim()))
    } else if (inTable && !line.startsWith('|')) {
      // flush table
      if (tableRows.length > 0) {
        html += '<table><thead><tr>'
        tableRows[0].forEach(h => { html += `<th>${h}</th>` })
        html += '</tr></thead><tbody>'
        tableRows.slice(2).forEach(row => {
          html += '<tr>'
          row.forEach(cell => { html += `<td>${cell}</td>` })
          html += '</tr>'
        })
        html += '</tbody></table>'
        tableRows = []
        inTable = false
      }
    } else if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true }
      html += `<li>${line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</li>`
    } else if (line === '---') {
      if (inList) { html += '</ul>'; inList = false }
      html += '<hr style="border:none;border-top:1px solid var(--border);margin:2rem 0">'
    } else if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false }
    } else if (line.trim()) {
      if (inList) { html += '</ul>'; inList = false }
      const processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
      html += `<p>${processed}</p>`
    }
  }
  if (inList) html += '</ul>'
  return html
}

function ShareBar({ url, title }) {
  const enc = encodeURIComponent
  const copy = () => {
    navigator.clipboard?.writeText(url).then(() => alert('¡URL copiada!'))
  }
  return (
    <div className="share-bar">
      <span className="share-bar__label">Compartir:</span>
      <a href={`https://api.whatsapp.com/send?text=${enc(title + ' ' + url)}`} target="_blank" rel="noopener" className="share-btn share-btn--wa">📱 WhatsApp</a>
      <a href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`} target="_blank" rel="noopener" className="share-btn share-btn--tw">𝕏 Twitter</a>
      <a href={`https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener" className="share-btn share-btn--tg">✈️ Telegram</a>
      <button onClick={copy} className="share-btn share-btn--cp">🔗 Copiar</button>
    </div>
  )
}

export default function ArticlePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = articles.find(a => a.slug === slug)

  if (!article || !article.published) {
    return (
      <div style={{ textAlign: 'center', padding: '12rem 2rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🦕</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', marginBottom: '1rem' }}>Artículo no encontrado</h1>
        <p style={{ color: 'var(--ivory-dim)', marginBottom: '2rem' }}>Puede que aún no esté publicado o que la URL sea incorrecta.</p>
        <Link to="/articulos" className="btn btn--primary">Ver todos los artículos</Link>
      </div>
    )
  }

  const pageUrl = `${BASE}/#/articulos/${slug}`
  const dateStr = new Date(article.publishDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  const relatedProducts = products.slice(0, 3)

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.faq?.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishDate,
    "author": { "@type": "Organization", "name": "Jurassic Hub" },
    "publisher": { "@type": "Organization", "name": "Jurassic Hub", "url": BASE },
    "url": pageUrl,
    "inLanguage": "es"
  }

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
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {article.faq?.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      {/* ARTICLE HERO */}
      <div className="article-hero">
        <div className="article-hero__bg" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="article-hero__overlay" />
        <div className="container">
          <div className="article-hero__inner">
            <nav className="breadcrumb" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <span className="breadcrumb__sep">›</span>
              <Link to="/articulos">Artículos</Link>
              <span className="breadcrumb__sep">›</span>
              <span style={{ color: 'var(--ivory)' }}>{article.category}</span>
            </nav>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '1rem' }}>
              {article.category}
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem' }}>
              {article.title}
            </h1>
            <p style={{ color: 'var(--ivory-dim)', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '680px', marginBottom: '1.5rem' }}>
              {article.excerpt}
            </p>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--ivory-dim)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span>{dateStr}</span>
              <span>⏱ {article.readTime} min de lectura</span>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <div className="container">
        <div className="article-content">
          <div dangerouslySetInnerHTML={{ __html: parseContent(article.content) }} />

          {/* FAQ */}
          {article.faq?.length > 0 && (
            <div className="faq">
              <h2 className="faq__title">❓ Preguntas frecuentes</h2>
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
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            {article.tags?.map(tag => (
              <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', border: '1px solid var(--border)', borderRadius: '1px', color: 'var(--ivory-dim)' }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Related products */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              Productos relacionados
            </h3>
            <p style={{ color: 'var(--ivory-dim)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Selección de productos para fans de este tema — con enlaces a Amazon.es.
            </p>
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>

          {/* Back */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button onClick={() => navigate(-1)} className="btn btn--outline">← Volver</button>
            <Link to="/articulos" className="btn btn--primary">Ver todos los artículos →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
