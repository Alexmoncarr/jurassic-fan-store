import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { articles, publishedArticles } from '../data/articles'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import ArticleCard from '../components/ArticleCard'
import TableOfContents from '../components/TableOfContents'
import { AdSlotHorizontal } from '../components/AdSlot'

const BASE = 'https://alexmoncarr.github.io/jurassic-fan-store'

function parseContent(markdown, inlineImages = []) {
  const lines = markdown.trim().split('\n')
  let html = ''
  let inList = false, inTable = false, tableRows = []

  // Build map: heading text → image to show after it
  const imgMap = {}
  for (const img of inlineImages) {
    if (img.after) imgMap[img.after] = img
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false }
      const title = line.slice(3)
      // Generate anchor id
      const id = title.toLowerCase()
        .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
        .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
        .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
      html += `<h2 id="${id}">${title}</h2>`
      // Inject inline image after this heading if defined
      const img = imgMap[title]
      if (img) {
        html += `<figure style="margin:1.5rem 0 2rem;border:1px solid rgba(255,255,255,0.07);border-radius:2px;overflow:hidden">
          <img src="${img.url}" alt="${img.caption}" loading="lazy" style="width:100%;height:auto;display:block;max-height:420px;object-fit:cover"
            onerror="this.style.display='none'" />
          <figcaption style="padding:.6rem 1rem;font-size:.75rem;color:#888;font-style:italic;background:var(--gray-900)">${img.caption}</figcaption>
        </figure>`
      }
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
    const fn = () => {
      const el = document.documentElement
      setW(Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div style={{ position:'fixed',top:0,left:0,right:0,height:'3px',background:'var(--gray-700)',zIndex:1000 }}>
      <div style={{ height:'100%',background:'var(--amber)',width:`${w}%`,transition:'width .1s' }} />
    </div>
  )
}

function ShareBar({ url, title }) {
  const enc = encodeURIComponent
  return (
    <div className="share-bar">
      <span className="share-bar__label">Compartir:</span>
      <a href={`https://api.whatsapp.com/send?text=${enc(title+' '+url)}`} target="_blank" rel="noopener" className="share-btn share-btn--wa">WhatsApp</a>
      <a href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`} target="_blank" rel="noopener" className="share-btn share-btn--tw">Twitter/X</a>
      <a href={`https://t.me/share/url?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener" className="share-btn share-btn--tg">Telegram</a>
      <button onClick={() => navigator.clipboard?.writeText(url).then(()=>alert('¡URL copiada!'))} className="share-btn share-btn--cp">Copiar enlace</button>
    </div>
  )
}

// Sticky buy widget for article sidebar
function StickyBuyWidget({ product }) {
  if (!product) return null
  const href = `https://www.amazon.es/dp/${product.asin}?tag=jurassicfan21-21`
  return (
    <div style={{
      background: 'var(--gray-900)', border: '1px solid var(--border-warm, rgba(232,160,26,.2))',
      padding: '1.25rem', marginBottom: '1.25rem',
    }}>
      <div style={{ fontFamily:'var(--font-condensed)',fontSize:'0.6rem',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'0.5rem' }}>
        Recomendado en Amazon
      </div>
      <div style={{ display:'flex',gap:'0.75rem',marginBottom:'0.75rem' }}>
        <div style={{ width:64,height:64,background:'#fff',flexShrink:0,borderRadius:2,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center' }}>
          <img src={product.image} alt={product.name} style={{ width:'100%',height:'100%',objectFit:'contain',padding:4 }}
            onError={e=>e.target.src='https://placehold.co/64x64/1c1c1c/e8a01a?text=JW'} />
        </div>
        <div>
          <div style={{ fontSize:'0.82rem',fontWeight:600,lineHeight:1.3,marginBottom:'0.3rem' }}>{product.name}</div>
          <div style={{ fontFamily:'var(--font-condensed)',fontSize:'1rem',fontWeight:900,color:'var(--amber)' }}>{product.price}</div>
        </div>
      </div>
      <a href={href} target="_blank" rel="noopener nofollow"
        style={{
          display:'block',width:'100%',textAlign:'center',
          background:'var(--amber)',color:'var(--black)',
          fontFamily:'var(--font-condensed)',fontWeight:800,
          fontSize:'0.78rem',letterSpacing:'0.1em',textTransform:'uppercase',
          padding:'0.65rem',border:'none',cursor:'pointer',
          textDecoration:'none',
        }}
        onClick={() => window.gtag?.('event','affiliate_click',{event_label:product.id})}>
        Ver precio en Amazon →
      </a>
      <p style={{ textAlign:'center',fontSize:'0.62rem',color:'var(--gray-400)',marginTop:'0.4rem',fontFamily:'var(--font-condensed)' }}>
        Envío Prime · Sin coste extra
      </p>
    </div>
  )
}

const FMT = { day:'numeric', month:'long', year:'numeric' }

export default function ArticlePage() {
  const { slug } = useParams()
  const nav = useNavigate()
  const article = articles.find(a => a.slug === slug)

  if (!article || !article.published) {
    return (
      <div style={{ textAlign:'center', padding:'10rem 2rem' }}>
        <div style={{ fontSize:'4rem',marginBottom:'1rem' }}>🦕</div>
        <h1 style={{ fontFamily:'var(--font-serif)',fontSize:'2rem',marginBottom:'1rem' }}>Artículo no encontrado</h1>
        <p style={{ color:'var(--gray-400)',marginBottom:'2rem' }}>Puede que todavía no esté publicado.</p>
        <Link to="/articulos" className="btn btn--primary">Ver todos los artículos</Link>
      </div>
    )
  }

  const pageUrl = `${BASE}/#/articulos/${slug}`
  const dateStr = new Date(article.publishDate).toLocaleDateString('es-ES', FMT)
  const related = publishedArticles.filter(a => a.slug !== slug && a.category === article.category).slice(0,3)
  const relatedProds = products.slice(0,3)
  const stickyProduct = products[Math.floor(Math.random() * 4)] // random featured product

  const schemas = [
    { "@context":"https://schema.org","@type":"Article","headline":article.title,
      "description":article.excerpt,"image":article.image,"datePublished":article.publishDate,
      "author":{"@type":"Organization","name":"Jurassic Hub"},"publisher":{"@type":"Organization","name":"Jurassic Hub","url":BASE},
      "url":pageUrl,"inLanguage":"es" },
    ...(article.faq?.length > 0 ? [{
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity":article.faq.map(f=>({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a} }))
    }] : [])
  ]

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
        {schemas.map((s,i) => <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>)}
      </Helmet>

      <ReadingProgress />

      {/* Hero */}
      <div style={{ position:'relative',overflow:'hidden',minHeight:440,background:'var(--gray-900)',display:'flex',alignItems:'flex-end',paddingTop:56 }}>
        <div style={{ position:'absolute',inset:0,backgroundImage:`url(${article.image})`,backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(.18) saturate(.5)' }} />
        <div style={{ position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(10,10,10,1) 0%,rgba(10,10,10,.5) 50%,transparent 100%)' }} />
        <div className="container" style={{ position:'relative',paddingTop:'2rem',paddingBottom:'2.5rem',width:'100%' }}>
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link><span className="breadcrumb__sep">›</span>
            <Link to="/articulos">Artículos</Link><span className="breadcrumb__sep">›</span>
            <span style={{ color:'var(--amber)' }}>{article.category}</span>
          </nav>
          <div style={{ fontFamily:'var(--font-condensed)',fontSize:'0.65rem',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'.75rem' }}>
            {article.category}
          </div>
          <h1 style={{ fontFamily:'var(--font-serif)',fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:900,lineHeight:1.1,marginBottom:'1rem',maxWidth:'720px' }}>
            {article.title}
          </h1>
          <p style={{ fontSize:'1rem',color:'var(--gray-200)',maxWidth:'64ch',lineHeight:1.7,marginBottom:'1rem' }}>
            {article.excerpt}
          </p>
          <div style={{ fontFamily:'var(--font-condensed)',fontSize:'0.68rem',letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--gray-400)',display:'flex',gap:'1rem',flexWrap:'wrap' }}>
            <span>Jurassic Hub Editorial</span><span>·</span>
            <span>{dateStr}</span><span>·</span>
            <span>{article.readTime} min lectura</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container">
        <div className="article-layout">
          <div className="article-content">
            {/* Table of contents */}
            <TableOfContents content={article.content} />

            {/* Content with inline images */}
            <div dangerouslySetInnerHTML={{ __html: parseContent(article.content, article.inlineImages || []) }} />

            {/* Mid-article ad slot */}
            <AdSlotHorizontal label="Espacio publicitario" />

            {/* FAQ */}
            {article.faq?.length > 0 && (
              <div className="faq">
                <div className="faq__title">Preguntas frecuentes</div>
                {article.faq.map((item,i) => (
                  <details key={i} className="faq__item">
                    <summary className="faq__q">{item.q}<span className="faq__icon">+</span></summary>
                    <p className="faq__a">{item.a}</p>
                  </details>
                ))}
              </div>
            )}

            <ShareBar url={pageUrl} title={article.title} />

            {/* Tags */}
            <div className="tag-list" style={{ marginBottom:'2.5rem' }}>
              {article.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>

            {/* Related products — CRO optimized */}
            <div style={{ borderTop:'2px solid var(--amber)',paddingTop:'1.5rem',marginBottom:'3rem' }}>
              <div style={{ fontFamily:'var(--font-condensed)',fontSize:'0.65rem',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'.4rem' }}>
                Selección de la tienda
              </div>
              <h3 style={{ fontFamily:'var(--font-condensed)',fontSize:'1.1rem',fontWeight:900,textTransform:'uppercase',marginBottom:'.5rem' }}>
                Productos relacionados con este artículo
              </h3>
              <div className="affiliate-note">Enlace afiliado Amazon.es · sin coste adicional para ti · ¡Ayuda a que sigamos publicando!</div>
              <div className="product-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
                {relatedProds.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div style={{ borderTop:'1px solid var(--border)',paddingTop:'1.5rem' }}>
                <div style={{ fontFamily:'var(--font-condensed)',fontSize:'0.65rem',fontWeight:800,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--amber)',marginBottom:'.4rem' }}>
                  Sigue leyendo
                </div>
                <h3 style={{ fontFamily:'var(--font-condensed)',fontSize:'1.1rem',fontWeight:900,textTransform:'uppercase',marginBottom:'1rem' }}>
                  Artículos relacionados
                </h3>
                <div className="article-grid article-grid--3">
                  {related.map(a => <ArticleCard key={a.id} article={a} size="sm" />)}
                </div>
              </div>
            )}

            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'1rem',marginTop:'2.5rem',paddingTop:'2rem',borderTop:'1px solid var(--border)' }}>
              <button onClick={() => nav(-1)} className="btn btn--outline">← Volver</button>
              <Link to="/articulos" className="btn btn--primary">Ver todos los artículos →</Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Sticky buy widget */}
            <StickyBuyWidget product={stickyProduct} />

            {/* Related articles sidebar */}
            <div className="sidebar-widget" style={{ marginBottom:'1.25rem' }}>
              <div className="sidebar-widget__header">Artículos relacionados</div>
              {(related.length > 0 ? related : publishedArticles.filter(a=>a.slug!==slug).slice(0,3)).map(a => (
                <ArticleCard key={a.id} article={a} horizontal />
              ))}
            </div>

            {/* Another product promo */}
            <div className="sidebar-widget">
              <div className="sidebar-widget__header">🛒 Más vendidos</div>
              {products.slice(1,3).map(p => (
                <a key={p.id} href={`https://www.amazon.es/dp/${p.asin}?tag=jurassicfan21-21`}
                  target="_blank" rel="noopener nofollow" className="sidebar-product">
                  <div className="sidebar-product__img">
                    <img src={p.image} alt={p.name}
                      onError={e=>e.target.src='https://placehold.co/56x56/1c1c1c/e8a01a?text=JW'} loading="lazy" />
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
