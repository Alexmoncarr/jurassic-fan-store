import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">JURASSIC <span>HUB</span></div>
            <p className="footer__desc">
              La referencia en español sobre Jurassic Park, Jurassic World y paleontología. Artículos con rigor científico y las mejores selecciones de productos para fans.
            </p>
            <p style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.58rem', color: 'var(--gray-400)', opacity: 0.65, lineHeight: 1.5 }}>
              Participante en el Programa de Afiliados Amazon EU. Al comprar a través de nuestros enlaces obtenemos comisión sin coste adicional para ti.
            </p>
          </div>
          <div>
            <div className="footer__col-title">Ciencia</div>
            <ul className="footer__links">
              <li><Link to="/articulos" className="footer__link">Paleontología</Link></li>
              <li><Link to="/articulos" className="footer__link">Descubrimientos</Link></li>
              <li><Link to="/articulos" className="footer__link">Debate científico</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__col-title">Saga</div>
            <ul className="footer__links">
              <li><Link to="/articulos" className="footer__link">Jurassic Park</Link></li>
              <li><Link to="/articulos" className="footer__link">Jurassic World</Link></li>
              <li><Link to="/articulos" className="footer__link">Rebirth 2025</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer__col-title">Tienda</div>
            <ul className="footer__links">
              <li><Link to="/tienda" className="footer__link">LEGO Jurassic</Link></li>
              <li><Link to="/tienda" className="footer__link">Figuras Hammond</Link></li>
              <li><Link to="/tienda" className="footer__link">Libros</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copy">© {new Date().getFullYear()} Jurassic Hub — Todos los derechos reservados</div>
          <div className="footer__legal">
            Jurassic Park™ y Jurassic World™ son marcas de Universal Studios y Amblin Entertainment. Sitio independiente no afiliado con Universal.
          </div>
        </div>
      </div>
    </footer>
  )
}
