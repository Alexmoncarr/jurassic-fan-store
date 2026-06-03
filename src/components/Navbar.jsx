import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setMobileOpen(false), [location])
  const active = (p) => location.pathname === p ? 'navbar__link active' : 'navbar__link'

  return (
    <>
      {/* Breaking ticker */}
      <div className="ticker" aria-label="Últimas noticias">
        <div className="ticker__inner">
          <span className="ticker__label">🔴 Última hora</span>
          <span className="ticker__item">Jurassic World: Rebirth — $868M recaudados mundialmente · Confirmada secuela en producción</span>
          <span className="ticker__label">🦖 Paleontología</span>
          <span className="ticker__item">Nuevo titanosaurio argentino podría ser el mayor dinosaurio de la historia</span>
          <span className="ticker__label">🎬 Cine</span>
          <span className="ticker__item">Jurassic World: Rebirth disponible ahora en streaming · Scarlett Johansson confirma regreso</span>
        </div>
      </div>

      <nav className="navbar" role="navigation">
        <div className="container container--xl">
          <div className="navbar__inner">
            <Link to="/" className="navbar__brand">
              JURASSIC <span>HUB</span>
            </Link>
            <ul className="navbar__nav">
              <li><Link to="/" className={active('/')}>Inicio</Link></li>
              <li><Link to="/articulos" className={active('/articulos')}>Artículos</Link></li>
              <li><Link to="/tienda" className={active('/tienda')}>Tienda</Link></li>
              <li><a href="#noticias" className="navbar__link">Noticias</a></li>
            </ul>
            <div className="navbar__right">
              <Link to="/tienda" className="navbar__store-btn">Tienda Amazon →</Link>
            </div>
            <button className="navbar__hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menú">
              <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(4px,5px)' : '' }} />
              <span style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(4px,-5px)' : '' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <Link to="/" className="mobile-menu__link">Inicio</Link>
        <Link to="/articulos" className="mobile-menu__link">Artículos</Link>
        <Link to="/tienda" className="mobile-menu__link" style={{ color: 'var(--amber)' }}>Tienda</Link>
      </div>
    </>
  )
}
