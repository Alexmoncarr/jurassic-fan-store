import { useNavigate } from 'react-router-dom'

const FMT = { day: 'numeric', month: 'short', year: 'numeric' }

export default function ArticleCard({ article, size = 'md', horizontal }) {
  const nav = useNavigate()
  const go = () => nav(`/articulos/${article.slug}`)
  const dateStr = new Date(article.publishDate).toLocaleDateString('es-ES', FMT)

  if (horizontal) {
    return (
      <div className="article-card article-card--horizontal"
        onClick={go} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter'&&go()}>
        <div className="article-card__img" style={{ width: 120, flexShrink: 0 }}>
          <img src={article.image} alt={article.title} loading="lazy"
            onError={e => { e.target.src = `https://placehold.co/120x90/1c1c1c/e8a01a?text=${encodeURIComponent(article.category)}` }} />
        </div>
        <div className="article-card__body">
          <div className="article-card__cat">{article.category}</div>
          <h4 className="article-card__title" style={{ fontSize: '0.82rem' }}>{article.title}</h4>
          <div className="article-card__meta"><span>{dateStr}</span></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`article-card article-card--${size}`}
      onClick={go} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter'&&go()}>
      <div className="article-card__img">
        <span className="article-card__tag">{article.category}</span>
        <img src={article.image} alt={article.title} loading="lazy"
          onError={e => { e.target.src = `https://placehold.co/640x360/1c1c1c/e8a01a?text=${encodeURIComponent(article.title.slice(0,30))}` }} />
      </div>
      <div className="article-card__body">
        <div className="article-card__cat">{article.category}</div>
        <h3 className="article-card__title">{article.title}</h3>
        {size !== 'sm' && <p className="article-card__excerpt">{article.excerpt}</p>}
        <div className="article-card__meta">
          <span>{dateStr}</span>
          <span>·</span>
          <span>{article.readTime} min</span>
        </div>
      </div>
    </div>
  )
}
