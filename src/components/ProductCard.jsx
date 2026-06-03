import { useState } from 'react'
import { amazonLink, amazonSearch } from '../data/products'

const Stars = ({ rating }) => '★'.repeat(Math.floor(rating)) + (rating%1>=.5?'½':'') + '☆'.repeat(5-Math.floor(rating)-(rating%1>=.5?1:0))

export default function ProductCard({ product }) {
  const [imgErr, setImgErr] = useState(false)
  const href = product.searchQuery ? amazonSearch(product.searchQuery) : amazonLink(product.asin)

  return (
    <article className="product-card">
      <div className="product-card__img">
        {product.badge && (
          <span className="product-card__badge" style={{ background: product.badgeColor || 'var(--amber)' }}>
            {product.badge}
          </span>
        )}
        <img
          src={imgErr ? `https://placehold.co/400x400/1c1c1c/e8a01a?text=${encodeURIComponent(product.category)}` : product.image}
          alt={product.name}
          onError={() => setImgErr(true)}
          loading="lazy"
        />
      </div>
      <div className="product-card__body">
        <div className="product-card__cat">{product.category}</div>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__footer">
          <div>
            <div className="product-card__stars"><Stars rating={product.rating} /></div>
            <div className="product-card__reviews">{product.reviews.toLocaleString('es')} opiniones</div>
          </div>
          <div className="product-card__price">{product.price}</div>
        </div>
        <a href={href} target="_blank" rel="noopener nofollow" className="product-card__btn"
          onClick={() => window.gtag?.('event','affiliate_click',{event_label:product.id})}>
          Ver en Amazon →
        </a>
        <p className="product-card__disclaimer">Enlace afiliado · sin coste extra</p>
      </div>
    </article>
  )
}
