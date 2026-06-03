import { useNavigate } from 'react-router-dom'

export default function ArticleCard({ article, featured }) {
  const navigate = useNavigate()
  const go = () => navigate(`/articulos/${article.slug}`)

  const dateStr = new Date(article.publishDate).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  if (featured) {
    return (
      <article className="article-featured" onClick={go} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && go()}
        aria-label={`Leer artículo: ${article.title}`}
      >
        <div className="article-featured__img">
          <img src={article.image} alt={article.title} loading="lazy" />
        </div>
        <div className="article-featured__body">
          <div className="article-featured__tag">{article.category}</div>
          <h2 className="article-featured__title">{article.title}</h2>
          <p className="article-featured__excerpt">{article.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--ivory-dim)' }}>
              {dateStr} · {article.readTime} min lectura
            </span>
            <span className="btn btn--outline" style={{ padding: '0.5rem 1.2rem', fontSize: '0.72rem' }}>
              Leer artículo →
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="article-card" onClick={go} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && go()}
      aria-label={`Leer artículo: ${article.title}`}
    >
      <div className="article-card__img">
        <span className="article-card__cat">{article.category}</span>
        <img src={article.image} alt={article.title} loading="lazy" />
      </div>
      <div className="article-card__body">
        <div className="article-card__meta">
          <span>{dateStr}</span>
          <span>⏱ {article.readTime} min</span>
        </div>
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__excerpt">{article.excerpt}</p>
        <span className="article-card__arrow">Leer artículo <span>→</span></span>
      </div>
    </article>
  )
}
