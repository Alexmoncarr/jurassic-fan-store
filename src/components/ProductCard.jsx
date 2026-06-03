import { useState } from 'react'
import { amazonLink, amazonSearch, AMAZON_TAG } from '../data/products'

const Stars = ({ rating }) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="product-card__stars" aria-label={`${rating} de 5 estrellas`}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  )
}

export default function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)

  const href = product.searchQuery
    ? amazonSearch(product.searchQuery)
    : amazonLink(product.asin)

  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'affiliate_click', {
        event_category: 'monetization',
        event_label: product.id,
        value: 1
      })
    }
  }

  return (
    <article className="product-card">
      <div className="product-card__img">
        {product.badge && (
          <span
            className="product-card__badge"
            style={{ background: product.badgeColor || 'var(--amber)' }}
          >
            {product.badge}
          </span>
        )}
        <img
          src={imgError ? `https://placehold.co/400x400/1e1e1e/E8A623?text=${encodeURIComponent(product.name.slice(0, 20))}` : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          loading="lazy"
          width="400"
          height="400"
        />
      </div>

      <div className="product-card__body">
        <div className="product-card__cat">{product.category}</div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        <div className="product-card__footer">
          <div>
            <Stars rating={product.rating} />
            <div className="product-card__meta">{product.reviews.toLocaleString('es-ES')} opiniones</div>
          </div>
          <div className="product-card__price">{product.price}</div>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener nofollow"
          className="product-card__btn"
          onClick={handleClick}
          aria-label={`Ver ${product.name} en Amazon`}
        >
          Ver en Amazon →
        </a>
        <p className="product-card__disclaimer">Enlace de afiliado — sin coste extra</p>
      </div>
    </article>
  )
}
