import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  const isActive = (path) => location.pathname === path ? 'navbar__link active' : 'navbar__link'

  return (
    <>
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
        <div className="container">
          <div className="navbar__inner">
            <Link to="/" className="navbar__brand">
              <span className="navbar__dot" aria-hidden="true" />
              JURASSIC <span style={{ color: 'var(--amber)' }}>HUB</span>
            </Link>

            <ul className="navbar__nav">
              <li><Link to="/" className={isActive('/')}>Inicio</Link></li>
              <li><Link to="/articulos" className={isActive('/articulos')}>Artículos</Link></li>
              <li><Link to="/tienda" className={isActive('/tienda')}>Tienda</Link></li>
            </ul>

            <Link to="/tienda" className="navbar__cta">Ver tienda →</Link>

            <button
              className="navbar__hamburger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Abrir menú"
              aria-expanded={mobileOpen}
            >
              <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
              <span style={{ opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} role="dialog" aria-label="Menú móvil">
        <Link to="/" className="mobile-menu__link">Inicio</Link>
        <Link to="/articulos" className="mobile-menu__link">Artículos</Link>
        <Link to="/tienda" className="mobile-menu__link" style={{ color: 'var(--amber)' }}>Tienda</Link>
      </div>
    </>
  )
}
