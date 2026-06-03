import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              JURASSIC <span style={{ color: 'var(--amber)' }}>HUB</span>
            </div>
            <p className="footer__desc">
              La referencia en español sobre dinosaurios, paleontología y el universo cinematográfico de Jurassic Park y Jurassic World. Contenido riguroso para fans apasionados.
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--ivory-dim)', opacity: 0.6 }}>
              Participante en el Programa de Afiliados de Amazon EU. Al comprar a través de nuestros enlaces obtenemos una pequeña comisión sin coste adicional para ti.
            </p>
          </div>

          <div>
            <div className="footer__col-title">Contenido</div>
            <ul className="footer__links">
              <li><Link to="/articulos" className="footer__link">Todos los artículos</Link></li>
              <li><Link to="/articulos" className="footer__link">Paleontología</Link></li>
              <li><Link to="/articulos" className="footer__link">Cine & Saga</Link></li>
              <li><Link to="/articulos" className="footer__link">Ciencia</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Tienda</div>
            <ul className="footer__links">
              <li><Link to="/tienda" className="footer__link">LEGO Jurassic</Link></li>
              <li><Link to="/tienda" className="footer__link">Figuras de acción</Link></li>
              <li><Link to="/tienda" className="footer__link">Libros</Link></li>
              <li><Link to="/tienda" className="footer__link">Películas</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Legal</div>
            <ul className="footer__links">
              <li><span className="footer__link" style={{ cursor: 'default' }}>Aviso de afiliados</span></li>
              <li><span className="footer__link" style={{ cursor: 'default' }}>Política de privacidad</span></li>
              <li>
                <a href="https://alexmoncarr.github.io/jurassic-fan-store/llms.txt" className="footer__link" target="_blank" rel="noopener">
                  llms.txt (AI)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            © {new Date().getFullYear()} Jurassic Hub — Todos los derechos reservados
          </div>
          <div className="footer__legal">
            Jurassic Park™ y Jurassic World™ son marcas registradas de Universal Studios y Amblin Entertainment.
            Este sitio es independiente y no está afiliado con Universal Studios.
          </div>
        </div>
      </div>
    </footer>
  )
}
